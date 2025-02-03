import { Test, TestingModule } from '@nestjs/testing';
import { AndroidService } from './android.service';

describe('AndroidService', () => {
  let service: AndroidService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AndroidService],
    }).compile();

    service = module.get<AndroidService>(AndroidService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
