import {UserSchema} from './schemas/user.schema';

export const userProviders = [
    {
        provide: 'UserModelToken',
        useFactory: mongoose => mongoose.connection.model('User', UserSchema),
        inject: ['DbToken'],
    },
];