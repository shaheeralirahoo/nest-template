import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from './utils/guards/auth.guard';
import { RolesGuard } from './utils/guards/roles.guard';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from './modules/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth.module';
import { EntityModule } from './modules/entitties.module';
import { TypeOrmModuleRootAsync } from './configs/typeOrm.config';
import { PostModule } from './modules/post.module';
import { TransformInterceptor } from './utils/interceptors/reponse.interceptor';


@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret_key', // Use the environment variable for the secret
      signOptions: { expiresIn: process.env.JwtSecret },
    }),
    TypeOrmModuleRootAsync,
    EntityModule,
    UserModule,
    AuthModule,
    PostModule,

  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide:APP_INTERCEPTOR,
      useClass:TransformInterceptor
    }
  ],
})
export class AppModule { }
