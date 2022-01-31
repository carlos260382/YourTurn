const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define(
        'user',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
            },

            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            dni: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },

            password: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },

            publickey: {
                type: DataTypes.STRING,
            },

            centroName:{
                type: DataTypes.STRING,
                allowNull: true,
            },

            rol: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },

            active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },

            createInDb: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
        },
        {
            freezeTableName: true,
            timestamps: false,
            createdAt: false,
        }
    );
};