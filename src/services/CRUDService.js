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
module.exports = {
    createUser: createUser,
    hashUSerPassword: hashUSerPassword,
}