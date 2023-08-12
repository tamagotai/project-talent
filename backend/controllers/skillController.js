import skillModel from "../models/skillModel.js";

export default {
  //get all skills name
  getAllSkills: async (req, res) => {
    const skills = await skillModel.getAllSkills();
    res.json(skills);        
  },
  
  getSkills: async (req, res) => {
    const skills = await skillModel.getSkills();
    res.json(skills);        
  },

  getUserSkills: async (req, res) => {
    const userId = req.params.userId;
    const skills = await skillModel.getUserSkills(userId);
    res.json(skills);
  },

  upsertUserSkills: async (req, res) => {
    const userId = req.params.userId;
    const skills = req.body;
    await skillModel.upsertUserSkills(userId, skills);
    res.json({ message: 'Skills updated successfully' });
  },

};