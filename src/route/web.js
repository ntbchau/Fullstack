import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);
    router.get("/CRUD", homeController.getCRUD);
    router.post("/post-crud", homeController.postCRUD);
    router.get("/display-crud", homeController.displayCRUD);
    router.get("/edit-crud", homeController.editCRUD);
    router.post("/put-crud", homeController.putCRUD);
    return app.use("/", router);
}

module.exports = initWebRoutes;
