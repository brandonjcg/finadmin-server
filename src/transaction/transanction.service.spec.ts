import { Test, TestingModule } from '@nestjs/testing';
import { TransanctionService } from './transaction.service';

describe('TransanctionService', () => {
  let service: TransanctionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransanctionService],
    }).compile();

    service = module.get<TransanctionService>(TransanctionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
