import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm'; 

@Injectable()
export class UserSeederService {
  private readonly logger = new Logger(UserSeederService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async seed() {
    const existingUser = await this.userRepository.findOne({
      where:{email: 'lilan.maduranga@gmail.com'}
    });

    if (!existingUser) {
      const newUser = this.userRepository.create({
        firstName: 'Madhuranga',
        lastName: 'Senadheera',
        email: 'lilan.maduranga@gmail.com',
        password: '$2b$10$jO9LmjSaII7q2Qn2YUC3f.ibuwiNr2FKTAvQo0qe52VjK3UFeh2Xu', // Hashed password
        isActive: true,
      });

      await this.userRepository.save(newUser);
      this.logger.log('User seeded successfully');
    } else {
      this.logger.warn('User already exists, skipping seeding');
    }
  }
}
