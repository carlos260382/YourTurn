const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define(
        'turn',
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },

            centro: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            dia: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            horario: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            createdInDb: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
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
