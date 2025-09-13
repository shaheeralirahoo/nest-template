import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EntityModule } from './entitties.module';
import { AuthController } from 'src/controllers/auth.controller';
import { AuthService } from 'src/services/auth.service';
import { AuthGuard } from 'src/utils/guards/auth.guard';
import { RolesGuard } from 'src/utils/guards/roles.guard';
import { RepoService } from 'src/services/repo.service';

@Module({
  imports: [
    EntityModule,
       JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret_key', // Use the environment variable for the secret
      signOptions: { expiresIn: process.env.JwtSecret },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, RolesGuard, RepoService],
  exports: [AuthGuard, RolesGuard],
})
export class AuthModule {}
