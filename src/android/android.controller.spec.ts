import { Test, TestingModule } from '@nestjs/testing';
import { AndroidController } from './android.controller';
import { AndroidService } from './android.service';

describe('AndroidController', () => {
  let controller: AndroidController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AndroidController],
      providers: [AndroidService],
    }).compile();

    controller = module.get<AndroidController>(AndroidController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
