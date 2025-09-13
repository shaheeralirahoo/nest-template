import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "../services/auth.service"; 
import {LogInDTO, SignUpDTO} from "../dto/auth.dto"
import { JwtService } from "@nestjs/jwt";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/utils/decorators/role.decorators";
import { IsPublic } from "src/utils/decorators/pubic.docator";


@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}
  @IsPublic()
  @Post('signUp')
  async signUpController(@Body() body: SignUpDTO): Promise<any> {
    return this.authService.signUp(body);
  }

  @IsPublic()
  @Post('login')
  async LogInontroller(@Body() body: LogInDTO): Promise<any> {
    return this.authService.login(body);
  }

  @ApiBearerAuth()
  @Roles(["admin"])
  @Post("check")
  checktoken(){
    return true
  }
}
