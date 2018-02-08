import {IsString, IsInt} from 'class-validator';
import {ApiModelProperty, ApiModelPropertyOptional} from "@nestjs/swagger";
import {Role} from "../interfaces/user.interface";

export class CreateUserDto {
    @ApiModelProperty({type: String})
    @IsString()
    readonly twitch_id;

    @ApiModelProperty({type: String})
    @IsString()
    readonly email;

    @ApiModelProperty({type: String})
    @IsString()
    readonly password;

    @ApiModelProperty({type: String})
    @IsString()
    readonly passwordConfirm;

    @ApiModelProperty({type: String})
    @IsString()
    readonly username;

    @ApiModelProperty({type: String})
    @IsString()
    readonly avatar;

    @ApiModelProperty({type: String})
    @IsString()
    readonly accessToken;

    @ApiModelProperty({type: String})
    @IsString()
    readonly refreshToken;

    @ApiModelProperty({type: Number, isArray: true})
    readonly role;
}

