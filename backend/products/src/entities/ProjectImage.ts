import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Product } from "./Product";

@Entity()
@ObjectType()
export class ProductImages extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: "text", nullable: true })
  @Field(() => String)
  description: string;

  @Column({ type: "text", nullable: false })
  @Field(() => String)
  url: string;

  @ManyToOne(() => Product, (product) => product.images)
  product: Product;

  @Field(() => String)
  @CreateDateColumn()
  dateAdded: Date;

  @Field(() => String)
  @UpdateDateColumn()
  dateModified: Date;
}
