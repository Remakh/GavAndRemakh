import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Session {
  @PrimaryColumn({ type: "text" })
  sid: string;

  @Column({ type: "json" })
  sess: string;

  @Column({ type: "timestamp" })
  expire: string;
}
