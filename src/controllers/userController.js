import userService from '../services/userService'

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameters'
        })
    }

    let userData = await userService.handleUserLogin(email, password);

    return res.status(200).json({
        user: userData.user ? userData.user : {},
        errCode: userData.errCode,
        message: userData.errMessage,


    })
}

let handleGetAllUser = async (req, res) => {
    let id = req.body.id //all or id
    if (!id) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameters',
            users: []
        })
    }

    let users = await userService.getAllUsers(id)
    console.log(users)
    return res.status(200).json({
        errCode: '0',
        message: 'get all user api',
        users
    })


}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
}