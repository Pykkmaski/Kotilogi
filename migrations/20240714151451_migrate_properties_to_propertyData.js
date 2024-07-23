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

        console.log('Adding general property data...');
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
            roomCount: !isNaN(roomCount) ? roomCount : 1,
            floorCount: !isNaN(floorCount) ? floorCount : 1,
            wcCount: !isNaN(wcCount) ? wcCount : 1,
          },
          'id'
        );

        console.log('Adding specific property data...');
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

        console.log('Adding property owner data...');
        //Add owner data
        await trx('propertyOwnerData').insert({
          userId,
          propertyId,
          timestamp: Date.now(),
        });

        console.log('Adding property utility data...');
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
            type: type == 'heat' ? 1 : type == 'water' ? 2 : 3,
            monetaryAmount: Math.round(monetaryAmount * 100),
            unitAmount: Math.round(unitAmount * 100),
            time: new Date(time).getTime(),
            id,
          });
        }

        console.log('Adding property file data...');
        //Add the property files
        const propertyFileStream = trx('propertyFiles').stream();
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

        console.log('Adding property event data...');
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

          console.log('Adding event file data...');
          //Add the event files
          const fileStream = trx('eventFiles').stream();
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
exports.down = function (knex) {};
