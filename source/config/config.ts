import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'testUser';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'testUser';
const MONGO_HOST = process.env.MONGO_URL || `pasUtilePourLInstant`;

const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 50,
    autoIndex: false,
    retryWrites: true
};

const MONGO = {
    host: MONGO_HOST,
    password: MONGO_PASSWORD,
    username: MONGO_USERNAME,
    options: MONGO_OPTIONS,
    url: `mongodb+srv://testUser:testUser@testuser.clhyt.mongodb.net/testUser?retryWrites=true&w=majority`
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 1337;
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600;
const SERVER_ISSUER = process.env.SERVER_ISSUER || 'FlorentP'; // Ex: org name, it's an extra to put inside token
const SERVER_SECRET = process.env.SERVER_SECRET || 'encryptedSecret'; // To envrypt and decrypt the JWT

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    token: {
        expireTime: SERVER_TOKEN_EXPIRETIME,
        issuer: SERVER_ISSUER,
        secret: SERVER_SECRET
    }
};

const config = {
    server: SERVER,
    mongo: MONGO
};

// Allow to access to this config var all over the app
export default config;
