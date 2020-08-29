"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const exception_filter_1 = require("./configuration/exceptions/exception.filter");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;
async function bootstrap() {
    const appOptions = { cors: true };
    const app = await core_1.NestFactory.create(app_module_1.AppModule, appOptions);
    app.enableCors();
    app.setViewEngine('ejs');
    app.setGlobalPrefix('api');
    app.useGlobalFilters(new exception_filter_1.AllExceptionsFilter());
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Rhema Rapha API')
        .setDescription('Rhema Rapha API description')
        .setVersion('1.0')
        .addTag('Clinic')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT || 3000);
    console.log(`Connect at port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map