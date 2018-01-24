import {UserService} from './user.service';
import {CreateUserDto} from "./dto/create-user.dto";

const userModelMock = {};


describe('UserService', () => {
    let userModel: any;
    let userService: UserService;

    beforeEach(async () => {
        userModel = {};
        userService = new UserService(userModel);
    });

    describe('create', () => {
        it('should return a new user', async () => {
            let userModelInstance = {};
            const dto: CreateUserDto = new CreateUserDto();
            const result: string = '';
            let spyConstructor = userModel["new"] = jest.fn(() => userModelInstance);
            let spy = userModelInstance["save"] = jest.fn(() => result);

            let response = await userService.create(dto);

            expect(spyConstructor).toHaveBeenCalledWith(dto);
            expect(spy).toHaveBeenCalled();
            expect(response).toBe(result);

            spy.mockReset();
        });
    });

    // describe('findAll', () => {
    //     it('should return an array of users', async () => {
    //         const result = ['test'];
    //         jest.spyOn(userService, 'findAll').mockImplementation(() => result);
    //
    //         expect(await userController.findAll()).toBe(result);
    //     });
    // });
    //
    // describe('findById', () => {
    //     it('should return a user', async () => {
    //         const result = {};
    //         jest.spyOn(userService, 'findById').mockImplementation(() => result);
    //
    //         expect(await userController.findById('xxxxx')).toBe(result);
    //     });
    // });
    //
    // describe('findByUsername', () => {
    //     it('should return a user', async () => {
    //         const result = {username: 'test'};
    //         jest.spyOn(userService, 'findByUsername').mockImplementation(() => result);
    //
    //         expect(await userController.findByUsername('test')).toBe(result);
    //     });
    // });
});