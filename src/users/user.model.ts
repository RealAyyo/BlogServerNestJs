import {Column, DataType, Model, Table} from "sequelize-typescript";

interface IUserAttribute{
    email: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, IUserAttribute> {
    @Column({type: DataType.INTEGER, autoIncrement:true, unique:true, primaryKey:true})
    id: number;
    @Column({type: DataType.STRING, allowNull:false, unique:true})
    email:string;
    @Column({type: DataType.STRING, allowNull:false})
    password: string;
}