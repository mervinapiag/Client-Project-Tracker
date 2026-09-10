# Todo-App

Project-App is a web application that allows users to manage their to-do list. Users can add, update, delete, and view their todos through the provided API endpoints.

## Features

- Create a project
- View all projects
- View a project by ID
- Update a project
- Delete a project

## Custom Features For Validation
- Request validation using Joi
- Duplicate project name validation
- Start date and due date validation

## Technologies Used
- Node.js
- Express.js
- PostgreSQL
- SequelizeORM

## Postman
- https://fl-rnd.postman.co/workspace/560e1c63-eeaa-4d2f-8371-51f72b8c403a/collection/38363729-568ac1ad-29ce-4fb3-974e-c8f47ca6c634?action=share&source=copy-link&creator=38363729

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

```bash
npx sequelize-cli db:migrate
```

To check all available Sequelize CLI commands:

```bash
npx sequelize-cli
```

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

## Assumptions Made
- `project_name` must be unique name (Duplicate project name validation).
- `status` is limited only to `pending`, `in_progress`, `completed`, and `cancelled`.
- `priority` is limited to `low`, `medium`, and `high`.
 `due_date` cannot be earlier than `start_date`.
- Pagination defaults to `limit = 10` and `offset = 0`.
- `status` and `priority` filters are optional.
- Unit and API testing using Mocha, Chai, and Supertest

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
