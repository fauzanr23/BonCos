const { Cuisine } = require("../models");

const authorization = async (req, res, next) => {
  try {
    //! apabila req.user.role === "Admin" maka next() else throw "Forbidden" -> if Cuisine not created by logged in staff
    if (req.user.role === "Admin") {
      next();
    } else {
      const { id } = req.params;
      const cuisine = await Cuisine.findByPk(id);
      if (!cuisine) throw { name: "NotFound", message: "Cuisine not found" };
      if (cuisine.AuthorId !== req.user.id) {
        throw { name: "Forbidden", message: `You're not authorized` };
      } else {
        next();
      }
    }
  } catch (error) {
    next(error);
  }
};

const guardAdmin = async (req, res, next) => {
  try {
    if (req.user.role === "Admin") {
      next();
    } else {
      throw { name: "Forbidden", message: `You're not authorized` };
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {authorization, guardAdmin};
