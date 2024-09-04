import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model
} from "sequelize";
import sequelize from "@/database/db";
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

StravaStat.init(
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
