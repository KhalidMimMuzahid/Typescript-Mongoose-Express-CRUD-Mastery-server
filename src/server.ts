import app from './app';
import mongoose from 'mongoose';
import 'dotenv/config';

import config from './app/config';
// getting-started.js

async function main() {
  try {
    const conn = await mongoose.connect(config.database_url as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();

