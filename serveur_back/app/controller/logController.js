import axios from 'axios';

const logController = {

logAction: async (req, res, next) => {
    const { action, message } = req.body;

    try {
      // Post the action to the logging server
      await axios.post('/log', { action, message });

      res.status(200).send({ message: 'Action logged successfully.' });
    } catch (error) {
      next(error);
    }
  },
};

  export default logController;