import { InstanceType, ModelType, prop } from 'typegoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseModelVm } from '../../../shared/base.model';
// import { UserRole } from './user-role.enum';
import { Expose } from 'class-transformer';

export class UserVm extends BaseModelVm {
    @ApiProperty() 
    @Expose()
    username: string;

    @ApiProperty() 
    @Expose()
    firstName?: string;

    @ApiProperty()
    @Expose()
    lastName?: string;
    
    @ApiProperty()
    @Expose()
    fullName?: string;
}