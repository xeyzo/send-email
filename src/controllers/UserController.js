const models = require("../models")
const bcrypt = require("bcrypt")

const response = {
    message: "Your Message",
    status: "",
    data: [],
  };

class Controller {
    static async create(req, res) {
        try {
            const salt =  bcrypt.genSaltSync(10)
            const data =  await models.User.findOne({ where: { username: req.body.username } })
            if (data == null) {
                const hashPassword = bcrypt.hashSync(req.body.password, salt)
                const user = await models.User.create({
                    username: req.body.username,
                    password: hashPassword,
                    email: req.body.email,
                    fullname: req.body.fullname
                })
                response.message = "New User Created"
                response.status = "Success"
                response.data = {
                    username: user.dataValues.username
                }
                res.status(201).json(response)
            } else {
                throw new Error("Username has been taken")
            }
        } catch(error) {
            response.status = "Fail",
            response.message = error.message,
            response.data = null
            res.status(400).json(response)
        }
    }

    static async read(req, res) {
        try {
            const data = await models.User.findAll({ attributes: ["username", "email", "fullname"],
                include: [
                    { model: models.Photo}, { model: models.Comment } 
                ]
            });
            response.data = data
            response.message = "Data is successfully retrieved"
            response.status = "Success"
            response.user = req.user;
            res.status(200).json(response);
        } catch(error) {
            response.status = "Fail",
            response.message = error.message,
            res.status(400).json(response)
        }
    }

    static async find(req, res) {
        try {
            if (req.params.id != req.userId) {
                return res.status(401).json("You are not the user")
            }
            const data =  await models.User.findByPk(req.userId, {
                include: [ 
                    { model: models.Photo}, { model: models.Comment }
                ]
            })
            response.data = data;
            response.message = "Data successfully retrieved";
            response.status = "Success"
            
            res.json(response)
        } catch(error) {
            response.status = "Fail",
            response.message = error.message,
            res.status(400).json(response)
        }
    }

    static async update(req, res) {
        try {
            if (req.params.id != req.userId) {
                return res.status(401).json("You are not the user")
            }
            const data = await models.User.findByPk(req.userId)
            await models.User.update(req.body, {
                where: {
                    id: req.userId,
                },
            })
            response.data = {
                "New Data" : req.body,
                "Old Data" : {
                    username: data.dataValues.username,
                    email: data.dataValues.email,
                    fullname: data.dataValues.fullname,
                }
            }
            response.message = "Data is successfully updated";
            response.status = "Success"

            res.status(201).json(response);
        } catch(error) {
            response.status = "Fail",
            response.message = error.message,
            res.status(400).json(response)
        }
    }

    static async delete(req, res) {
        try {
            if (req.params.id != req.userId) {
                return res.status(401).json("You are not the user")
            }
            const data = await models.User.findByPk(req.userId)
            await models.Author.destroy({
                where: {
                    id: req.user.id,
                }   
            })
            response.data = null
            response.message = `${data.dataValues.username} is successfully deleted`
            response.status = "Success"
        
            res.status(201).json(response);
        } catch(error) {
            response.status = "Fail",
            response.message = error.message,
            res.status(400).json(response)
        }
    }
}

module.exports = Controller;