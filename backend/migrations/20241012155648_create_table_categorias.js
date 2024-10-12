/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('categorias', table => {
    table.increments('id').unsigned().primary()
    table.string('nome').notNull()
    table.integer('usuarioId')
        .unsigned()
        .references('id')
        .inTable('usuarios')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('categorias')
};
