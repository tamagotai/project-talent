export default {
    get404: async (req, res, next) => {
      res.status(404).send('Page not found');
    },
  
    get500: async (error, req, res, next) => {
      res.status(error.status || 500).json({ error: "Something went wrong." });
    },
  };
  