import dotenv from 'dotenv';

import App from './http/express';
import db from '../Shared/mongoose';

dotenv.config();

App.listen(process.env.EDOZE_PORT, async () => {
  console.log('Server is ready');
  await db.run();
});
