import { AppError } from '@errors/AppError';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('Should be able to authenticate a user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '03042020',
      email: 'test@test.com',
      password: 'erererer',
      name: 'Test name',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('Should not be able to authenticate a nonexistent user ', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'user.email@test.com',
        password: 'user.password',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate a user with incorrect password', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '03042020',
        email: 'test@test.com',
        password: 'erererer',
        name: 'Test name',
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'wrongpassword',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
