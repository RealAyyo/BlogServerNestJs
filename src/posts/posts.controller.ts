import {Body, Controller, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Posts} from "./posts.model";
import {PostsService} from "./posts.service";
import {CreatePostDto} from "./dto/create.post.dto";
import {Request} from "express";
import {AuthGuard} from "../auth/auth.guard";

@ApiTags('Работа с постами')
@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {
    }

    @ApiOperation({summary: "Получить все посты"})
    @ApiResponse({status: 200, type: [Posts]})
    @Get()
    getAllPosts() {
        return this.postsService.postsGetAll()
    }

    @ApiOperation({summary: "Создание поста"})
    @ApiResponse({status: 200, type: [Posts]})
    @UseGuards(AuthGuard)
    @Post()
    createPost(@Body() dto: CreatePostDto) {
        return this.postsService.postCreate(dto)
    }

    @ApiOperation({summary: "Удаление поста"})
    @ApiResponse({status: 200, type: [Posts]})
    @UseGuards(AuthGuard)
    @Post('/delete')
    deletePost(@Body() {id}) {
        return this.postsService.postDelete(id)
    }

    @ApiOperation({summary: "Получить пост"})
    @ApiResponse({status: 200, type: [Posts]})
    @Get('/one/:id')
    postGetOne(@Param('id') id) {
        return this.postsService.postGetOne(id)
    }

    @ApiOperation({summary: "Посты пользователя"})
    @ApiResponse({status: 200, type: [Posts]})
    @UseGuards(AuthGuard)
    @Get('/userPosts')
    getUserPosts(@Req() request: Request) {
        return this.postsService.getUserPosts(request)
    }

    @ApiOperation({summary: "Изменение поста"})
    @ApiResponse({status: 200, type: [Posts]})
    @UseGuards(AuthGuard)
    @Put()
    editPost(@Body() dto: CreatePostDto, @Req() request: Request) {
        return this.postsService.editPost(dto, request)
    }

}
