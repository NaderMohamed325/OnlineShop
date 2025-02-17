# E-Commerce Application

This is an E-Commerce application built with TypeScript, Express, and MongoDB. The application allows users to browse products, add them to a cart, and proceed to checkout.

## Features

- User authentication (signup, login, logout)
- Product browsing
- Add products to cart
- Remove products from cart
- Checkout process
- Password reset functionality

## Technologies Used

- TypeScript
- Express
- MongoDB
- Mongoose
- EJS (Embedded JavaScript templates)
- Express-session
- Connect-mongodb-session
- Morgan
- Helmet
- Rate-limit
- Dotenv
- Nodemailer

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/NaderMohamed325/e-commerce-app.git
    cd e-commerce-app
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
    ```dotenv
    DB_URI=mongodb://localhost:27017/products
    EMAILPASSWORD='your-email-password'
    MYEMAIL=your-email@example.com
    COOKIE_SECRET='your-cookie-secret'
    ```

4. Start the application:
    ```sh
    npm start
    ```

## Usage

- Visit `http://localhost:3000` to access the application.
- Sign up or log in to start adding products to your cart.
- Browse products and add them to your cart.
- Proceed to checkout to complete your purchase.

## Project Structure

- `src/index.ts`: Entry point of the application.
- `src/controllers/`: Contains the controller logic for different routes.
- `src/models/`: Contains the Mongoose models.
- `src/routers/`: Contains the route definitions.
- `src/utils/`: Contains utility functions and middleware.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License.