import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as request from 'supertest';
import {Test} from '@nestjs/testing';
import {UserModule} from '../../src/user/user.module';
import {UserService} from "../../src/user/user.service";
import {DatabaseModule} from "../../src/database/database.module";
import {userProviders} from "../../src/user/user.providers";
import {databaseProviders} from "../../src/database/database.providers";

describe('Users', () => {
    const server = express();
    server.use(bodyParser.json());

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [DatabaseModule, UserModule],
            components: [UserService, ...userProviders, ...databaseProviders]
        }).compile();

        const app = module.createNestApplication(server);
        await app.init();
    });

    it(`/POST insert user`, () => {
        return request(server)
            .post('/user')
            .send({
                username: 'johny',
                birthDate: '01-01-1990',
                password: 'azerty1234',
                name: 'John Doe',
                email: 'john.doe@email.com'
            })
            .expect(201);
    });

    it(`/GET users`, async done => {
        const users = await request(server)
            .get('/user')
            .expect(200);

        const [user] = users.body;

        expect(user.name).toBe('johny');
        expect(user.birthDate).toBe('01-01-1990');
        expect(user.password).toBe('azerty1234');
        expect(user.name).toBe('John Doe');
        expect(user.email).toBe('john.doe@email.com');

        done();
    });
});