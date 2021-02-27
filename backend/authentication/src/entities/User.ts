
import { Field, Int, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
@ObjectType()
export class User {

  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'text'})
  @Field(() => String)
  userName: string;

  @Column({type: 'text'})
  password: string;

  @Column({type: 'text'})
  @Field(() => String)
  email: string;


}
