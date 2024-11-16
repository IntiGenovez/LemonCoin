/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('contas', table => {
        table.string('descricao').notNull()
        table.string('proprietario').notNull()
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('contas', table => {
        dropColumn('descricao')
        dropColumn('proprietario')
      })
};
