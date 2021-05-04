/**
 * Keys used by application.
 * In Development, these values are hardcoded.
 * In Production, these values must be added as global environment variables or the application may fail.
 * The names for the environment variables to be set are in brackets below. By convention, they are all uppercase with underscore spacing.
 *
 * @property {string} mongoURI            - MongoDB connection string (MONGO_URI)
 * @property {string} secretOrKey         - secret key for password salting (SECRET_OR_KEY)
 * @property {string} rootAdminEmail      - root admin email (ROOT_ADMIN_EMAIL)
 * @property {string} rootAdminPassword   - root admin password (ROOT_ADMIN_PASSWORD)
 *
 * @module config/keys
 */
if (process.env.NODE_ENV === "production") {
  module.exports = {
    mongoURI: process.env.MONGO_URI,
    secretOrKey: process.env.SECRET_OR_KEY,
    rootAdminEmail: process.env.ROOT_ADMIN_EMAIL,
    rootAdminPassword: process.env.ROOT_ADMIN_PASSWORD
  };
} else {
  module.exports = {
    mongoURI:
      "mongodb+srv://e-appointment:eapphacktt@cluster0-mkt28.mongodb.net/e-app-dev?retryWrites=true",
    secretOrKey: "8NQViFzvsN1Dj7v9q5PTPgFwxl4MvEjH",
    rootAdminEmail: "root@mail.com",
    rootAdminPassword: "password"
  };
}
