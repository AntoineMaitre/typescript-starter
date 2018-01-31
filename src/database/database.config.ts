import {IridiumDatabaseConfig} from "./iridium.database.config";
import {Configuration} from "iridium";
import {Component} from "@nestjs/common";
import * as config from 'config';

@Component()
export class DatabaseConfig extends IridiumDatabaseConfig {

    getConfiguration(): Configuration {
        return JSON.parse(config.get('server.mongo.connectionString'));
    }
}