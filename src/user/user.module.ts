/**
 * Created by tdoret on 15/01/2018.
 */
import {Module} from '@nestjs/common';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import {DatabaseModule} from "../database/database.module";
import {DatabaseConfig} from "../database/database.config";
import {IridiumDatabaseConfig} from "../database/iridium.database.config";

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    components: [UserService, {provide: IridiumDatabaseConfig, useClass: DatabaseConfig}],
})

export class UserModule {
}