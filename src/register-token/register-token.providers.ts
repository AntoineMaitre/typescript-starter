import {RegisterTokenSchema} from "./schemas/register-token.schema";

export const registerTokenProviders = [
    {
        provide: 'RegisterTokenModelToken',
        useFactory: mongoose => mongoose.connection.model('RegisterToken', RegisterTokenSchema),
        inject: ['DbToken']
    }
];