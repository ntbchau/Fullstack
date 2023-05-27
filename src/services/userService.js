import db from '../models/index';
import bcrypt from 'bcrypt';

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                //user exist
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: { email: email },
                    raw: true

                });
                // console.log("password new", password)
                // console.log('pass hash', user.password)
                if (user) {
                    //compare password
                    //compare hash password

                    let check = await bcrypt.compareSync(password, user.password);
                    //let check = true;
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = `ok`;
                        delete user.password
                        userData.user = user
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = `Wrong password`
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found`
                } //console.log(user)
            } else {
                //return error
                userData.errCode = 1;
                userData.errMessage = `Your email is not exits. Try again with others`;
            }

            resolve(userData)
        } catch (e) {
            reject(e)
        }

    })

}
let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    email: userEmail
                }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}
let compareUserPassword = () => {
    return new Promise((resolve, reject) => {

    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = 'abc';
            if (userId === 'All') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (users && userId !== 'All') {
                users = await db.User.findOne({
                    where: {

                        id: userId

                    },
                    attributes: {
                        exclude: ['password']
                    }

                })

            } resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    checkUserEmail: checkUserEmail,
    getAllUsers: getAllUsers,
}