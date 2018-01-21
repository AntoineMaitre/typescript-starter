import {EventSchema} from './schemas/event.schema';

export const eventProviders = [
    {
        provide: 'EventModelToken',
        useFactory: mongoose => mongoose.connection.model('Event', EventSchema),
        inject: ['DbToken'],
    },
];