import {IsString} from 'class-validator';
import {ApiModelProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiModelProperty({type: String})
    @IsString()
    readonly username;

    @ApiModelProperty({type: String})
    @IsString()
    readonly password;

    @ApiModelProperty({type: String})
    @IsString()
    readonly name: string;

    @ApiModelProperty({type: Date, required: false})
    readonly birthDate: Date;

    @ApiModelProperty({type: String})
    @IsString()
    readonly email: string
}

