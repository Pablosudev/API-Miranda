import { BOOLEAN, DataTypes, Model, STRING } from "sequelize";
import { sequelize } from "../Utils/database";
import { ContactsInterface } from "../Interfaces/ContactInterface";

class Contact extends Model<ContactsInterface> implements ContactsInterface {
  public id!: number;
  public date!: string;
  public name!: string;
  public email!: string;
  public phone!: string;
  public subject!: string;
  public comment!: string;
  public archived!: boolean;
}

Contact.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  date: {
    type: STRING,
    allowNull: false
  },
  name: {
    type: STRING,
    allowNull: false
  },
  email: {
    type: STRING,
    allowNull: false
  },
  phone: {
    type: STRING,
    allowNull: false
  },
  subject: {
    type: STRING,
    allowNull: false
  },
  comment: {
    type: STRING,
    allowNull: false
  },
  archived: {
    type: BOOLEAN,
    defaultValue: false
  },
},
{
    sequelize,
    modelName: "Contact",
    tableName: "contacts",
    timestamps: false,
}
);
 
export default Contact;