import { Test, TestingModule } from '@nestjs/testing';
import { LogServiceController } from './log-service.controller';
import { LogServiceService } from './log-service.service';

describe('LogServiceController', () => {
  let controller: LogServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogServiceController],
      providers: [LogServiceService],
    }).compile();

    controller = module.get<LogServiceController>(LogServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
