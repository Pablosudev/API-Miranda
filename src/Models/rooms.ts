import { sequelize } from "../Utils/database";
import { DataTypes, INTEGER, Model, NUMBER, STRING } from "sequelize";
import { RoomsInterface } from "../Interfaces/RoomsInterface";

class Rooms extends Model<RoomsInterface> implements RoomsInterface{
public id!:number;
public number!: number;
public price!: number;
public offer!: number;
public type!: string;
public roomStatus!: string;
public amenities!: string;

}

Rooms.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price:{
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  offer:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  roomStatus: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amenities: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
  {
    sequelize,
    modelName: "Rooms",
    tableName: "rooms",
    timestamps: false,
  }
)
export default Rooms;