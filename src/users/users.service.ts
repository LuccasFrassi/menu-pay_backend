import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { UsersRegisterDto } from './dto/users.register.dto';
import { ResultDto } from 'src/dto/result.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<Users[]> {
    return this.usersRepository.find(); 
  }
  async register(data: UsersRegisterDto): Promise<ResultDto>{
    let users = new Users()
    users.email = data.email
    users.nome = data.nome
    users.password = bcrypt.hashSync(data.senha, 8)
    users.telefone = data.telefone
    return this.usersRepository.save(users)
    .then((result) => {
      return <ResultDto>{
        status: true,
        message: "Usuário cadastrado com sucesso"
      }
    })
    .catch((error) => {
      return <ResultDto>{
        status: false,
        message: "Houve um errro ao cadastrar o usuário"
      }
    })    
  }
  async findOne(email: string): Promise<Users | undefined> {
    return this.usersRepository.findOne({ where: { email: email } });
  }
}