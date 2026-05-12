const { Cuisine, Category } = require("../models/index")
const { Op } = require("sequelize")

class PubController {
    static async getPubCuisine(req, res, next) {
        try {
            const { filterName, sort, catId, page = 1, limit = 10 } = req.query
            
            let option = {
                include: Category,
                offset: limit * (page - 1),
                limit,
                where: {},
                attributes: {
                    exclude: ["AuthorId"]
                }
            }

            if(filterName) {
                option.where.name = {
                    [Op.iLike]: `%${filterName}%`
                }
            }

            if(catId) {
                option.where.CategoryId = catId
            }

            if(sort){
                let partSort = sort[0] === '-' ? 'DESC' : 'ASC'

                let sortBy = partSort === 'DESC' ? sort.slice(1) : sort

                option.order = [[sortBy, partSort]]
            }
            let {count, rows} = await Cuisine.findAndCountAll(option)

            let data = {
                page: +page,
                data: rows,
                totalData: count,
                totalPage: Math.ceil(count / limit),
                dataPerPage: +limit
            }
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async getPubCuisineId(req, res, next) {
        try {
            const { id } = req.params
            const cuisine = await Cuisine.findByPk(id, {
                include: [Category]
            })

            if (!cuisine) {
                throw { name: "NotFound", message: `Cuisine id ${id} Not Found` };
            }

            res.status(200).json(cuisine)
        } catch (error) {
            next(error)
        }
    }
        static async getCategories(req, res, next) {
        try {
            const categories = await Category.findAll()
            res.status(200).json(categories)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = PubController