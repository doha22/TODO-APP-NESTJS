import { ApiProperty } from '@nestjs/swagger';
import { UserVm } from './user-vm.model';

export class LoginResponseVm {
    @ApiProperty()
     token: string;

    @ApiProperty({ type: UserVm })
    user: UserVm;
}