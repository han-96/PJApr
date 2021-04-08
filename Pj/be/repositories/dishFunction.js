const db = require("./index")
const dish = require("../models/dish");
const {
    ObjectId
} = require('bson')

const dishFunction = {}
dishFunction.addDish = async (dish) => {
    const results = await db.dishes.insertOne(dish)
    return results
}

dishFunction.getDishById = async (id) => {
    // const result = await db.dishes.findOne({
    //     _id: ObjectId(id)
    // })
//co van de, can xem lai
    const result = await db.dishes.aggregate([{
        $lookup: {
            from: 'users',
            localField: 'author',
            foreignField: '_id',
            as: 'author'
        }
    }, {
        $unwind: {
            path: "$author"
        }
    },{
        $project:{
            "author.hash":0,
            "author.salt":0,
            "author.0token":0
        }
    }]).toArray()
    return result[0];
}

dishFunction.getFour = async (skip) => {
    const result = await db.dishes.aggregate([{
        $sort: {
            created: -1
        }
    }, {
        $skip: skip
    }, {
        $limit: 4
    }]).toArray()
    return result
}

module.exports = dishFunction