import * as mongoose from 'mongoose';
import * as config from 'config';
import {Mockgoose} from 'mockgoose-fix';

export const dbTokenProvider = {
    provide: 'DbToken',
    useFactory: async () => {
        (mongoose as any).Promise = global.Promise;

        if (process.env.NODE_ENV === 'test') {
            const mockgoose = new Mockgoose(mongoose);
            mockgoose.helper.setDbVersion('3.4.3');

            mockgoose.prepareStorage().then(async () => {
                await mongoose.connect(config.get('server.mongo.connectionString'), {
                    useMongoClient: true,
                });
            });
        } else {
            await mongoose.connect(config.get('server.mongo.connectionString'), {
                useMongoClient: true,
            });
        }

        return mongoose;
    }
};

export const databaseProviders = [
    {
        provide: 'DbToken',
        useFactory: async () => {
            (mongoose as any).Promise = global.Promise;

            if (process.env.NODE_ENV === 'test') {
                const mockgoose = new Mockgoose(mongoose);
                mockgoose.helper.setDbVersion('3.4.3');

                mockgoose.prepareStorage().then(async () => {
                    await mongoose.connect(config.get('server.mongo.connectionString'), {
                        useMongoClient: true,
                    });
                });
            } else {
                await mongoose.connect(config.get('server.mongo.connectionString'), {
                    useMongoClient: true,
                });
            }

            return mongoose;
        }
    }
];