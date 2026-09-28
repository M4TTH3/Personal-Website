import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    Sequelize
} from "sequelize";
import { Stats } from "@/types/stats";

class StravaStat extends Model<
    InferAttributes<StravaStat>,
    InferCreationAttributes<StravaStat>
> {
    declare id: number;
    declare stats: Stats;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

export const initStravaStat = (sequelize: Sequelize) => StravaStat.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        stats: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    },
    {
        sequelize,
        modelName: "StravaStat",
        schema: "public",
        timestamps: true,
    }
);

export default StravaStat;
