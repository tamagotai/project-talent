import projectModel from "../models/projectModel.js";

export default {
  getAllProjects: async (req, res) => {
    const projects = await projectModel.getAllProjects();
    res.json(projects);
  },

  getProject: async (req, res) => {
    const project = await projectModel.getProjectById(req.params.id);
    if (!project)
      res.status(404).json('no reocrd with given id :' + req.params.id)
    else
      res.json(project)
  },

  deleteProject: async (req, res) => {
    const affectedRows = await projectModel.deleteProject(req.params.id);
    if (affectedRows == 0)
      res.status(404).json('no record with given id : ' + req.params.id)
    else
      res.status(204).json({message: req.params.id + 'deleted successfully.'}).end()      
  },

  updateProject: async (req, res) => {
    const affectedRows = await projectModel.updateProject(req.params.id, req.body);
    if (affectedRows == 0)
      res.status(404).json('no record with given id: ' + req.params.id)
    else {
      const updatedProject = await projectModel.getProjectById(req.params.id)
      res.json({
        message: req.params.id = ' has been updated successfully.',
        project: updatedProject
      });
    }
  },

 createProject: async (req, res) => {
    const id = await projectModel.createProject(req.body);
    const project = await projectModel.getProjectById(id);
    res.status(201).json({
      message: 'Project has been created successfully.',
      project: project,
    });
  },

  upsertProject: async (req, res) => {
    if (req.params.id) {  // If ID is provided, it's an update
      const affectedRows = await projectModel.updateProject(req.params.id, req.body);
      if (affectedRows == 0) {
        res.status(404).json('no record with given id: ' + req.params.id);
      } else {
        const updatedProject = await projectModel.getProjectById(req.params.id);
        res.json({
          message: req.params.id + ' has been updated successfully.',
          project: updatedProject
        });
      }
    } else {  // Otherwise, it's a create
      try {
        const id = await projectModel.createProject(req.body);
        const project = await projectModel.getProjectById(id);
        res.status(201).json({
          message: 'Project has been created successfully.',
          project: project,
        });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    }
  },
};
