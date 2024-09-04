import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize";
import sequelize from "@/database/db";
import { Stats } from "@/types/stats";

class Email extends Model<
    InferAttributes<Email>,
    InferCreationAttributes<Email>
> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare email: string;
    declare message: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Email.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(320),
            allowNull: false,
        },
        message: { 
            type: DataTypes.STRING(500),
            allowNull: false
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        modelName: "Email",
        schema: "public",
        timestamps: true,
    }
);

sequelize.sync();

export default Email;
