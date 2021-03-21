import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ProductImages } from "./ProjectImage";

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

  @OneToMany(() => ProductImages, (image) => image.product)
  images: ProductImages;

  @Field(() => String)
  @CreateDateColumn()
  dateAdded: Date;

  @Field(() => String)
  @UpdateDateColumn()
  dateModified: Date;
}
