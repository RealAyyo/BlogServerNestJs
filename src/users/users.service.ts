import {Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./user.model";
import {CreateUserDto} from "./dto/create.user.dto";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
                private jwtService: JwtService) {
    }

    async userCreate(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        return user;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}})
        return user
    }

    async getUser(request) {
        try {
            const cookie = request.cookies['jwt']
            const verify = await this.jwtService.verifyAsync(cookie)
            if (!verify) {
                throw new UnauthorizedException({message: 'Нет доступа'})
            }
            const user = await this.getUserByEmail(verify.email)
            const userData = {id: user.id, email: user.email}
            return userData
        } catch (e) {
            throw new UnauthorizedException({message: 'Пользователь не авторизирован'})
        }

    }
}
