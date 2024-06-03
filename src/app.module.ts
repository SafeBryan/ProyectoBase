import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "root",
      password: "081012",
      database: "proyecto",
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
