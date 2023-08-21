import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionLogService } from './subscription-log.service';

describe('SubscriptionLogService', () => {
  let service: SubscriptionLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscriptionLogService],
    }).compile();

    service = module.get<SubscriptionLogService>(SubscriptionLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
