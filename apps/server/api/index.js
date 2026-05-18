const mainModule = require('../dist/main.js');

// Webpack may wrap export as .default or export directly
const handler = mainModule.default || mainModule;

let cachedHandler;

module.exports = async (req, res) => {
  try {
    if (!cachedHandler) {
      if (typeof handler === 'function') {
        cachedHandler = handler;
      } else {
        throw new Error(`main.js export is not a function. Got: ${typeof handler}. Keys: ${JSON.stringify(Object.keys(mainModule))}`);
      }
    }
    await cachedHandler(req, res);
  } catch (error) {
    console.error('CRASH:', error);
    res.status(500).json({
      message: 'Internal Serverless Crash',
      error: error.message,
      stack: error.stack,
      exportType: typeof mainModule,
      exportKeys: Object.keys(mainModule || {}),
    });
  }
};
