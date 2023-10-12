import User from "@/models/User";
import sequelize from "@/db/database";

const handler = (req, res) => {
    if(req.method === "GET") {
        sequelize.sync()
        .then(() => {
            return User.findAll()
        })
        .then((users) => {
            console.log(users)
            return res.status(200).json({
                message: "users returned successfully",
                users: users
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
              message: 'oops! something went wrong. please try again'
            })
          }) 
    }
}

export default handler;