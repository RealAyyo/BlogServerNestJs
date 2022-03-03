import {forwardRef, Module} from '@nestjs/common';
import {PostsService} from './posts.service';
import {PostsController} from './posts.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Posts} from "./posts.model";
import {User} from "../users/user.model";
import {UsersModule} from "../users/users.module";
import {AuthModule} from "../auth/auth.module";

@Module({
    providers: [PostsService],
    controllers: [PostsController],
    imports: [
        UsersModule,
        SequelizeModule.forFeature([Posts, User]),
        forwardRef(() => AuthModule)
    ],
})
export class PostsModule {
}
