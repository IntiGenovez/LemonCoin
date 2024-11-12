/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table('movimentacoes', table => {
    table.enu('tipo', ['Despesa', 'Receita']).notNull()
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table('movimentacoes', table => {
    dropColumn('tipo')
  })
};
