import {UserSchema} from './schemas/user.schema';

export const userModelTokenProvider = {
    provide: 'UserModelToken',
    useFactory: mongoose => mongoose.connection.model('User', UserSchema),
    inject: ['DbToken']
};

export const userProviders = [
    {
        provide: 'UserModelToken',
        useFactory: mongoose => mongoose.connection.model('User', UserSchema),
        inject: ['DbToken']
    }
];