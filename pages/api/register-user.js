import User from "@/models/User";
const sequelize = require("../../db/database");


const handler = (req, res) => {
    if(req.method === "POST") {
        const name = req.body.name;
        const email = req.body.email;
        const phoneNumber = req.body.phoneNumber;
        const category = req.body.category;
        const newsletter = req.body.newsLetter;
        const wallet = req.body.wallet;

        const regex = /^\S+@\S+\.\S+$/;
        const emailIsValid = regex.test(email);

        if(!name || !emailIsValid || !phoneNumber || !category || !wallet) {
            return res.status(422).json({
                message: "invalid values. please fill all fields correctly"
            })
        }

        console.log(name, email, phoneNumber, newsletter, category, wallet);
        sequelize.sync()
        .then(() => User.findAll({ where: { email: email } }))
        .then(users => {
            console.log(users);
            const user = users[0]
            if(user) {
                        return res.status(422).json({
                            message: "user already exist. duplicate records are not allowed!"
                        })
                    }
                return User.create({
                    name: name,
                    email: email,
                    phoneNumber: phoneNumber,
                    category: category,
                    newsletter: newsletter,
                    wallet: wallet
                })
                .then(result => {
                    res.status(201).json({
                                message: "User created",
                                userId: result.id
                            })
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