# Product Management System

This project is a Product Management System built with TypeScript, Express, and MongoDB. It allows users to sign up, log in, and manage products. The application uses EJS for templating and includes features such as session management and error handling.

## Features

- User authentication (sign up and log in)
- Product management (create, read)
- Session management with MongoDB
- Error handling
- EJS templating

## Prerequisites

- Node.js
- npm
- MongoDB

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/NaderMohamed325/OnlineShop
    cd product-management-system
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your MongoDB URI:
    ```env
    DB_URI=mongodb://localhost:27017/products
    ```

## Running the Application

1. Start the MongoDB server:
    ```bash
    mongod
    ```

2. Start the application:
    ```bash
    npm start
    ```

3. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

- `src/index.ts`: Entry point of the application.
- `src/models/`: Contains Mongoose models.
- `src/controllers/`: Contains route handlers.
- `src/routers/`: Contains route definitions.
- `src/utils/`: Contains utility functions and error handling.
- `src/views/`: Contains EJS templates.

## API Endpoints

### Authentication

- `GET /signup`: Render the sign-up page.
- `POST /signup`: Handle user sign-up.
- `GET /login`: Render the login page.
- `POST /login`: Handle user login.

### Products

- `GET /`: Fetch and display products.
- `POST /`: Create new products.

## Error Handling

Global error handling is implemented in `src/utils/errorHandler.ts`. Errors are rendered using the `error.ejs` template.

## Session Management

Sessions are managed using `express-session` and stored in MongoDB using `connect-mongodb-session`.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
