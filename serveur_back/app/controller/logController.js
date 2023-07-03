import logger from '../service/logger.js';

const logController = {
  logAction: async (req, res, next) => {
    const { action, message } = req.body;

    try {
      // Log the action and message
      logger.info({ action, message });

      res.status(200).send({ message: 'Action logged successfully.' });
    } catch (error) {
      // Log the error information
      logger.error({ message: error.message, stack: error.stack });

      next(error);
    }
  },
};

export default logController;