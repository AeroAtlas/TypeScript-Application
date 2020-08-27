import { RequestHandler } from 'express';

import { Todo } from '../models/todo';

const TODOS: Todo[] = [];


export const createTodo: RequestHandler = (req, res, _next) => { 
  const text = (req.body as {text: string}).text; //typecast req.body as obj with text as string
  const newTodo = new Todo(Math.random().toString(), text);

  TODOS.push(newTodo);

  res.status(201).json({message: 'Created the todo.', createdTodo: newTodo});
};

export const getTodos: RequestHandler = (_req, res, _next) => {
  res.json({ todos: TODOS });
}

export const updateTodo: RequestHandler<{id: string}> = (req, res, _next) => {
  const todoId = req.params.id;

  const updatedText = (req.body as { text: string }).text;

  const todoIndex = TODOS.findIndex(todo => todo.id === todoId); //returns -1 if none found
  if (todoIndex < 0) {
    throw new Error('Could not find the todo')
  }

  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);

  res.send(201).json({ message: 'Updated', updatedTodo: TODOS[todoIndex] });
}

export const deleteTodo: RequestHandler = (req, res, _next) => {
  const todoId = req.params.id;

  const todoIndex = TODOS.findIndex(todo => todo.id === todoId); //returns -1 if none found
  if (todoIndex < 0) {
    throw new Error('Could not find the todo')
  }

  TODOS.splice(todoIndex, 1);
  res.json({ message: 'Todo deleted' });
}