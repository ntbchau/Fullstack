import bcrypt from 'bcrypt';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

let createUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
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
            resolve("ok succeed!")
        } catch (e) {
            reject(e);
        }
    })


}
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
let getAllUSer = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({ raw: true });
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })

}
let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true
            })
            if (user) {
                resolve(user)
            }
            else {
                resolve([])
            }
        } catch (e) {
            reject(e)
        }
    })
}
let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();

                let allUser = db.User.findAll();
                resolve(allUser);
            } else {
                resolve();
            }
        } catch (e) {
            console.log(e);
        }
    })
}
let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.destroy({
                where: { id: id },
                raw: true
            })

            resolve();

        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    createUser: createUser,
    hashUSerPassword: hashUSerPassword,
    getAllUSer: getAllUSer,
    getUserInfoById: getUserInfoById,
    updateUser: updateUser,
    deleteUser: deleteUser,
}