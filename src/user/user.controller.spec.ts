import {Test} from '@nestjs/testing';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import {CreateUserDto} from "./dto/create-user.dto";

describe('UserController', () => {
    let userController: UserController;
    let userService: UserService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [UserController],
            components: [UserService, {
                provide: 'UserModelToken',
                useValue: {
                    // TODO add mock implementation
                    // Your mock
                }
            }],
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
            const result: CreateUserDto = {
                username: 'test',
                password: 'azerty1234',
                name: 'John Doe',
                birthDate: '01-01-1990',
                email: 'john.doe@email.com'
            };
            jest.spyOn(userService, 'create').mockImplementation(() => result);

            expect(await userController.create(result)).toBe(result);
        });
    });

    describe('findAll', () => {
        it('should return an array of users', async () => {
            const result = ['test'];
            jest.spyOn(userService, 'findAll').mockImplementation(() => result);

            expect(await userController.findAll()).toBe(result);
        });
    });

    describe('findById', () => {
        it('should return a user', async () => {
            const result = {};
            jest.spyOn(userService, 'findById').mockImplementation(() => result);

            expect(await userController.findById('xxxxx')).toBe(result);
        });
    });

    describe('findByUsername', () => {
        it('should return a user', async () => {
            const result = {username: 'test'};
            jest.spyOn(userService, 'findByUsername').mockImplementation(() => result);

            expect(await userController.findByUsername('test')).toBe(result);
        });
    });
});