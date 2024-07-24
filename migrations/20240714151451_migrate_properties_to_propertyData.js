//Property migration file

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return new Promise(async (resolve, reject) => {
    const trx = await knex.transaction();

    try {
      const stream = trx('properties').stream();
      for await (const property of stream) {
        //Add object data
        const { title, description, refId, id: oldPropertyId } = property;
        const [userId] = await trx('userData').where({ email: refId }).select('id').pluck('id');
        const [{ id: propertyId }] = await trx('objectData').insert(
          {
            title,
            description,
            authorId: userId,
            timestamp: Date.now(),
          },
          'id'
        );

        //Add global property data
        const {
          zipCode,
          title: address,
          color,
          roofType,
          buildingType,
          roofMaterial,
          buildingMaterial,
          yardOwnershipType,
          yardArea,
          otherArea,
          livingArea,
          roomCount,
          floorCount,
          wcCount,
          targetType,
          energyClass,
          buildYear,
          hasBalcony,
          hasGarage,
        } = property;

        await trx('propertyData').insert(
          {
            id: propertyId,
            zipCode,
            streetAddress: address,

            roofType:
              roofType === 'Tasakatto'
                ? 0
                : roofType === 'Harjakatto'
                ? 1
                : roofType === 'Pulpettikatto'
                ? 2
                : 3,

            roofMaterial:
              roofMaterial === 'Pelti'
                ? 0
                : roofMaterial === 'Tiili'
                ? 1
                : roofMaterial === 'Huopa'
                ? 2
                : 3,

            buildingType:
              buildingType === 'Omakotitalo'
                ? 0
                : buildingType === 'Kerrostalo'
                ? 1
                : buildingType === 'Rivitalo'
                ? 2
                : buildingType === 'Paritalo'
                ? 3
                : buildingType === 'Erillistalo'
                ? 4
                : buildingType === 'Puutalo-osake'
                ? 5
                : buildingType === 'Luhtitalo'
                ? 6
                : 7,

            buildingMaterial:
              buildingMaterial === 'Puu'
                ? 0
                : buildingMaterial === 'Tiili'
                ? 1
                : buildingMaterial === 'Betoni'
                ? 2
                : buildingMaterial === 'Hirsi'
                ? 3
                : 4,

            propertyType: targetType === 'Kiinteistö' ? 0 : 1,
            roomCount: !isNaN(roomCount) ? roomCount : 1,
            floorCount: !isNaN(floorCount) ? floorCount : 1,
            wcCount: !isNaN(wcCount) ? wcCount : 1,
          },
          'id'
        );

        if (targetType === 'Kiinteistö') {
          const { propertyNumber } = property;
          await trx('houseData').insert({
            id: propertyId,
            propertyNumber: propertyNumber || '0',
            yardOwnershipType:
              yardOwnershipType === 'Ei Mitään' ? 0 : yardOwnershipType === 'Oma' ? 1 : 2,
            yardArea: yardArea * 100,
          });
        } else if (targetType === 'Huoneisto') {
          const { appartmentNumber, floorCount: floorNumber } = property;
          await trx('appartmentData').insert({
            id: propertyId,
            appartmentNumber,
            floorNumber,
            hasBalcony,
          });
        }

        //Add owner data
        await trx('propertyOwnerData').insert({
          userId,
          propertyId,
          timestamp: Date.now(),
        });

        //Add utility data
        const utilityStream = trx('usage').where({ refId: oldPropertyId }).stream();
        for await (const utility of utilityStream) {
          const { type, time, price: monetaryAmount, unitAmount } = utility;
          const [{ id: utilityId }] = await trx('objectData').insert(
            {
              parentId: propertyId,
              authorId: userId,
              timestamp: Date.now(),
            },
            'id'
          );

          await trx('utilityData').insert({
            type: type == 'heat' ? 1 : type == 'water' ? 2 : 3,
            monetaryAmount: Math.round(monetaryAmount * 100),
            unitAmount: Math.round(unitAmount * 100),
            time: new Date(time).getTime(),
            id: utilityId,
          });
        }

        //Add the property files
        const propertyFileStream = trx('propertyFiles').where({ refId: oldPropertyId }).stream();
        for await (const file of propertyFileStream) {
          const [{ id: fileId }] = await trx('objectData').insert(
            {
              title: file.title,
              description: file.description,
              parentId: propertyId,
              authorId: userId,
              timestamp: Date.now(),
            },
            'id'
          );

          await trx('fileData').insert({
            id: fileId,
            type: file.mimeType,
            name: file.fileName,
          });
        }

        //Add event data
        const eventStream = trx('propertyEvents').where({ refId: oldPropertyId }).stream();
        for await (const event of eventStream) {
          const [{ id: eventId }] = await trx('objectData').insert(
            {
              parentId: propertyId,
              title: event.title,
              description: event.description,
              timestamp: Date.now(),
              authorId: userId,
            },
            'id'
          );

          //Add the event files
          const fileStream = trx('eventFiles').where({ refId: event.id }).stream();
          for await (const file of fileStream) {
            const [{ id: objId }] = await trx('objectData').insert(
              {
                title: file.title,
                description: file.description,
                parentId: eventId,
                authorId: userId,
                timestamp: Date.now(),
              },
              'id'
            );

            await trx('fileData').insert({
              id: objId,
              name: file.fileName,
              type: file.mimeType,
            });
          }

          //Add the event data
          await trx('propertyEventData').insert({
            id: eventId,
            time: parseInt(new Date(event.time).getTime()),
          });
        }
      }

      await trx.commit();
      resolve();
    } catch (err) {
      await trx.rollback();
      reject(err);
    }
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return new Promise(async (resolve, reject) => {
    const trx = await knex.transaction();
    try {
      const propertyDataStream = trx('propertyData').stream();
      for await (const property of propertyDataStream) {
        await trx('objectData').where({ id: property.id }).del();
      }
      await trx.commit();
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};
