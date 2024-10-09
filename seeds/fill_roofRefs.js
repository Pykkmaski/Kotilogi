/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const raystasTyypit = ['Avo', 'Umpi', 'Umpi ilman rakoja'];

const otsalautaTyypit = ['Suora', 'Vino'];

const aluskateTyypit = ['Hengittävä', 'Norm.'];

exports.seed = async function (knex) {
  const insertFn = async (table, types) => {
    for (const type of types) {
      await knex(table)
        .insert({
          label: type,
        })
        .onConflict('label')
        .ignore();
    }
  };

  await insertFn('ref_raystastyypit', raystasTyypit);
  await insertFn('ref_otsalautatyypit', otsalautaTyypit);
  await insertFn('ref_aluskatetyypit', aluskateTyypit);
};
