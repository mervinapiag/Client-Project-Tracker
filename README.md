# Todo-App

Project-App is a web application that allows users to manage their to-do list. Users can add, update, delete, and view their todos through the provided API endpoints.

Features
Create a project
View all projects
View a project by ID
Update a project
Delete a project
Request validation using Joi
Duplicate project name validation
Start date and due date validation
PostgreSQL database integration
Sequelize migrations
API testing using Mocha and Supertest
Repository Pattern architecture
Technologies
Node.js
Express.js
PostgreSQL
Sequelize ORM
Joi
Mocha
Chai
Supertest

## Installation
Clone the repository and install the required dependencies:

```bash
npm install
```
This will install all the necessary dependencies required to run the application.

## Environment Configuration

Create a .env file in the root directory and configure your database connection and application settings.

This project uses PostgreSQL:

DATABASE_URL=<your PostgreSQL database connection>

JWT_KEY=<your jwt key>

ALLOWED_ORIGINS=<allowed origins separated by comma>

NODE_ENV=development

PORT=5000

## Database Setup
After configuring the .env file, run the Sequelize migrations to create the required database tables:

npx sequelize-cli db:migrate

To check all available Sequelize CLI commands:

npx sequelize-cli

## Running the Application

To start the Project-App, use the following command:
```bash
npm start
```
This will start the application and make it accessible at the designated port.

## Testing

To run the tests for the Project-App, use the following command:
```bash
npx mocha test/project.test.js
```
This will execute the test suite using the Mocha test framework.



### `.env.test`

For running tests, update the `.env.test` file with the following configurations:

```bash
NODE_ENV=test
TEST_USERNAME=<test username>
TEST_PASSWORD=<test username>
TEST_URL=<api base url>
DATABASE_TEST_URL=<test db connection>
```

### Creating new model

To generate new model:
```bash
npx sequelize-cli models:generate --name <name> --attributes <list of attributes>
```

### Creating migrations

To generate new migration:
```bash
npx sequelize-cli migration:generate --name <name>
npx sequelize-cli db:migrate # to run migration
```

To view all Sequelize commands, run:
```bash
npx sequelize-cli
```

### Folder Structuring
Below is the suggested folder structure for an organized development: 
```bash
.
├── apps                    		# Modular configuration
│   ├── project                		# Module
│   │   ├── v1              		# Version 1 APIs for this module
│   │   │   ├── controllers         # Project controllers folder
│   │   │   ├─── project.js            # Controller for the module
│   │   │   ├── repositories         # Project repositories folder
│   │   │   ├─── project.js            # Handles database operations for projects
│   │   │   ├── requests            # Project Requests folder
│   │   │   ├─── project.js            # Requests module for schema validation
│   │   │   ├── routes              # Project routes folder
│   │   │   ├─── project.js            # Routes module for routing
│   │   │   ├── services            # Project services folder
│   │   │   ├─── project.js            # Database related operations
│   │   └── v2              # Version 2 APIs for this module
├── config                  # Sequelize configs directory
├── middlewares
├── migrations              # Sequelize migrations directory
├── models                  # Sequelize models directory
├── seeders                 # Sequelize seeders directory
├── test                    # Test directory
└── index.js                # Main entry
```

This folder structure follows a modular approach where each module (e.g., "auth") has its own versioned API endpoints, controllers, routes, and services. It also includes directories for configuration (config), database migrations (migrations), Sequelize models (models), seeders for database seeding (seeders), and utility scripts (utils). The constants, middlewares, and routes directories provide a centralized location for storing respective files, and the test directory is dedicated to unit tests. Finally, the index.js file serves as the main entry point for the application.


## Technologies Used

The Project-App utilizes the following technologies:

- Redis: Redis is used for session saving, providing a persistent session storage solution.
- JWT: JSON Web Tokens are used for token-based authentication and authorization.
- Sequelize: Sequelize is used as an ORM (Object-Relational Mapping) tool for managing database models and migrations.
- Mocha: Mocha is a JavaScript test framework used for writing and executing tests for the application.
- Joi: Joi is used for schema validation, ensuring that the incoming data meets the specified requirements.
- Pino: Pino is used for logs formatting, providing a structured and efficient logging solution.
- PostgreSQL: PostgreSQL is used as the database for storing the Projects-App data.
