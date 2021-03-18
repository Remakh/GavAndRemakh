import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
@ObjectType()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: "text", nullable: false })
  @Field(() => String)
  name: string;

  @Column({ type: "text", nullable: false })
  @Field(() => String)
  description: string;

  @Column({ type: "decimal", nullable: false })
  price: number;

  @Field(() => String)
  @CreateDateColumn()
  dateAdded: Date;

  @Field(() => String)
  @UpdateDateColumn()
  dateModified: Date;
}
