import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CatalogModule } from './catalog/catalog.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, CatalogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
