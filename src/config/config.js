require('dotenv').config();

const config = {
    env: process.env.APP_ENV,
    port: process.env.PORT || 5090,
    mongoUrl: process.env.MONGO || 'mongodb://mongo:27017/fashionCloud',
};

export default config;
