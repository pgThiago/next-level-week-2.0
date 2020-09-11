import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('user_account', table => {
        table.increments('id').primary();

        table.string('account_name').notNullable();
        table.string('last_name').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();

        table.string('passwordResetToken').nullable();
        table.date('passwordResetExpires').nullable();

    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('user_account');
}