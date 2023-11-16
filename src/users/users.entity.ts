import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users'})
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({length: 15})
  telefone: string;


}