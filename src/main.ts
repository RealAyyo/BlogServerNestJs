import {NestFactory} from '@nestjs/core'
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";

async function run() {
    const PORT = process.env.PORT
    const app = await NestFactory.create(AppModule)
    const config = new DocumentBuilder()
        .setVersion('1.0.0')
        .setTitle('Blogium')
        .setDescription('REST API Documentation')
        .addTag('Blogium')
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/documents', app, document)

    app.use(cookieParser());
    app.enableCors({
        origin: 'https://monarque.ru',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    await app.listen(PORT, () => console.log(`Сервер запущен на ${PORT} порту`))

}

run()