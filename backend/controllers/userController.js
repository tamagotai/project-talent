import userModel from '../models/userModel.js';

export default {
  getUsers: async (req, res) => {
    const users = await userModel.getUsers();
    res.json(users);
  },

  getUser: async (req, res) => {
    const user = await userModel.getUserById(req.params.id);
    if (!user)
      res.status(404).json('no reocrd with given id :' + req.params.id)
    else
      res.json(user)
  },

  deleteUser: async (req, res) => {
    const affectedRows = await userModel.deleteUser(req.params.id);
    if (affectedRows == 0)
      res.status(404).json('no record with given id : ' + req.params.id)
    else
      res.status(204).json(req.params.id + 'deleted successfully.').end()      
  },

  updateUser: async (req, res) => {
    const affectedRows = await userModel.updateUser(req.params.id, req.body);
    if (affectedRows == 0)
      res.status(404).json('no record with given id: ' + req.params.id)
    else {
      const updatedUser = await userModel.getUserById(req.params.id)
      res.json({
        message: req.params.id = ' has been updated successfully.',
        user: updatedUser
      });
    }
  },

  createUser: async (req, res) => {
    const id = await userModel.createUser(req.body);
    const user = await userModel.getUserById(id);
    res.status(201).json({
      message: 'Record has been created successfully.',
      user: user
    });
  },
};
