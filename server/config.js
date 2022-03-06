module.exports = {
    server: {
      port: 3001,
    },

    db: {
        client: 'sqlite3', // or 'better-sqlite3'
        connection: {
          filename: "./test.db3"
        }
      },
    
  }