import userService from '../models/userService.js';

export default {
  getUsers: async (req, res) => {
    const users = await userService.getUsers();
    res.json(users);
  },

  getUser: async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    if (!user)
      res.status(404).json('no reocrd with given id :' + req.params.id)
    else
      res.send(user)
  },

  deleteUser: async (req, res) => {
    const affectedRows = await userService.deleteUser(req.params.id);
    if (affectedRows == 0)
      res.status(404).json('no record with given id : ' + req.params.id)
    else
      res.status(204).end()
      res.json(req.params.id + 'deleted successfully.')
  },

  updateUser: async (req, res) => {
    const affectedRows = await userService.updateUser(req.params.id, req.body);
    if (affectedRows == 0)
      res.status(404).json('no record with given id: ' + req.params.id)
    else {
      const updatedUser = await userService.getUserById(req.params.id)
      res.json({
        message: req.params.id = ' has been updated successfully.',
        user: updatedUser
      });
    }
  },

  createUser: async (req, res) => {
    const id = await userService.createUser(req.body);
    const user = await userService.getUserById(id);
    res.status(201).json({
      message: 'Record has been created successfully.',
      user: user
    });
  },
};
