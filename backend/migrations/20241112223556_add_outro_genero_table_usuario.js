/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.raw("ALTER TABLE usuarios MODIFY COLUMN genero ENUM('F', 'M', 'O') NOT NULL;")

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.raw("ALTER TABLE usuarios MODIFY COLUMN genero ENUM('F', 'M') NOT NULL;")
  
};
