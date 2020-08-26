import express, { Request, Response, NextFunction }from 'express';
import todoRoutes from './routes/todos';

const app = express();

//Send all /todo requests to todoRoutes
app.use('/todos', todoRoutes);

//Error handling Middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({message: err.message})
});

app.listen(3000); 