import { sequelize } from "../Utils/database";
import { UsersInterface } from "../Interfaces/UsersInterface";
import { DataTypes, DATE, Model, STRING} from "sequelize";


class Users extends Model<UsersInterface> implements UsersInterface{
    public id!: number;
    public name!: string;
    public email!: string;
    public start_date!: Date;
    public description!: string;
    public phone!: string;
    public status!: string;
    public department!: string;
    public password!: string;
}
Users.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: STRING,
        allowNull: false,
    },
    email: {
        type: STRING,
        allowNull: false,
    },
    start_date: {
        type: DATE,
        allowNull: false,
    },
    description: {
        type: STRING,
        allowNull: false,
    },
    phone: {
        type: STRING,
        allowNull: false,
    },
    status: {
        type: STRING,
        allowNull: false,
    },
    department: {
        type: STRING,
        allowNull: false,
    },
    password: {
        type: STRING,
        allowNull: false,
    },
},
{
sequelize,
modelName: "Users",
tableName: "users",
timestamps: false,
}
);
export {Users};