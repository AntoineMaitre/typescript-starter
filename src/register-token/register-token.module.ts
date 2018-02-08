/**
 * Created by tdoret on 15/01/2018.
 */
import {Module} from '@nestjs/common';
import {DatabaseModule} from "../database/database.module";
import {registerTokenProviders} from "./register-token.providers";
import {RegisterTokenService} from "./register-token.service";

@Module({
    imports: [DatabaseModule],
    controllers: [],
    components: [RegisterTokenService, ...registerTokenProviders],
    exports: [RegisterTokenService, ...registerTokenProviders]
})

export class RegisterTokenModule {}