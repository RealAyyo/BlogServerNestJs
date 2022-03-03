import {Module} from "@nestjs/common"
import {UsersModule} from './users/users.module';
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/user.model";
import {PostsModule} from './posts/posts.module';
import {Posts} from "./posts/posts.model";
import {AuthModule} from './auth/auth.module';


@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: process.env.USERDB,
            password: process.env.PASSWORDDB,
            database: process.env.DATABASENAME,
            models: [User, Posts],
            autoLoadModels: true
        }),
        UsersModule,
        PostsModule,
        AuthModule
    ]
})

export class AppModule {
}