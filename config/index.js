module.exports = {
  production: {
    db: process.env.DB_URL,
    jwtSecret: process.env.JWT_SECRET,
    cookieSecret: process.env.COOKIE_SECRET
  },
  development: {
    db: "mongodb://localhost:27017/simple_todo_app",
    jwtSecret: 'supersecret',
    cookieSecret: 'supersupersecret'
  }
}
