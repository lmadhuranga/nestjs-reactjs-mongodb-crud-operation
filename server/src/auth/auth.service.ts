import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}
  // Todo:: need integrate bcrypt and encode the data
  async signIn(email, password) {
    // const hash = await bcrypt.hash(password, 10);
    // console.log(`hash`,hash);
    const user = await this.usersService.findByEmail(email);
    const isMatch = await bcrypt.compare(password, user?.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email,  };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async verify(token) {
    const publicKey = fs.readFileSync(path.join(__dirname, '../../../keys/public-key.pem'), 'utf8');
    const payload = await this.jwtService.verifyAsync(token, {
      publicKey: publicKey,
      algorithms: ['RS256'],
    });
    return payload;
  }
}