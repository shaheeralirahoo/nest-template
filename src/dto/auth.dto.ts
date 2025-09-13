import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';  // Import the @ApiProperty decorator
import { Role } from 'src/utils/app.enums';

export class SignUpDTO {
    @ApiProperty({
        description: 'The role of the user, must be a valid enum value.',
        enum: Role,  // Use enum to specify the allowed values in Swagger UI
        example: Role.User,  // Example value for Swagger UI
    })
    @IsEnum(Role, { message: 'Role must be a valid enum value' })
    role: Role;

    @ApiProperty({
        description: 'The full name of the user.',
        example: 'John Doe',  // Example value for Swagger UI
    })
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name cannot be empty' })
    name: string;

    @ApiProperty({
        description: 'The email address of the user.',
        example: 'user@example.com',  // Example value for Swagger UI
    })
    @IsEmail({}, { message: 'Email must be a valid email address' })
    email: string;

    @ApiProperty({
        description: 'The password for the user.',
        example: 'Test@123',  // Example value for Swagger UI
    })
    @IsString({ message: 'Password must be a string' })
    @IsNotEmpty({ message: 'Password cannot be empty' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: 'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character',
    })
    password: string;
}


export class LogInDTO {
    @ApiProperty({
        description: 'The role of the user, must be a valid enum value.',
        enum: Role,  // Use enum to specify the allowed values in Swagger UI
        example: Role.User,  // Example value for Swagger UI
    })
    @IsEnum(Role, { message: 'Role must be a valid enum value' })
    role: Role;

    @ApiProperty({
        description: 'The email address of the user.',
        example: 'user@example.com',  // Example value for Swagger UI
    })
    @IsEmail({}, { message: 'Email must be a valid email address' })
    email: string;

    @ApiProperty({
        description: 'The password for the user.',
        example: 'Test@123',  // Example value for Swagger UI
    })
    @IsString({ message: 'Password must be a string' })
    @IsNotEmpty({ message: 'Password cannot be empty' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })  
    password: string;

    @ApiProperty({
        description: 'The device identity of the user.',
        example: 'device1234',  // Example value for Swagger UI
    })
    @IsString({ message: 'Device Identity must be a string' })
    @IsNotEmpty({ message: 'Device Identity cannot be empty' })
    deviceIdentity: string;

    @ApiProperty({
        description: 'The FCM token for the user.',
        example: 'fcmToken12345', 
    })
    @IsString({ message: 'FCM Token must be a string' })
    @IsNotEmpty({ message: 'FCM Token cannot be empty' })
    fcmToken: string;
}


