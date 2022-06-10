import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class CreateUserUseCase {
  private userRepository: IUsersRepository;
  constructor(
    @inject('UsersRepository')
    userRepository: IUsersRepository,
  ) {
    this.userRepository = userRepository;
  }

  async execute({
    driver_license,
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error('Email is already in use');
    }

    const passwordHash = await hash(password, 8);

    await this.userRepository.create({
      driver_license,
      email,
      name,
      password: passwordHash,
    });
  }
}

export { CreateUserUseCase };
