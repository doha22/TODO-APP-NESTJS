import { ApiPropertyOptional } from '@nestjs/swagger';
import { LoginVm } from './login-vm.model';

export class RegisterVm extends LoginVm {
    @ApiPropertyOptional({ example: 'John' })
    // example will be shown in swagger
    firstName?: string;

    @ApiPropertyOptional({ example: 'Doe' })
    lastName?: string;
}