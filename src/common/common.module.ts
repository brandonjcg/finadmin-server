import { Module } from '@nestjs/common';

import { DBModule } from './database/database.module';
import { CommonModule as OtherCommonModule } from './config/common.module';

@Module({
  imports: [OtherCommonModule, DBModule],
  exports: [OtherCommonModule, DBModule],
})
export class CommonModule {}
