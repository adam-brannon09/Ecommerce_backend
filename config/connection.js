require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;

Load Environment Variables:

require('dotenv').config();: This line loads environment variables from a.env file in the root directory of the
application.The.env file typically contains sensitive configuration information, such as database credentials,
API keys, or other settings.By using dotenv, the values in the.env file are made available through the process.env
object.

Import Dependencies:

const Sequelize = require('sequelize');: This line imports the Sequelize class from the Sequelize library.It is used 
to create a Sequelize instance, representing the connection to the database.

Create Sequelize Instance:

const sequelize = process.env.JAWSDB_URL ? ... : ...;: This line sets up the Sequelize instance based on the presence 
of a JAWSDB_URL environment variable.The JAWSDB_URL is commonly used on platforms like Heroku to provide a pre - configured 
database connection.If the JAWSDB_URL exists(indicating the application is running in a cloud environment), it uses that URL 
to create the Sequelize instance with the appropriate connection parameters.

new Sequelize(process.env.JAWSDB_URL): If the JAWSDB_URL exists, the Sequelize instance is created with the provided URL.This 
URL contains all the necessary information to connect to the database, including the host, username, password, database name,
and other connection options.

new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, { ... }): If the JAWSDB_URL does not exist, the Sequelize instance is created with the connection parameters from the .env file. The values for DB_NAME, DB_USER, and DB_PW are retrieved from the process.env object, representing the database name, username, and password, respectively. The connection options (host, dialect, and dialectOptions) are also provided.

Export Sequelize Instance:

module.exports = sequelize;: This line exports the created Sequelize instance, making it available for use in other parts of the application. By exporting the instance, other modules can use it to define models, perform database queries, and manage the database operations.
