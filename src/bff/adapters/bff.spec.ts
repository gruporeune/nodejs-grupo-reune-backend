import { Test, TestingModule } from '@nestjs/testing';
import { BffAdapter } from './bff';


describe('Bff', () => {
  let provider: BffAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BffAdapter],
    }).compile();

    provider = module.get<BffAdapter>(BffAdapter);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
