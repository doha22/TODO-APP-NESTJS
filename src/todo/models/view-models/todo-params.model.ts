import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class TodoParams {
    @ApiProperty() title: string;
    @ApiProperty() description: string;

   
   
}