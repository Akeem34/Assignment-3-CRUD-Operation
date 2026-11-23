require('dotenv').config();   // loads .env from the root
module.exports = { URI: process.env.MONGODB_URI };
