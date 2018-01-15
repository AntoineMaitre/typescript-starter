import {Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {AppController} from './app.controller';
import {AuthModule} from './auth/auth.module';
import {UserModule} from './User/user.module';

@Module({
    imports: [AuthModule, UserModule, MongooseModule.forRoot('mongodb://dev:dev@ds119368.mlab.com:19368/event-esport')],
  controllers: [AppController],
  components: [],
})
export class ApplicationModule {}
