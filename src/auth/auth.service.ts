import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    
    async validateUsers(email: string, senha: string): Promise<any> {

        const users = await this.usersService.findOne(email);
        if (users && bcrypt.compareSync(senha, users.password)) {
          const { password, ...result } = users;
          return result;
        }
        return null;
      }



}
