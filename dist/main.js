"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const session = require("express-session");
const fs = require("fs");
async function bootstrap() {
    const httpsOptions = {
        key: fs.readFileSync('/etc/letsencrpt/54.180.189.44.sslip.io/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/letsencrpt/54.180.189.44.sslip.io/fullchain.pem'),
    };
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        httpsOptions,
    });
    app.use(session({
        secret: 'AgsjqwebjtAEKmaGdsWEkljHfbqKjwietn',
        resave: false,
        saveUninitialized: false,
    }));
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'public'));
    app.setBaseViewsDir((0, path_1.join)(__dirname, '..', 'views'));
    app.setViewEngine('ejs');
    if (!fs.existsSync('./uploads')) {
        fs.mkdirSync('./uploads');
    }
    await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
//# sourceMappingURL=main.js.map