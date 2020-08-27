import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';

import todoRoutes from './routes/todos';

const app = express();

app.use(json()); //parses json data
app.use('/todos', todoRoutes);
//Error handling Middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({message: err.message})
});

app.listen(3000); 