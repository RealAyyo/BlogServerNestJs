import {Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

interface IUserAttribute{
    email: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, IUserAttribute> {

    @ApiProperty({example:'1', description: 'Идентификатор'})
    @Column({type: DataType.INTEGER, autoIncrement:true, unique:true, primaryKey:true})
    id: number;

    @ApiProperty({example:'info@blogium.ru', description: 'Электронный адрес'})
    @Column({type: DataType.STRING, allowNull:false, unique:true})
    email:string;

    @ApiProperty({example:'*********', description: 'пароль'})
    @Column({type: DataType.STRING, allowNull:false})
    password: string;
}