/**
 * Created by tdoret on 15/01/2018.
 */
import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import {UserSchema} from './schemas/user.schema';

@Module({
    components: [UserService],
    controllers: [UserController],
    imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}])],
    exports: [UserService]
})

export class UserModule {
}