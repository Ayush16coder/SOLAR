"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    return app;
}
let cachedApp;
async function handler(req, res) {
    if (!cachedApp) {
        const app = await bootstrap();
        await app.init();
        cachedApp = app.getHttpAdapter().getInstance();
    }
    cachedApp(req, res);
}
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    bootstrap().then(async (app) => {
        const port = process.env.PORT || 3001;
        await app.listen(port);
        console.log(`Server running on port ${port}`);
    });
}
//# sourceMappingURL=main.js.map