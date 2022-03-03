import {Body, Controller, Get, Post, Res} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../users/dto/create.user.dto";
import {AuthService} from "./auth.service";
import {Response} from 'express'

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @ApiOperation({summary: "Вход"})
    @ApiResponse({status: 200, type: String})
    @Post('/signin')
    signIn(@Body() userDto: CreateUserDto, @Res({passthrough: true}) response: Response) {
        return this.authService.signIn(userDto, response)
    }

    @ApiOperation({summary: "Регистрация"})
    @ApiResponse({status: 200, type: String})
    @Post('/signup')
    signUp(@Body() userDto: CreateUserDto) {
        return this.authService.signUp(userDto)
    }

    @ApiOperation({summary: "Выход"})
    @ApiResponse({status: 200, type: String})
    @Get('/logout')
    logout(@Res({passthrough: true}) response: Response) {
        return this.authService.logout(response)
    }

}
