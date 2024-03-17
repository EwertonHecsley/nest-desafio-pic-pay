import { Controller, Get, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async listAllUsers(@Res() res: Response) {
        const users = await this.userService.listAllUsers();

        return res.json(users);
    }
}
