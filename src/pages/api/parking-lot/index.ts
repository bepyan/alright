import type { NextApiRequest, NextApiResponse } from 'next'
import { Schema, model, connect } from 'mongoose';
import { Alright } from './scheme/parking-lot'
import crypto from 'crypto';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>) {

  switch (req.method) {
    case 'GET':
      const hashCode = req.query.hashCode as string;
      getParkingLot(hashCode).then(function (foundAlright) {
        res.status(200).json({
          message: "Search Complete!",
          data: foundAlright
        })
      })

      break;
    case 'POST':
      createParkingLot(req.body).then(function (hashCode) {
        res.status(200).json({
          message: "Save Complete!",
          hashCode: hashCode
        })
      })
      break;
  }
}

async function getParkingLot(hashCode: string) {
  const uri = "mongodb+srv://gjwodud119:young8291@cluster0.w9a9rkz.mongodb.net/?retryWrites=true&w=majority";
  await connect(uri)
  var foundAlright
  await Alright.findOne({
    hashCode: hashCode
  }).exec().then(alright => {
    foundAlright = alright
  })

  return foundAlright
}

async function createParkingLot(body: any) {
  const uri = "mongodb+srv://gjwodud119:young8291@cluster0.w9a9rkz.mongodb.net/?retryWrites=true&w=majority";
  await connect(uri)

  const companyAddress = body.company.address_name
  const currentDate = new Date()
  const hashCode = crypto.createHash('md5').update(companyAddress + currentDate.toString()).digest('hex').substring(0, 8)
  await Alright.create({
    address: companyAddress,
    createdDate: currentDate,
    hashCode,
    parkingLots: body.selectedCarParkList
  })

  return hashCode
}
