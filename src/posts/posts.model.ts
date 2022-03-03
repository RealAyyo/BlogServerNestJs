import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/user.model";

interface IPostAttribute {
    author: string;
    title: string;
    message: string;
    userId: number;
}

@Table({tableName: 'posts'})
export class Posts extends Model<Posts, IPostAttribute> {

    @ApiProperty({example: '3', description: 'Идентификатор'})
    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Lorem ipsum', description: 'Заголовок'})
    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @ApiProperty({example: 'Lorem ipsum dolor sit amet, lorem dolor sit amet.', description: 'Краткое содержание'})
    @Column({type: DataType.STRING, allowNull: false})
    summary: string;

    @ApiProperty({example: 'info@blogium.ru', description: 'Текст публикации'})
    @Column({type: DataType.JSONB(), allowNull: false})
    message: string;

    @ApiProperty({example: '1', description: 'Идентификатор автора'})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    author: User
}