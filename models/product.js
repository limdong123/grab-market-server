module.exports = function (sequelize, DataTypes) {
    const product = sequelize.define("Product", {
        name: {
            type: DataTypes.STRING(20), //문자형이고 20제한
            allowNull: false,   //필수인가 아닌가 -> 필수
        },
        price: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
        },
        seller: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(300),
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.STRING(300),
            allowNull: true,
        }
    })
    return product
}