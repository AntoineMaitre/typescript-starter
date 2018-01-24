import {Test} from '@nestjs/testing';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import {CreateUserDto} from "./dto/create-user.dto";
import {userProviders} from "./user.providers";
import {databaseProviders} from "../database/database.providers";
import {IUser} from "./interfaces/user.interface";

describe('UserController', () => {
    let userController: UserController;
    let userService: UserService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [UserController],
            components: [UserService, ...userProviders, ...databaseProviders],
        }).compile();

        userService = module.get<UserService>(UserService);
        userController = module.get<UserController>(UserController);
    });

    it('should all be true', () => {
        expect(userController).toBeDefined();
        expect(userService).toBeDefined();
    });

    describe('create', () => {
        it('should return a new user', async () => {
            const dto: CreateUserDto = new CreateUserDto();
            const result: CreateUserDto = {
                username: 'test',
                password: 'azerty1234',
                name: 'John Doe',
                birthDate: '01-01-1990',
                email: 'john.doe@email.com'
            };
            let spy = jest.spyOn(userService, 'create').mockImplementation(() => result);
            let response = await userController.create(dto);

            expect(spy).toHaveBeenCalledWith(dto);
            expect(spy).toHaveBeenCalledTimes(1);
            expect(response).toBe(result);

            spy.mockReset();
        });
    });

    describe('findAll', () => {
        it('should return an array of users', async () => {
            const result: IUser[] = [];
            let spy = jest.spyOn(userService, 'findAll').mockImplementation(() => result);
            let response = await userController.findAll();

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledTimes(1);
            expect(response).toBe(result);

            spy.mockReset();
        });
    });

    describe('findById', () => {
        it('should return a user', async () => {
            const result = {};
            const id: string = 'xxxxx';
            let spy = jest.spyOn(userService, 'findById').mockImplementation(() => result);
            let response = await userController.findById(id);

            expect(spy).toHaveBeenCalledWith(id);
            expect(spy).toHaveBeenCalledTimes(1);
            expect(response).toBe(result);

            spy.mockReset();
        });
    });

    describe('findByUsername', () => {
        it('should return a user', async () => {
            const result = {username: 'test'};
            const username: string = 'test';
            let spy = jest.spyOn(userService, 'findByUsername').mockImplementation(() => result);
            let response = await userController.findByUsername(username);

            expect(spy).toHaveBeenCalledWith(username);
            expect(spy).toHaveBeenCalledTimes(1);
            expect(response).toBe(result);

            spy.mockReset();
        });
    });
});