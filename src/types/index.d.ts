import { Mongoose } from 'mongoose';

export * from './kakaoPlace';

declare global {
  namespace NodeJS {
    interface Global {
      mongoose: Mongoose;
    }
  }
}
