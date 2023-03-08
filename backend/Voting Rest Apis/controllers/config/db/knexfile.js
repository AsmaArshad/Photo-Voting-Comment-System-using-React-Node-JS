// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
 module.exports = {
    staging: {
      client: 'postgresql',
      connection: {
        database: 'Voting',
        user:     'postgres',
        password: '123'
        
      },
      pool: {
        min: 2,
        max: 10
      }
  }
};