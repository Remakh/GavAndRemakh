import { Request } from "express";
import { SessionData } from "express-session";
import { Session } from "inspector";

export type ContextType = {
  req: Request & {
    session: Session &
      Partial<SessionData> & {
        userId?: number;
        test?: number;
      };
  };
  res: Response;
};
