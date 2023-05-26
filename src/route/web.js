import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController"
let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);
    router.get("/CRUD", homeController.getCRUD);
    router.post("/post-crud", homeController.postCRUD);
    router.get("/display-crud", homeController.displayCRUD);
    router.get("/edit-crud", homeController.editCRUD);
    router.post("/update-crud", homeController.updateCRUD);
    router.get("/delete-crud", homeController.deleteCRUD);

    router.post('/api/login', userController.handleLogin)
    return app.use("/", router);
}

module.exports = initWebRoutes;
