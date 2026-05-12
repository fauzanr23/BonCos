const { User, Cuisine, Category } = require("../models/index")
const cloudinary = require("../helpers/cloudinary")

class CuisineController {
    static async postCuisines(req, res, next) {
        try {
            const authId = req.user.id
            const {
                name,
                description,
                price,
                imgUrl,
                CategoryId,
            } = req.body
            const cuisine = await Cuisine.create({
                name,
                description,
                price,
                imgUrl,
                CategoryId,
                AuthorId: authId
            })
            res.status(201).json(cuisine)
        } catch (error) {
            next(error)
        }
    }
    static async getCuisines(req, res, next) {
        try {
            const cuisines = await Cuisine.findAll({
                include: [{
                    model: User,
                    attributes: {
                        exclude: ['password']
                    }
                },
                {
                    model: Category,
                    attributes: ['name'],
                    required: true
                }]
            })
            res.status(200).json(cuisines)
        } catch (error) {
            next(error)
        }
    }
    static async getCuisinesId(req, res, next) {
        try {
            const { id } = req.params
            const cuisine = await Cuisine.findByPk(id, {
                include: [Category]
            })

            if (!cuisine) {
                throw { name: "NotFound", message: "Cuisine Not Found" };
            }

            res.status(200).json(cuisine)
        } catch (error) {
            next(error)
        }
    }
    static async putCuisines(req, res, next) {
        try {
            const { id } = req.params
            const {
                name,
                description,
                price,
                imgUrl,
                CategoryId
            } = req.body
            const cuisine = await Cuisine.findByPk(id)

            if (!cuisine) {
                throw { name: "NotFound", message: "Cuisine Not Found" };
            }

            await cuisine.update({
                name,
                description,
                price,
                imgUrl,
                CategoryId,
            })
            res.status(200).json(cuisine)
        } catch (error) {
            next(error)
        }
    }
    static async deleteCuisines(req, res, next) {
        try {
            const { id } = req.params
            const cuisine = await Cuisine.findByPk(id)

            if (!cuisine) {
                throw { name: "NotFound", message: "Cuisine Not Found" };
            }

            await cuisine.destroy()
            res.status(200).json({ message: `${cuisine.name} success to delete` })
        } catch (error) {
            next(error)
        }
    }
    static async patchCuisineImage(req, res, next) {
        try {
            const { id } = req.params

            const cuisine = await Cuisine.findByPk(id);

            if (!cuisine) {
                throw { name: "NotFound", message: `Cuisine id ${id} not found` };
            }

            if (!req.file) {
                throw { name: "BadRequest", message: "Cover Image is required" };
            }

            const base64Img = req.file.buffer.toString("base64");
            
            const base64DataUrl = `data:${req.file.mimetype};base64,${base64Img}`;
            
            const result = await cloudinary.uploader.upload(base64DataUrl);
            
            await cuisine.update({ imgUrl: result.secure_url });

            res.status(200).json({
                message: `Image ${cuisine.name} succes to update`,
            });
        } catch (error) {
            next(error)
        }
    }

}

module.exports = CuisineController