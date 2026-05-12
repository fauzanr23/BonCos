const router = require("express").Router()
const authentication = require("../middlewares/authentication")
const { guardAdmin } = require("../middlewares/authorization")
const cuisineRoutes = require("./cuisines")
const userRoutes = require("./users")
const categoryRoutes = require("./categories")
const pubRoutes = require("./pubs")
const UserController = require("../controllers/userController")

router.use("/", userRoutes)
router.use("/pub", pubRoutes)

router.use(authentication)

router.post("/add-user", guardAdmin, UserController.register)

router.use("/cuisines", cuisineRoutes)

router.use("/categories", categoryRoutes)


module.exports = router