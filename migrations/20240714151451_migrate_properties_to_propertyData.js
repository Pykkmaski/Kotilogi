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
        const { title, description, refId } = property;
        const [userId] = await trx('userData').where({ email: refId }).select('id').pluck('id');
        const [{ id: objId }] = await trx('objectData').insert(
          {
            title,
            description,
            authorId: userId,
            timestamp: Date.now(),
          },
          'id'
        );
        console.log(objId);
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

        const [{ id: propertyId }] = await trx('propertyData').insert(
          {
            id: objId,
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
            roomCount,
            floorCount,
            wcCount,
            livingArea: livingArea * 100,
            otherArea: otherArea * 100,

            buildYear: parseInt(buildYear),
          },
          'id'
        );

        if (targetType === 'Kiinteistö') {
          const { propertyNumber } = property;
          await trx('houseData').insert({
            id: propertyId,
            propertyNumber,
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
        const utilityStream = trx('usage').stream();
        for await (const utility of utilityStream) {
          const { type, time, price: monetaryAmount, unitAmount } = utility;
          const [{ id }] = await trx('objectData').insert(
            {
              parentId: propertyId,
              authorId: userId,
              timestamp: Date.now(),
            },
            'id'
          );

          await trx('utilityData').insert({
            type,
            monetaryAmount: monetaryAmount * 100,
            unitAmount: unitAmount * 100,
            time: new Date(time).getTime(),
            id,
          });
        }

        //Add the property files
        const propertyFileStream = trx('propertyFiles').stream();
        for await (const file of propertyFileStream) {
          const [{ id: fileId }] = await trx('objectData').insert({
            title: file.title,
            description: file.description,
            parentId: propertyId,
            authorId: userId,
            timestamp: Date.now(),
          });

          await trx('fileData').insert({
            id: fileId,
            type: file.mimeType,
            name: file.fileName,
          });
        }

        //Add event data
        const eventStream = trx('propertyEvents').stream();
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
          const fileStream = trx('eventFiles').stream();
          for await (const file of fileStream) {
            await trx('fileData').insert({
              parentId: eventId,
              timestamp: Date.now(),
              authorId: userId,
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
      reject(err);
    }
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
