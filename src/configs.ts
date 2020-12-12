// @ts-ignore
const env = process.env;
module.exports.mongoURI = `mongodb+srv://@cluster0.okkf0.mongodb.net/ssm_db?retryWrites=true&w=majority`;
module.exports.mongoData = {
    user: env.MONGO_DB_USER,
    pass: env.MONGO_DB_PASS,
    dbName: 'ssm_db',
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
};
module.exports.botToken = env.BOT_TOKEN;
