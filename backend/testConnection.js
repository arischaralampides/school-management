const sequelize = require('./config/database');

sequelize.authenticate()
  .then(() => {
    console.log('MySQL connected successfully!');
    process.exit();
  })
  .catch(err => {
    console.error('Unable to connect to MySQL:', err);
  });