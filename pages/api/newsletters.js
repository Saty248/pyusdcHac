import sequelize from "@/db/database";
import Newsletter from "@/models/Newsletters";

const handler = (req, res) => {
    const currentDate = new Date();

    // console.log(currentDate);

    const year = currentDate.getFullYear()

    const month = currentDate.toLocaleString('default', { month: 'short' });

    const day = currentDate.getDate();

    if(req.method === "POST") {
        const { title, text, link } = req.body;
        const date = `${day} ${month} ${year}`;
        

        if(!title || !text || !link) {
            return res.status(422).json({
                message: "kindly complete all fields"
            })
        }

        sequelize.sync()
        .then(() => {
            return Newsletter.create({
                title,
                text,
                link,
                date: date
            })
        })
        .then(result => {
            return res.status(201).json({
                    message: "Newsletter created",
                    letterId: result.id
                })
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({
              message: 'oops! something went wrong. please try again'
            })
        })
    }

    if(req.method === "GET") {
        sequelize.sync()
        .then(() => {
            return Newsletter.findAll()
        })
        .then(newsletters => {
            return res.status(200).json({
                newsletters: newsletters
            })
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({
                message: 'oops! something went wrong. please try again'
            })
        })
    }
}

export default handler;