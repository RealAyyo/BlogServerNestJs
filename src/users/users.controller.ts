import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {CreateUserDto} from "./dto/create.user.dto";
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./user.model";
import {AuthGuard} from "../auth/auth.guard";
import {Request} from 'express'

@ApiTags('Работа с пользователями')
@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {
    }

    @ApiOperation({summary: "Новый пользователь"})
    @ApiResponse({status: 200, type: User})
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.userCreate(userDto)
    }

    @ApiOperation({summary: "Получить информацию профиля"})
    @ApiResponse({status: 200, type: User})
    @UseGuards(AuthGuard)
    @Get()
    getUser(@Req() request: Request) {
        return this.userService.getUser(request)
    }
}
