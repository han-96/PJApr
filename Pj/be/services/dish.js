const db = require('../repositories/index');
const dishFunction = require('../repositories/dishFunction');
const Dish = require('../models/Dish')

const createDish = async (name, description) => {
    if (!name) {
        throw new Error("Tên món ăn không hợp lệ")
    }
    const tmp = {
        name: name,
        description: description,
        created: new Date()
    }
    const results = await dishFunction.addDish(tmp);
    const raw = results.ops[0]
    const added = new Dish(raw._id, raw.name, raw.description)
    added.created = raw.created
    return added
}

const getFour = async (skip) => {
    const results = await dishFunction.getFour(skip)
    return results
}
const getDishById = async (id) => {
    const result = await dishFunction.getDishById(id);
    


    console.log(result)
    if (result === null || result === []) {
        throw new Error("loi khong xac dinh")
    } else {
        return result
    }
}
module.exports = {
    createDish,
    getFour,
    getDishById
}