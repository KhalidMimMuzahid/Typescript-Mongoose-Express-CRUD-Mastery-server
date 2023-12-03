import dotenv from 'dotenv';
import path from 'path';

// dotenv.config({ path: process.cwd()as string + "/.env" })
dotenv.config({ path: path.join(process.cwd(), '/.env') });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  saltRound: process.env.BCRYPT_SALT_ROUND,
};
 