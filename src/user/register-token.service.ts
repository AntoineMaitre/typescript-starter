import {Model} from "mongoose";
import {IRegisterToken} from "./interfaces/register-token.interface";
import * as crypto from "crypto";
import {Component, Inject} from "@nestjs/common";
import * as randToken from 'rand-token';

@Component()
export class RegisterTokenService {
    constructor(@Inject('RegisterTokenModelToken') private readonly registerTokenModel: Model<IRegisterToken>) {
    }

    async createRegisterToken(): Promise<IRegisterToken> {
        const token = randToken.generator({source: crypto.randomBytes});
        const createdToken = new this.registerTokenModel({register_request_token: token.generate(16), created_at: new Date()});
        return await createdToken.save();
    }

    async handleRegisterToken(registerTokenString: string): Promise<boolean> {
        let registerToken = await this.registerTokenModel.find({register_request_token: registerTokenString}).exec();
        return await registerToken.length > 0;
    }
}