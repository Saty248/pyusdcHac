import sequelize from "@/db/database";
import User from "@/models/User";

const handler = (req, res) => {
    if(req.method === "PUT") {
        const updatedName = req.body.name;
        const updatedEmail = req.body.email;
        const updatedPhoneNumber = req.body.phoneNumber;
        const id = req.body.id;

        User.findByPk(id)
        .then(user => {
            user.name = updatedName;
            user.email = updatedEmail;
            user.phoneNumber = updatedPhoneNumber;
            return user.save();
        })
        .then((result) => {
            console.log(result);
            res.status(201).json({
                message: "profile updated successfully"
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export default handler;