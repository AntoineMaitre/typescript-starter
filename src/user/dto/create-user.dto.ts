import {IsDateString, IsString} from 'class-validator';
import {ApiModelProperty, ApiModelPropertyOptional} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiModelProperty({type: String})
    @IsString()
    readonly username: string;

    @ApiModelProperty({type: String})
    @IsString()
    password: string;

    @ApiModelProperty({type: String})
    @IsString()
    readonly name: string;

    @ApiModelPropertyOptional({type: String})
    @IsDateString()
    readonly birthDate: String;

    @ApiModelProperty({type: String})
    @IsString()
    readonly email: string
}

