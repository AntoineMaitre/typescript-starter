/**
 * Created by tdoret on 15/01/2018.
 */
import {IsBoolean, IsInt, IsString} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';
import {PlatformType} from '../../platform/interfaces/platform.interface';

export class CreateGameDto {
    @IsString()
    @ApiModelProperty()
    readonly name: string;

    @IsInt()
    @ApiModelProperty()
    readonly platform_type: PlatformType;

    @IsString()
    @ApiModelProperty()
    readonly releaseDate: string;

    @IsBoolean()
    @ApiModelProperty()
    readonly multiPlayer: boolean;

    @IsString()
    @ApiModelProperty()
    readonly description: string;

    @IsString()
    @ApiModelProperty()
    readonly editor: string;
}