const { newAdmin, login, createUser, editUser, deleteUser, check } = require("../controllers/adminController")

const routes = (app) => {
    
    
    app.route('/admin/check')
    .get(check)
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
