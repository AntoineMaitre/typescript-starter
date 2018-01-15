import {NestFactory} from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {ApplicationModule} from './app.module';
import {ValidationPipe} from './common/pipes/validation.pipe';

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule);
    const options = new DocumentBuilder()
        .setTitle('Event eSport')
        .setDescription('The Event eSport API')
        .setVersion('1.0')
        .addTag('Security')
        .addTag('User')
        .addTag('Twitch')
        .addTag('Platform')
        .addBearerAuth("access_token")
        .setSchemes('http')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/api', app, document);
    app.useGlobalPipes(new ValidationPipe());
    log4js.configure({
        appenders: {cheese: {type: 'file', filename: 'cheese.log'}},
        categories: {default: {appenders: ['cheese'], level: 'error'}}
    });
    await app.listen(3000);
}

bootstrap();
