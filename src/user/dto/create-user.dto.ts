import {IsString} from 'class-validator';
import {ApiModelProperty, ApiModelPropertyOptional} from "@nestjs/swagger";

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

    @ApiModelPropertyOptional({type: String})
    readonly birthDate: String;

    @ApiModelProperty({type: String})
    @IsString()
    readonly email: string
}

