const { cache } = require("ejs");

import db from '../models/index';
import CRUDService from '../services/CRUDService';


let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homePage.ejs', { data: JSON.stringify(data) })
    } catch (e) {
        console.log(e)
    }

}
let getCRUD = (req, res) => {
    return res.render('crud.ejs')
}
let postCRUD = async (req, res) => {
    let message = await CRUDService.createUser(req.body);
    console.log(message);
    return res.send("post crud");
}
let displayCRUD = async (req, res) => {
    let data = await CRUDService.getAllUSer();
    console.log(data);
    return res.render("displayCRUD.ejs", {
        dataTable: data
    })
}

let editCRUD = async (req, res) => {
    let userId = req.query.id;

    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        console.log(userData)
        return res.render("editCRUD.ejs", { user: userData });

    }
    else {
        return res.send("Users are not found!")
    }


}
let updateCRUD = async (req, res) => {
    let data = req.body;
    let allUser = await CRUDService.updateUser(data);
    //console.log(data)
    return res.render("displayCRUD.ejs", {
        dataTable: allUser
    })
}
let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    console.log(id);
    await CRUDService.deleteUser(id);
    return res.send("delete controller")
}


module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    editCRUD: editCRUD,
    updateCRUD: updateCRUD,
    deleteCRUD: deleteCRUD,
} 