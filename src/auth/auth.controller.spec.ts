import {Test} from '@nestjs/testing';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {UserAuthDto} from "./dto/user-auth.dto";
import {userProviders} from "../user/user.providers";
import {databaseProviders} from "../database/database.providers";

describe('AuthController', () => {
    let authController: AuthController;
    let authService: AuthService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [AuthController],
            components: [AuthService, ...userProviders, ...databaseProviders],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        authController = module.get<AuthController>(AuthController);
    });

    it('should all be true', () => {
        expect(authController).toBeDefined();
        expect(authService).toBeDefined();
    });

    describe('authenticate', () => {
        it('should authenticate a user', async () => {
            const result: UserAuthDto = {
                username: 'test',
                password: 'azerty1234'
            };
            jest.spyOn(authService, 'createToken').mockImplementation(() => result);

            expect(await authController.authenticate(result)).toBe(result);
        });
    });
});