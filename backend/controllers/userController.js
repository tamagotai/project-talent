import userModel from '../models/userModel.js';

export default {
  createUser: async (req, res) => {
    const id = await userModel.createUser(req.body);
    const user = await userModel.getUserById(id);
    res.status(201).json(user);
  },

  getUsers: async (req, res) => {
    const users = await userModel.getUsers();
    res.json(users);
  },

  getUser: async (req, res) => {
    const user = await userModel.getUserById(req.params.id);
    res.json(user);
  },

  updateUser: async (req, res) => {
    await userModel.updateUser(req.params.id, req.body);
    const updatedUser = await userModel.getUserById(req.params.id);
    res.json(updatedUser);
  },

  deleteUser: async (req, res) => {
    await userModel.deleteUser(req.params.id);
    res.status(204).end();
  }
};
