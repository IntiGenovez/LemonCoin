/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('movimentacoes', table => {
    table.increments('id').unsigned().primary()
    table.decimal('valor', 10, 2)
    table.enu('recorrencia', ['Diaria, Semanal, Mensal, Trimestral, Quadrimestral, Semestral, Anual']).notNull()
    table.datetime('data').notNull()
    table.integer('usuarioId')
        .unsigned() 
        .references('id')
        .inTable('usuarios')
    table.integer('contaId')
        .unsigned() 
        .references('id')
        .inTable('contas')
    table.integer('categoriaId')
        .unsigned() 
        .references('id')
        .inTable('categorias')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('movimentacoes')
};
