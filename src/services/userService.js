import db from '../models/index';
import bcrypt from 'bcrypt';

const salt = bcrypt.genSaltSync(10);

let hashUSerPassword = async (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await (bcrypt.hashSync(password, salt));
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

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
let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is used. Try other email!'
                })
            } else {


                let hashPasswordFromBcrypt = await hashUSerPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender === '1' ? true : false,

                    roleId: data.roleId,


                })
                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })
            }
        } catch (e) {
            reject(e)
        }
    })

}
let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {

                    id: userId

                }
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: 'User is not exist'
                })
            }
            await user.destroy()// cach nay phai xoa 
            // "query":{
            //     "raw":true
            // }, o tronng config.json


            // await db.User.destroy({
            //     where: { id: userId }
            // })
            resolve({
                errCode: 0,
                errMessage: 'User is deleted'
            })
        } catch (e) {
            reject(e)
        }
    })
}
let editUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 1,
                    message: 'Missing inputs parameters',
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName,
                    user.lastName = data.lastName,
                    user.address = data.address
                await user.save();


                resolve({
                    errCode: 0,
                    errMessage: 'User is edited'
                });
            } else {
                resolve({
                    errCode: 2,
                    errMessage: 'User is not exist'
                });
            }
        } catch (e) {
            reject(e)
        }

    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    checkUserEmail: checkUserEmail,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    editUser: editUser,
}
