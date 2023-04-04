import { Mongoose } from 'mongoose';

export * from './kakaoPlace';
export * from './publicPlace';

declare global {
  namespace NodeJS {
    interface Global {
      mongoose: Mongoose;
    }
  }
}
