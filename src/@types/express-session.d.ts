import "express-session";

declare module "express-session" {
    interface SessionData {
        userId?: string; // You can use string | number based on your user ID type

    }
}
