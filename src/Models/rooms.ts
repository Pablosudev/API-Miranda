import { sequelize } from "../Utils/database";
import { DataTypes, Model, NUMBER, STRING } from "sequelize";
import { RoomsInterface } from "../Interfaces/RoomsInterface";

class Rooms extends Model<RoomsInterface> implements RoomsInterface{
public id!:number;
public number!: number;
public price!: number;
public offer!: number;
public type!: string;
public roomStatus!: string;
public amenities!: string[];

}

Rooms.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  number: {
    type: NUMBER,
    allowNull: false,
  },
  price:{
    type: NUMBER,
    allowNull: false,
  },
  offer:{
    type: NUMBER,
    allowNull: false,
  },
  type: {
    type: STRING,
    allowNull: false,
  },
  roomStatus: {
    type: STRING,
    allowNull: false,
  },
  amenities: {
    type: STRING,
    allowNull: false,
  },
},
  {
    sequelize,
    modelName: "rooms",
    tableName: "rooms",
    timestamps: false,
  }
)
export default Rooms;