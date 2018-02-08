import {RegisterTokenSchema} from "../user/schemas/register-token.schema";

export const registerTokenProviders = [
    {
        provide: 'RegisterTokenModelToken',
        useFactory: mongoose => mongoose.connection.model('RegisterToken', RegisterTokenSchema),
        inject: ['DbToken']
    }
];