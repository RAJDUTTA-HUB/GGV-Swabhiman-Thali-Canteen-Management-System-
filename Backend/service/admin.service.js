const adminModel = require('../Models/admin.Model')
module.exports.createAdmin = async({
    name,department,email,password
}) => {
    if (!name || !email || !password || !department ) {
        throw new error("All fields are required!")
    }
    const admin = await adminModel.create({
         name,department,email,password
    })
    return admin;
}