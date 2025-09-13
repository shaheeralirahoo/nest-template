import { IsInt, IsNotEmpty, IsString, IsUrl } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class PostDTO {
    @ApiProperty({
        description: 'The title of the post',
        example: 'My First Post'
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        description: 'The content of the post',
        example: 'This is the content of the post.'
    })
    @IsNotEmpty()
    @IsString()
    content: string;

    // Uncomment and modify this if you need to include image validation
    // @ApiProperty({
    //     description: 'The URL of the post image',
    //     example: 'https://example.com/image.jpg'
    // })
    // @IsNotEmpty()
    // @IsUrl()
    image?: string;

    // @ApiProperty({
    //     description: 'The ID of the user who created the post',
    //     example: 1,
    //     required: false,
    // })
    // @IsInt()
    createdby?: number;
}
