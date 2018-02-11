import {IsString} from 'class-validator';
import {ApiModelProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiModelProperty({type: String})
    @IsString()
    readonly twitch_id;

    @ApiModelProperty({type: String})
    @IsString()
    readonly email;

    @ApiModelProperty({type: String})
    @IsString()
    password;

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

