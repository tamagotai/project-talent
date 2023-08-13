import vacancyModel from "../models/vacancyModel.js";

export default {
  getAllVacancies: async (req, res) => {
    const vacancies = await vacancyModel.getAllVacancies();
    res.json(vacancies);
  },

  getVacancy: async (req, res) => {
    const vacancy = await vacancyModel.getVacancyById(req.params.id);
    if (!vacancy) {
      res.status(404).json('No record with given id: ' + req.params.id);
    } else {
      res.json(vacancy);
    }
  },

//   deleteVacancy: async (req, res) => {
//     const affectedRows = await vacancyModel.deleteVacancy(req.params.id);
//     if (affectedRows == 0) {
//       res.status(404).json('No record with given id: ' + req.params.id);
//     } else {
//       res.status(204).json({ message: req.params.id + ' deleted successfully.' }).end();
//     }
//   },

//   updateVacancy: async (req, res) => {
//     const affectedRows = await vacancyModel.updateVacancy(req.params.id, req.body);
//     if (affectedRows == 0) {
//       res.status(404).json('No record with given id: ' + req.params.id);
//     } else {
//       const updatedVacancy = await vacancyModel.getVacancyById(req.params.id);
//       res.json({
//         message: req.params.id + ' has been updated successfully.',
//         vacancy: updatedVacancy
//       });
//     }
//   },

//   createVacancy: async (req, res) => {
//     try {
//       const id = await vacancyModel.createVacancy(req.body);
//       const vacancy = await vacancyModel.getVacancyById(id);
//       res.status(201).json({
//         message: 'Vacancy has been created successfully.',
//         vacancy: vacancy,
//       });
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   },

//   upsertVacancy: async (req, res) => {
//     if (req.params.id) {  // If ID is provided, it's an update
//       const affectedRows = await vacancyModel.updateVacancy(req.params.id, req.body);
//       if (affectedRows == 0) {
//         res.status(404).json('No record with given id: ' + req.params.id);
//       } else {
//         const updatedVacancy = await vacancyModel.getVacancyById(req.params.id);
//         res.json({
//           message: req.params.id + ' has been updated successfully.',
//           vacancy: updatedVacancy
//         });
//       }
//     } else {  // Otherwise, it's a create
//       try {
//         const id = await vacancyModel.createVacancy(req.body);
//         const vacancy = await vacancyModel.getVacancyById(id);
//         res.status(201).json({
//           message: 'Vacancy has been created successfully.',
//           vacancy: vacancy,
//         });
//       } catch (error) {
//         res.status(400).json({ message: error.message });
//       }
//     }
//   },
};
