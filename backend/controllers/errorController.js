export default {
    get404(req, res, next) {
      res.status(404).send('Page not found');
    },
  
    async get500(error, req, res, next) {
      res.status(error.status || 500).send('Something went wrong!');
    },
  };
  