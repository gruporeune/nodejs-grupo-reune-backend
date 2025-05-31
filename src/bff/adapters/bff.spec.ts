import { Test, TestingModule } from '@nestjs/testing';
import { Bff } from './bff';

describe('Bff', () => {
  let provider: Bff;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Bff],
    }).compile();

    provider = module.get<Bff>(Bff);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
