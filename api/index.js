const path = require('path');

// At runtime in Vercel: __dirname = /var/task/api
// apps/server/dist is at /var/task/apps/server/dist
const mainPath = path.join(__dirname, '..', 'apps', 'server', 'dist', 'main.js');

let cachedHandler;

module.exports = async (req, res) => {
  try {
    if (!cachedHandler) {
      cachedHandler = require(mainPath).default;
    }
    await cachedHandler(req, res);
  } catch (error) {
    console.error('CRASH:', error);
    res.status(500).json({
      message: 'Internal Serverless Crash',
      error: error.message,
      stack: error.stack,
      dirname: __dirname,
      resolved: mainPath,
    });
  }
};
