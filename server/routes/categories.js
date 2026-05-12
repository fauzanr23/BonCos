const CatController = require("../controllers/catController")
const router = require("express").Router() 

router.post("/", CatController.postCategory)
router.get("/", CatController.getCategories)
router.put("/:id" ,CatController.putCategory)

module.exports = router