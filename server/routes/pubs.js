const PubController = require("../controllers/pubController")
const router = require("express").Router() 

//public
router.get("/cuisines", PubController.getPubCuisine)
router.get("/categories", PubController.getCategories)
router.get("/cuisines/:id", PubController.getPubCuisineId)


module.exports = router