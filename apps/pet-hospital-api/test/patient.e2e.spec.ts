import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { Patient, PatientsDbService } from '@pet-hospital/db';
import { createMock } from '@golevelup/ts-jest';

describe('App -> Patient', () => {
  let app: INestApplication;
  let patientsDbService: PatientsDbService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PatientsDbService)
      .useValue(createMock<PatientsDbService>())
      .compile();

    app = moduleRef.createNestApplication();
    patientsDbService = moduleRef.get(PatientsDbService);
    await app.init();
  });

  it(`/GET Patients`, async () => {
    jest
      .spyOn(patientsDbService, 'findAll')
      .mockImplementation(() =>
        Promise.resolve([{ name: 'test me!' } as Patient])
      );
    return request(app.getHttpServer())
      .get('/patients')
      .expect(200)
      .expect(await patientsDbService.findAll());
  });

  afterAll(async () => {
    await app.close();
  });
});
