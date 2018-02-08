import {NestFactory} from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {ApplicationModule} from './app.module';
import {ValidationPipe} from './common/pipes/validation.pipe';
import {configure, connectLogger, getLogger} from 'log4js';
import * as passport from 'passport';
import * as config from 'config';
import * as mkdirp from 'mkdirp';
import * as session from 'express-session';
import * as bodyParser from "body-parser";
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as responseTime from 'response-time';

async function configureLogging() {
    mkdirp.sync('../logs');
    configure(config.get('server.log4js'));
}

// Configure Logger before everything
configureLogging();

async function bootstrap() {
    if (!process.env.NODE_APP_INSTANCE) {
        console.error('Error : please set environment variable NODE_APP_INSTANCE before starting server');
        process.exit(1);
    }

    // Define logger instance for core
    const logger = getLogger('server.core');
    const {description, version} = require('../package.json');

    logger.info('/*************** *************** ***************/');
    logger.info('/*************** STARTING SERVER ***************/');
    logger.info('/*************** *************** ***************/');


    logger.debug('Using NODE_APP_INSTANCE: ' + config.util.getEnv('NODE_APP_INSTANCE'));

    // Define PORT & HOST
    const port: number = parseInt(process.env.PORT) || parseInt(config.get('server.port'));
    const host: string = process.env.HOST || config.get('server.host');

    // Create app
    const app = await NestFactory.create(ApplicationModule);
    // app.setGlobalPrefix(prefix);

    // Using helmet before all
    app.use(helmet());

    // Use Validation pipe
    app.useGlobalPipes(new ValidationPipe());

    // Body parser
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

    // Custom useful middlewares
    app.use(responseTime());
    app.use(compression());

    // Use passport
    app.use(session({secret: process.env.SECRET_KEY, resave: false, saveUninitialized: false}));
    app.use(passport.initialize());
    app.use(passport.session());

    // Define and connect logger for app
    app.use(connectLogger(getLogger('server.http'), {level: 'info'}));

    // Create and publish Swagger documentation
    const options = new DocumentBuilder()
        .setTitle('Event eSport')
        .setDescription(description)
        .setVersion(version)
        // .setBasePath(prefix)
        .addTag('Security')
        .addTag('User')
        .addTag('Platform')
        .addTag('Game')
        .addTag('Event')
        .addBearerAuth('Authorization')
        .setSchemes('http')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/api', app, document);

    // Lift server instance
    await app.listen(port);
    logger.info('Server listening on port %d (%s:%d)', port, host, port);
    logger.info('API documentation available @ %s:%d/api', host, port);
}

bootstrap();
