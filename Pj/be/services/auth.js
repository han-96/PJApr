const UserRepo = require("../repositories/user")
const User = require("../models/User")

module.exports.signIn = async (username, password) => {
    const user = await UserRepo.findUserByUsername(username);
    if (!user) {
        throw new Error ("Username not existed")
    }

    if (!user.verifyPassword(password)) {
        throw new Error ("Incorrected password")
    }

    const jwt = user.generateToken();
    return {jwt, user}
}

module.exports.signUp = async (username, password) => {
    const user = await UserRepo.findUserByUsername(username);
    if (user) {
        throw new Error ("Username existed")
    }
    const newUser = new User(username);
    newUser.generatePassword(password)
    const savedUser = await UserRepo.createUser(newUser)

    return savedUser;
}

module.exports.updateProfile = async (user, {displayName, photoUrl }) => {
    user.displayName = displayName;
    user.photoUrl = photoUrl;
    return UserRepo.updateUser(user)
}

module.exports.changePassword = async (user, {currentPassword, newPassword} ) => {
    if (!user.verifyPassword(currentPassword)) {
        throw new Error ("Password is not correct")
    }
    user.generatePassword(newPassword);
    await UserRepo.changePassword(user);
    return user;
}
