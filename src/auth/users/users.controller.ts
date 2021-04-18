import { Body, Controller, Delete, Param, Put, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController { 

    constructor(
        private readonly usersService: UsersService
    ) { }

    @UseGuards(AuthGuard('jwt'))
    @Put(':field')
    async updateUser(@Request() req, @Body() user, @Param('field') field: string): Promise<any> {
        const { userId } = req.user
        switch (field) {
            case "username":
                return this.usersService.updateUsername(userId, user.username)
            case "email":
                return this.usersService.updateEmail(userId, user.email)
            case "password":
                return this.usersService.updatePassword(userId, user.password);
        
            default:
                break;
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete()
    async deleteUser(@Request() req) {
        const { userId } = req.user
        return this.usersService.deleteUser(userId);
    }

}
