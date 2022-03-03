import {ApiProperty} from "@nestjs/swagger";

export class CreatePostDto {

    @ApiProperty({example: 'Лучшие бренды 2022г.', description: 'Заголовок'})
    readonly title: string;

    @ApiProperty({
        example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        description: 'Краткое содержание'
    })
    readonly summary: string;

    @ApiProperty({
        example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        description: 'Контент'
    })
    readonly message: string;

    @ApiProperty({example: '2', description: 'Идентификатор создателя поста'})
    readonly userId: number;

    @ApiProperty({example: '6', description: 'Идентификатор поста'})
    readonly id: number;
}