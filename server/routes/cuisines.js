const CuisineController = require("../controllers/cuisineController")
const {authorization} = require("../middlewares/authorization")
const router = require("express").Router() 
const multer = require("multer")

//! 1. Set multer
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", CuisineController.getCuisines)
router.post("/", CuisineController.postCuisines)
router.get("/:id", CuisineController.getCuisinesId)
router.put("/:id", authorization, CuisineController.putCuisines)
router.delete("/:id", authorization, CuisineController.deleteCuisines)
router.patch(
    "/:id/imgUrl", 
    authorization, 
    upload.single("imgUrl"), 
    CuisineController.patchCuisineImage
)

module.exports = router