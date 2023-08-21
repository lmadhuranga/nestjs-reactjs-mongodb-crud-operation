import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionLogController } from './subscription-log.controller';
import { SubscriptionLogService } from './subscription-log.service';

describe('SubscriptionLogController', () => {
  let controller: SubscriptionLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscriptionLogController],
      providers: [SubscriptionLogService],
    }).compile();

    controller = module.get<SubscriptionLogController>(SubscriptionLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
