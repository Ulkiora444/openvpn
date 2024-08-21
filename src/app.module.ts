import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthenticationModule } from './authentication/authentication.module';
import { ImagesModule } from './images/images.module';
import { Users } from './Entities/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { PlansModule } from './plans/plans.module';
import { UsersModule } from './users/users.module';
import { Active_PlansModule } from './active_plans/active_plans.module';
import { Plans } from './Entities/plans.entity';
import { Active_Plans } from './Entities/active_plans.entity';
import { ChecksModule } from './checks/checks.module';
import { HistoryModule } from './history/history.module';
import { Checks } from './Entities/checks.entity';
import { History } from './Entities/history.entity';
import { RolesModule } from './roles/roles.module';
import { ReplenishModule } from './replenish/replenish.module';
import { Roles } from './Entities/roles.entity';
import { Replenish } from './Entities/replenish.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'template1',
      entities: [
        Users,
        Plans,
        Active_Plans,
        Checks,
        History,
        Roles,
        Replenish
      ],
      autoLoadEntities: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..','public'
      , 'images')
    }),
    JwtModule.register({
      secret: "asdhflaskjhrfaiseuro7qwi3yr2378ryboqw73gyroda873yfak37yrfauyr7ay3d8yod482q34h89dq2394h9q82o7dh3847fli3847h8fiw457uwt458qyhod38y4ojq9823dbot8w3h4djj85dho48w75ofiwh4j4d875slfih45lise4fh837o4985f7q89d520850dllafzqzowirjcnewuirtw",
      signOptions: { expiresIn: '24h' },
    }),
    AuthenticationModule,
    ImagesModule,
    UsersModule,
    PlansModule,
    Active_PlansModule,
    ChecksModule,
    HistoryModule,
    RolesModule,
    ReplenishModule
  ],
  providers: [],
})
export class AppModule {}
