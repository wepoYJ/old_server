import { Test, TestingModule } from '@nestjs/testing';
import { UsrController } from './usr.controller';

describe('UsrController', () => {
  let controller: UsrController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsrController],
    }).compile();

    controller = module.get<UsrController>(UsrController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
