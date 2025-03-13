import { UsersInterface } from "../Interfaces/UsersInterface";
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../Utils/database";

class Users extends Model<UsersInterface> implements UsersInterface {
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

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
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

export default Users;
