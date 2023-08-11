import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';

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

  getTalents: async (req, res) => {
    const talents = await userModel.getUsersByRole(2); //2 is for talents
    res.json(talents);
  },

  deleteUser: async (req, res) => {
    const affectedRows = await userModel.deleteUser(req.params.id);
    if (affectedRows == 0)
      res.status(404).json('no record with given id : ' + req.params.id)
    else
      res.status(204).json({message: req.params.id + 'deleted successfully.'}).end()      
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

  //Register
  createUser: async (req, res) => {
    const id = await userModel.createUser(req.body);
    const user = await userModel.getUserById(id);
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '10d' });
    res.status(201).json({
      message: 'Record has been created successfully.',
      user: user,
      token: token,
    });
  },

  //Login
  login: async (req, res) => {
    const { usernameOrEmail, password } = req.body;
    
    try {
      const user = await userModel.login(usernameOrEmail, password);
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '10d' });
      res.status(200).json({
        message: 'Login successful.',
        user: user,
        token: token,
      });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  },

  //Logout
  logout: async (req, res) => {
    // invalidating the token
    res.status(200).json({ 
      status: 'success', 
      message: 'Logged out', 
      token: null 
    });
  },
};
