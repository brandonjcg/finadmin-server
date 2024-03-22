import { Test, TestingModule } from '@nestjs/testing';
import { TransanctionController } from './transaction.controller';
import { TransanctionService } from './transaction.service';

describe('TransanctionController', () => {
  let controller: TransanctionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransanctionController],
      providers: [TransanctionService],
    }).compile();

    controller = module.get<TransanctionController>(TransanctionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
