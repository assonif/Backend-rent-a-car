import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it('should be able to create a new car', async () => {
    const car = {
      brand: 'Brand',
      category_id: 'category',
      daily_rate: 100,
      description: 'Description',
      fine_amount: 60,
      license_plate: 'LDK-1234',
      name: 'Name',
    };
    const createdCar = await createCarUseCase.execute(car);

    expect(createdCar).toHaveProperty('id');
  });

  it('should not be able to create a car with existant license plate', () => {
    expect(async () => {
      const car = {
        brand: 'Brand',
        category_id: 'category',
        daily_rate: 100,
        description: 'Description',
        fine_amount: 60,
        license_plate: 'LDK-1234',
        name: 'Name',
      };

      await createCarUseCase.execute(car);

      await createCarUseCase.execute(car);
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a car with available=true as default', async () => {
    const car = {
      brand: 'Brand',
      category_id: 'category',
      daily_rate: 100,
      description: 'Description',
      fine_amount: 60,
      license_plate: 'LDK-1234',
      name: 'Name',
    };

    const createdCar = await createCarUseCase.execute(car);

    expect(createdCar.available).toBe(true);
  });
});
