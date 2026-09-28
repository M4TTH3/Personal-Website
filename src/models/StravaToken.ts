import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

class StravaToken extends Model<
    InferAttributes<StravaToken>,
    InferCreationAttributes<StravaToken>
> {
    declare id: number;
    declare clientId: number;
    declare clientSecret: string;
    declare accessToken: string;
    declare refreshToken: string;
    declare expiresAt: number;
}

export const initStravaToken = (sequelize: Sequelize) => StravaToken.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    clientId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    clientSecret: {
        type: DataTypes.STRING,
        allowNull: false
    },
    accessToken: {
        type: DataTypes.STRING,
        allowNull: false
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expiresAt: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "StravaToken",
    schema: "public",
    timestamps: false
});

export default StravaToken;