import {GameSchema} from './schemas/game.schema';

export const gameProviders = [
    {
        provide: 'GameModelToken',
        useFactory: mongoose => mongoose.connection.model('Game', GameSchema),
        inject: ['DbToken'],
    },
];