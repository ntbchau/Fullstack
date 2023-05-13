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
let putCRUD = async (req, res) => {
    let data = req.body;
    let allUser = await CRUDService.updateUser(data);
    //console.log(data)
    return res.render("displayCRUD.ejs", {
        dataTable: allUser
    })
}
module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    editCRUD: editCRUD,
    putCRUD: putCRUD,
} 