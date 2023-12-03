import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './app/modules/user/user.router';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/users', userRoutes);

app.get('/', async (req: Request, res: Response) => {
  res.send('Welcome to our server');
});

export default app;
