const handler = require('../dist/main.js').default;

module.exports = async (req, res) => {
  try {
    await handler(req, res);
  } catch (error) {
    console.error('CRASH IN SERVERLESS FUNCTION:', error);
    res.status(500).json({
      message: 'Internal Serverless Crash',
      error: error.message,
      stack: error.stack
    });
  }
};
