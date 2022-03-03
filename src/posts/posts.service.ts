import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "../users/user.model";
import {Posts} from "./posts.model";
import {CreatePostDto} from "./dto/create.post.dto";
import {JwtService} from "@nestjs/jwt";
import {UsersService} from "../users/users.service";

@Injectable()
export class PostsService {

    constructor(@InjectModel(Posts) private postsRepository: typeof Posts,
                private userService: UsersService,
                private jwtService: JwtService) {
    }

    async postsGetAll() {
        const posts = await this.postsRepository.findAll({
            order: [['updatedAt', 'DESC']], include: {
                model: User,
                attributes: ['id', 'email']
            }
        })
        return posts;
    }

    async postGetOne(id) {
        const post = await this.postsRepository.findOne(
            {
                where: {id},
                include: {
                    model: User,
                    attributes: ['id', 'email']
                }
            });

        return post;
    }

    async postCreate(dto: CreatePostDto) {
        const post = await this.postsRepository.create(dto);
        return post;
    }

    async postDelete(id: number) {
        const post = await this.postsRepository.destroy({where: {id}});
        return post;
    }

    async getUserPosts(request) {
        const user = await this.userService.getUser(request)
        const posts = await this.postsRepository.findAll({
            where: {userId: user.id},
            order: [['updatedAt', 'DESC']],
            include: {
                model: User,
                attributes: ['id', 'email']
            }
        })
        return posts;

    }

    async editPost(dto: CreatePostDto, request) {
        const cookie = request.cookies['jwt']
        const verify = await this.jwtService.verifyAsync(cookie)
        const post = await this.postsRepository.findOne(
            {
                where: {id: dto.id},
                include: {
                    model: User,
                    attributes: ['id', 'email']
                }
            });

        if (verify.id === post.author.id) {
            post.summary = dto.summary
            post.title = dto.title
            post.message = dto.message
            await post.save()
        } else {
            throw new HttpException('У вас нет доступа', HttpStatus.BAD_REQUEST)
        }
    }
}
