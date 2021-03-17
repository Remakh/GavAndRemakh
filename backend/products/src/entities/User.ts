import { Field, Int, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: "text" })
  @Field(() => String)
  name: string;

  @Column({ type: "decimal" })
  price: number;

  @Field(() => String)
  @CreateDateColumn()
  dateAdded: Date;

  @Field(() => String)
  @UpdateDateColumn()
  dateModified: Date;
}
