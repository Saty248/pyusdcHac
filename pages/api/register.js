// const sequelize = require("../../db/database")
// const Address = require("../../models/Address");
// import { Sequelize } from "sequelize";
const { Sequelize } = require('sequelize');
import { DataTypes } from "sequelize";


const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, 
    {dialect: "mysql", host: process.env.HOST, 
    port: process.env.PORT});


// const sequelize = require("../db/database")


const Address = sequelize.define("Location", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstname: {
                type: DataTypes.STRING,
                allowNull: false
            },
    lastname: {
                type: DataTypes.STRING,
                allowNull: false
            },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    longitude: {
        type: DataTypes.STRING,
        allowNull: false
    },
    latitude: {
        type: DataTypes.STRING,
        allowNull: false
    },
    coordinates: {
        type: DataTypes.JSON,
        defaultValue: [],
        allowNull: false
    }
});

const handler = (req, res) => {
  console.log(req.method)

  return res.status(201).json({
    payload: {
                firstname: firstName,
                lastname: lastName,
                email: email,
                address: addressValue,
                longitude: longitude,
                latitude: latitude,
                coordinates: coordinates
    }
  })

  // if(req.method === "POST") {
  //   console.log(process.env.PORT)
  //   console.log(process.env.DATABASE)
  //   console.log(process.env.USER)
  //   console.log(process.env.PASSWORD)
  //   console.log(process.env.HOST)


  //   const firstName = req.body.firstName;
  //   const lastName = req.body.lastName;
  //   const email = req.body.email;
  //   const addressValue = req.body.address;
  //   const longitude = req.body.longitude;
  //   const latitude = req.body.latitude;
  //   const coordinates = req.body.coordinates;

  //   const regex = /^\S+@\S+\.\S+/
  //   const emailValid = regex.test(email)


  //   if(!firstName ||
  //       !lastName ||
  //       !emailValid ||
  //       !addressValue ||
  //       !longitude ||
  //       !latitude 
  //       || !coordinates
  //     ) {
  //       res.status(422).json({
  //         message: "Invalid input"
  //       })
  //       return;
  //     }

   

    // sequelize.sync()
    // .then(() => {
    //   return Address.findAll({ where: { address: addressValue } }) })
    //   .then(addresses => {
    //       const address = addresses[0]
    //       if(address) {
    //                   return res.status(422).json({
    //                       message: "Address already registered. Duplicate records are not allowed!"
    //                   })
    //               }
    //       return Address.create({
    //           firstname: "Okay",
    //           lastname: lastName,
    //           email: email,
    //           address: addressValue,
    //           longitude: longitude,
    //           latitude: latitude,
    //           coordinates: coordinates
    //       })
    //       .then(result => {
    //           res.status(201).json({
    //                       message: "User created",
    //                       userId: result._id
    //                   })
    //       })
    //   })
    //   .catch(err => {
    //     console.log(err)
    //     res.status(500).json({
    //       message: 'oops! something went wrong. please try again'
    //     })
    //   })
  // }
}

export default handler;
