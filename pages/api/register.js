import { sequelize } from "@/db/database";
import { Address } from "@/models/Address";
import { Sequelize } from "sequelize";

const handler = async(req, res) => {
  if(req.method === "POST") {
    console.log(process.env.PORT)
    console.log(process.env.DATABASE)
    console.log(process.env.USER)
    console.log(process.env.PASSWORD)
    console.log(process.env.HOST)


    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const addressValue = req.body.address;
    const longitude = req.body.longitude;
    const latitude = req.body.latitude;
    // const coordinates = req.body.coordinates;

    const regex = /^\S+@\S+\.\S+/
    const emailValid = regex.test(email)


    if(!firstName ||
        !lastName ||
        !emailValid ||
        !addressValue ||
        !longitude ||
        !latitude 
        // || !coordinates
      ) {
        res.status(422).json({
          message: "Invalid input"
        })
        return;
      }


    sequelize.sync()
    .then(() => {
      return res.status(201).json({
        message: "Database connection successful"
      })
      return Address.findAll({ where: { address: addressValue } }) })
      // .then(addresses => {
      //     const address = addresses[0]
      //     if(address) {
      //                 return res.status(422).json({
      //                     message: "Address already registered. Duplicate records are not allowed!"
      //                 })
      //             }
          // return Address.create({
          //     firstname: "Okay",
          //     // lastname: lastName,
          //     // email: email,
          //     // address: addressValue,
          //     // longitude: longitude,
          //     // latitude: latitude,
          //     // coordinates: coordinates
          // })
          // .then(result => {
          //     res.status(201).json({
          //                 message: "User created",
          //                 userId: result._id
          //             })
          // })
      // })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          message: 'oops! something went wrong. please try again'
        })
      })
  }
}

export default handler;
