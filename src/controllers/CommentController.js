const { Comment, User, Photo } = require('../models')

const response = {
    message: "Your Message",
    status: "",
    data: [],
  };

class CommentController{
        static async saveComment(req, res) {
            req.body.contactId = req.userId
            try {
                const save = await Comment.create({...req.body});
                response.data = save;
                response.message = "Succes save data";
                res.status(201).json(response);
            } catch (error) {
                res.data = [];
                response.message = error.message;
                res.status(400).json(response);
            }
        }

          static async updateComment(req, res){
            const { id } = req.params;
            req.body.contactId = req.userId
            const getComment = await Comment.update({ ...req.body },
            {
                where: {
                    id: id
                }
            });
            try {
                if (getComment) {
                    response.message = "update data berhasil";
                    response.data = await Comment.findByPk(id);
                    res.status(200).json(response);
                }
            } catch (err) {
                response.data = [];
                response.message = err.message;
                res.status(400).json(response);
            }

        }
            static async deleteComment(req, res){
                const { id } = req.params;
                const delComment = await Comment.destroy({ 
                    where: {
                        id: id
                    }
                });

                try {
                    if (delComment) {
                    response.message = "Delete succes";
                    res.status(200).json(response);
                }
                } catch (err) {
                    response.status = "Data tidak ada";
                    response.message = err.message;
                    res.status(400).json(response);
            }
        }
            static async getComment(req, res){
            try {
                const allData = await Comment.findAll({
                    include: [
                        { model: Photo, as: 'photo' },
                        { model: User, as: 'user' },
                    ]
                });
                if (allData.length !== 0) {
                    response.data = allData;
                    response.message = "succes"
                    res.status(200).json(response);
                } else {
                    response.status = "failed!";
                    response.message = "Data not found!";
                    res.status(400).json(response);
                }
            } catch (err) {
                    response.status = "failed";
                    response.message = err.message;
                    res.status(400).json(response);
            }
          }

            static async getCommentId(req, res) {
                const { id } = req.params;
                const comment = await Comment.findOne({
                    where: { id: id },
                    include: [
                        { model: Photo, as: 'photo' },
                        { model: User, as: 'user' },
                    ]
                });
                try {
                    if (!comment) throw new Error("Comment not found");
                    response.data = comment;
                    response.status = "success";
                    res.json(response);
                } catch (error) {
                    response.message = error.message;
                    response.data = {};
                    response.status = "fail";
                    res.status(404).json(response);
                }
            } 

    }        
    module.exports = CommentController;



