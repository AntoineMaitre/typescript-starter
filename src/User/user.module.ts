/**
 * Created by tdoret on 15/01/2018.
 */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from './schemas/user.schema';
import {RegisterTokenSchema} from './schemas/registerToken.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }, { name: 'RegisterToken', schema: RegisterTokenSchema }])],
    controllers: [UserController],
    components: [UserService],
})

export class UserModule {}