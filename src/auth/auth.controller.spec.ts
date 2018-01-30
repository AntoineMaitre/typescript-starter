import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {UserAuthDto} from "./dto/user-auth.dto";
import {UnauthorizedException} from "@nestjs/common";

describe('AuthController', () => {
    let authController: AuthController;
    let authService: AuthService;

    beforeEach(() => {
        authService = new AuthService(null);
        authController = new AuthController(authService);
    });

    describe('authenticate', () => {
        it('if authenticateUser not failed should authenticate a user', async () => {
            const dto: UserAuthDto = {
                email: 'test',
                password: 'azerty1234'
            };
            const user = {};
            const result = {};
            let spyAuthenticateUser = jest.spyOn(authService, 'authenticateUser').mockImplementation(() => Promise.resolve(user));
            let spyCreateToken = jest.spyOn(authService, 'createToken').mockImplementation(() => result);
            let response = await authController.authenticate(dto);

            expect.assertions(5);
            expect(spyCreateToken).toHaveBeenCalled();
            expect(spyAuthenticateUser).toHaveBeenCalledWith(dto);
            expect(spyCreateToken).toHaveBeenCalledTimes(1);
            expect(spyAuthenticateUser).toHaveBeenCalledTimes(1);
            expect(response).toBe(result);

            spyCreateToken.mockReset();
        });

        it('if authenticateUser failed should throw unauthorized exception', async () => {
            const dto: UserAuthDto = {
                email: 'test',
                password: 'azerty1234'
            };
            const result = {
                errorCode: 401,
                errorMessage: 'User not found or incorrect password'
            };
            let spyAuthenticateUser =
                jest.spyOn(authService, 'authenticateUser')
                    .mockImplementation(() => {
                        throw new UnauthorizedException()
                    });
            let spyCreateToken = jest.spyOn(authService, 'createToken').mockImplementation(() => result);

            expect.assertions(4);
            expect(spyAuthenticateUser).toThrow(UnauthorizedException);
            expect(spyCreateToken).toHaveBeenCalledTimes(0);
            expect(spyAuthenticateUser).toHaveBeenCalled();
            expect(spyAuthenticateUser).toHaveBeenCalledTimes(1);

            spyAuthenticateUser.mockReset();
            spyCreateToken.mockReset();
        });
    });
});