# cse341-events
This repository contains the source code for the CSE 341 Events project, developed as part of the coursework for BYU-Idaho CSE 341.
## Overview
The CSE 341 Events project is a Node.js application designed to manage and display event information. It utilizes Express.js for routing and MongoDB for data storage.
## Features
•	User authentication and authorization
•	Event, Task, Vendor and Location creation, editing, and deletion
•	RESTful API endpoints
•	Comprehensive testing suite
•	Swagger integration for API documentation
## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/kkmorrisfam/cse341-events.git
   ```

2. Navigate to the project directory:

   ```bash
   cd cse341-events
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables

   Create a `.env` file in the root directory and add the necessary environment variables as specified in the `config` directory.

5. Start the application:

   ```bash
   npm start
   ```
## Usage

Once the application is running, you can access it at `http://localhost:3000/`. Use the provided API endpoints to interact with the application.

## Project Structure

The project follows a modular structure:

- `__tests__/`: Contains unit and integration tests.
- `config/`: Configuration files for the application.
- `controllers/`: Handles the logic for each route.
- `db/`: Database connection and initialization.
- `models/`: Mongoose schemas and models.
- `routes/`: Defines the application routes.
- `utils/`: Utility functions and middleware.
- `app.js`: Main application file.
- `swagger.js` & `swagger.json`: Swagger configuration for API documentation.
  
## API Documentation

The API is documented using Swagger. Once the application is running, navigate to `http://localhost:3000/api-docs` to view the interactive API documentation.

## Team Contributions

This was a team project with contributions from: Carl Mislang, Claudia Madrid, David Valentine, Evenage Gorwa and Kerri Morris.

## License

This project is licensed under the MIT License.


