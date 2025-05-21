import {
  createCallerFactory,
  createTRPCContext,
  createTRPCRouter,
} from "./trpc";
import { userRouter } from "./routers/user";
import { calendarsRouter } from "./routers/calendars";

export const appRouter = createTRPCRouter({
  user: userRouter,
  calendars: calendarsRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
export const createContext = createTRPCContext;
