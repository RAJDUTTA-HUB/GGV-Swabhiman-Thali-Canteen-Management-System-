const userModel = require('../Models/user.Model');

module.exports.createUser = async({
    name,email,password,department,enrollmentNo
}) => {
    if (!name || !email || !password || !department || !enrollmentNo) {
        throw new error('All fields are required');
    }

    const user = userModel.create({
        name,
        email,
        password,
        department,
        enrollmentNo
    })
    return user;
}