import express from 'express';
import {
  findAllUsers,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
  findUserByEmail,
} from '../services/userService.ts';

export const usersRoutes = express.Router();

// GET /users
usersRoutes.get('/', async (req, res) => {
  try {
    const users = await findAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /users/:id
usersRoutes.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const user = await findUserById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /users
usersRoutes.post('/', async (req, res) => {
  const userData = req.body;

  const email = userData.email;
  const checkEmail = await findUserByEmail(email);
  if (checkEmail) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  try {
    const result = await createUser(userData);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /users/:id
usersRoutes.put('/:id', async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  try {
    const result = await updateUser(id, updateData);
    if (!result) {
      return res.status(404).json({ error: 'User not found or not updated' });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /users/:id
usersRoutes.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const success = await deleteUser(id);
    if (!success) {
      return res.status(404).json({ error: 'User not found or not deleted' });
    }
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
