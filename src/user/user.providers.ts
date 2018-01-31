import {UserSchema} from './schemas/user.schema';
import {RegisterTokenSchema} from "./schemas/register-token.schema";

export const userProviders = [
    {
        provide: 'UserModelToken',
        useFactory: mongoose => mongoose.connection.model('User', UserSchema),
        inject: ['DbToken']
    },
    {
        provide: 'RegisterTokenModelToken',
        useFactory: mongoose => mongoose.connection.model('RegisterToken', RegisterTokenSchema),
        inject: ['DbToken']
    }
];