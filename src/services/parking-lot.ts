import crypto from 'crypto';

import dbConnect from '~/lib/dbConnect';
import { Alright, ParkingLotInfo } from '~/models/alright';

export async function getParkingLot(hashCode: string) {
  await dbConnect();
  const alright = await Alright.findOne({ hashCode }).exec();
  return alright;
}

export async function createParkingLot({
  company,
  selectedCarParkList,
}: {
  company: ParkingLotInfo;
  selectedCarParkList: ParkingLotInfo[];
}) {
  await dbConnect();

  const createdDate = new Date();

  const hashCode = crypto
    .createHash('md5')
    .update(company.address_name + createdDate.toString())
    .digest('hex')
    .substring(0, 8);

  await Alright.create({
    createdDate,
    hashCode,
    company,
    parkingLots: selectedCarParkList,
  });

  return hashCode;
}
