import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentNotificationService } from './appointment-notification.service';

describe('AppointmentNotificationService', () => {
  let service: AppointmentNotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointmentNotificationService],
    }).compile();

    service = module.get<AppointmentNotificationService>(AppointmentNotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
