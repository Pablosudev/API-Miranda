
import { DataTypes, DATE, Model, STRING } from "sequelize";
import { BookingsInterface } from "../Interfaces/BookingsInterface";
import Rooms from "../Models/rooms";
import { sequelize } from "../Utils/database";

class Bookings extends Model<BookingsInterface> implements BookingsInterface {
  public id!: number;
  public name!: string;
  public date!: Date;
  public check_in!: Date;
  public check_out!: Date;
  public request!: string;
  public status!: string;
  public room_id!: number;
}

Bookings.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    date: {
      type: DATE,
      allowNull: false,
    },
    check_in: {
      type: DATE,
      allowNull: false,
    },

    check_out: {
      type: DATE,
      allowNull: false,
    },
    request: {
      type: STRING,
      allowNull: false,
    },
    status: {
      type: STRING,
      allowNull: false,
    },
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Rooms,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Bookings",
    tableName: "bookings",
    timestamps: false
  }
);

 Bookings.belongsTo(Rooms, { foreignKey: "room_id"})
 export default Bookings;