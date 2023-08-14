import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ArticlesModule } from './articles/articles.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CatalogModule } from './catalog/catalog.module';
import { ClientModule } from './client/client.module';
import { CatalogModule } from './catalog/catalog.module';

@Module({
  imports: [PrismaModule, ArticlesModule, UsersModule, AuthModule, CatalogModule, ClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
