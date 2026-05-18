// Static require so Vercel's nft bundler can trace and include dist/main.js
const handler = require('../dist/main.js').default;

let cachedHandler;

module.exports = async (req, res) => {
  try {
    if (!cachedHandler) {
      cachedHandler = handler;
    }
    await cachedHandler(req, res);
  } catch (error) {
    console.error('CRASH:', error);
    res.status(500).json({
      message: 'Internal Serverless Crash',
      error: error.message,
      stack: error.stack,
    });
  }
};
