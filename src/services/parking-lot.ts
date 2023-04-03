import dbConnect from '~/lib/dbConnect';
import { Alright } from '~/models/alright';

export async function getParkingLot(hashCode: string) {
  await dbConnect();
  const alright = await Alright.findOne({ hashCode }).exec();
  return alright;
}
