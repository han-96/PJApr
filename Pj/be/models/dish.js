class Dish{
    _id;
    name;
    author;
    description;
    tags;
    ingredients;
    created;
    images;

    constructor(id,name,description){
        this._id=id
        this.name = name;
        this.description = description;
    }
    setInfo(name,value){
        this[name] = value
    }

}
module.exports = Dish;