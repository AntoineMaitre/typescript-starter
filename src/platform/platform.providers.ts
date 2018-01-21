import {PlatformSchema} from './schemas/platform.schema';

export const platformProviders = [
    {
        provide: 'PlatformModelToken',
        useFactory: mongoose => mongoose.connection.model('Platform', PlatformSchema),
        inject: ['DbToken'],
    },
];