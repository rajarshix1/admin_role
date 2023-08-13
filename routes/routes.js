const { newAdmin, login, createUser, editUser, deleteUser, check, showAllUser } = require("../controllers/adminController")
const { checkUser, loginUser } = require("../controllers/userController")

const routes = (app) => {
    
    
    app.route('/user/check')
    .get(checkUser)
    app.route('/user/login')
    .post(loginUser)

    app.route('/admin/check')
    .get(check)

    app.route('/admin/all_users')
    .get(showAllUser)
    app.route('/admin/super')
    .post(newAdmin)

    app.route('/admin/login')
    .post(login)

    app.route('/admin/create_admin')
    .post(newAdmin)

    app.route('/admin/create_user')
    .post(createUser)
    app.route('/admin/edit_user')
    .put(editUser)
    app.route('/admin/delete_user')
    .delete(deleteUser)


    
}
module.exports = routes
