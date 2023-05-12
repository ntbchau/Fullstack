import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);
    router.get("/CRUD", homeController.getCRUD);
    router.post("/post-crud", homeController.postCRUD);
    router.get("/display-crud", homeController.displayCRUD);
    return app.use("/", router);
}

module.exports = initWebRoutes;
