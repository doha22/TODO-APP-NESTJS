import { ApiProperty } from '@nestjs/swagger';
import { BaseModelVm } from '../../../shared/base.model';

import { Expose } from 'class-transformer';

export class TodoVm extends BaseModelVm {
    @ApiProperty() 
    @Expose()
    title: string;
  
    @ApiProperty() 
    @Expose()
    description: string;

    @ApiProperty() 
    @Expose()
    isCompleted: boolean;
}