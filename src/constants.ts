// @ts-ignore
const env = process.env;

export const botToken = env.BOT_TOKEN;
export const mysqlConnectionData = {
    host: 'localhost',
    user: env.DB_USER,
    password: env.DB_PASS,
    database: 'ssm_db'
};
