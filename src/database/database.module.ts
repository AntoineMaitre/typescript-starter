import {Module} from '@nestjs/common';
import {IridiumDatabaseService} from "./iridium.database.service";

@Module({
    components: [IridiumDatabaseService],
    exports: [IridiumDatabaseService],
})
export class DatabaseModule {
}