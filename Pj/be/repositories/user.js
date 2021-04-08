const User = require("../models/User");
const db = require("./index")

exports.findUserByUsername = async (username) => {
    const rawUser = await db.users.findOne({username: username});
    if (!rawUser) {
        return null
    }
    
    const user = new User(rawUser.username, rawUser.displayName, rawUser.photoUrl);

    user.password = rawUser.password;
    user.salt = rawUser.salt
    return user;
}

exports.createUser = async (user) => {
    const dbResult = await db.users.insertOne ({
        username: user.username,
        password: user.password,
        salt: user.salt,
        displayName: user.displayName,
        photoUrl: user.photoUrl,
    });
    const insertedRawUser = dbResult.ops[0];
    const savedUser = new User(insertedRawUser.username, insertedRawUser.displayName, insertedRawUser.photoUrl);

    return savedUser
}

exports.updateUser = async (user) => {
    const dbResult = await db.users.findOneAndUpdate({username: user.username}, {
        $set: {
            photoUrl: user.photoUrl,
            displayName: user.displayName,
        }
    }, {
        returnOriginal: false,

    });
    return new User(dbResult.value.username, 
        dbResult.value.displayName,
        dbResult.value.photoUrl)
}

exports.changePassword = async (user) => {
    const dbResult = await db.users.findOneAndUpdate({username: user.username}, {
        $set: {
            password: user.password,
            salt: user.salt,
        }
    }, {
        returnOriginal: false,

    });
}
