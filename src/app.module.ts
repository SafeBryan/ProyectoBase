import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres', // Cambia esto según tu base de datos
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '081012',
      database: 'pruebas',
      autoLoadEntities: true,
      synchronize: true, // No usar en producción
    }),
    UserModule,
  ],
})
export class AppModule {}