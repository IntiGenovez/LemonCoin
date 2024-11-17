/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('movimentacoes', table => {
        table
            .enu('recorrencia', [
                'Diaria',
                'Semanal',
                'Mensal',
                'Trimestral',
                'Quadrimestral',
                'Semestral',
                'Anual',
            ])
            .nullable()
            .alter()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('movimentacoes', table => {
        table
            .enu('recorrencia', [
                'Diaria',
                'Semanal',
                'Mensal',
                'Trimestral',
                'Quadrimestral',
                'Semestral',
                'Anual',
            ])
        .notNullable()
        .alter() // Reverte para não permitir valores nulos
    })
}
