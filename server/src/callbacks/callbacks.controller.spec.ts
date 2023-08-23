import { Test, TestingModule } from '@nestjs/testing';
import { CallbacksController } from './callbacks.controller';
import { CallbacksService } from './callbacks.service';

describe('CallbacksController', () => {
  let controller: CallbacksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CallbacksController],
      providers: [CallbacksService],
    }).compile();

    controller = module.get<CallbacksController>(CallbacksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
