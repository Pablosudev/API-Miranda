import { ContactsInterface } from "../Interfaces/ContactInterface";
import { connectDB } from "../Utils/database";

export class ContactServices {
  async fetchAll(): Promise<ContactsInterface[]> {
    let connection;
    try {
      connection = await connectDB();
      const [rows] = await connection.execute('SELECT * FROM contacts') as [ContactsInterface[], any];
      return rows; 
    } catch (error) {
      throw new Error(`Error fetching contacts: ${error}`);
    } finally {
      if (connection) {
        await connection.end();
      }
    }
  }
  

  async fetchById(id: string): Promise<ContactsInterface> {
    let connection;
    try {
      connection = await connectDB();
  
      
      const [rows]: [ContactsInterface[], any] = await connection.execute(
        'SELECT * FROM contacts WHERE id = ?',
        [id]
      ) as [ContactsInterface[], any]; 
  
      if (rows.length === 0) {
        throw new Error("Contact not found");
      }
  
      return rows[0]; 
    } catch (error) {
      throw error;
    } finally {
      if (connection) {
        await connection.end();
      }
    }
  }
  async create(contact: ContactsInterface): Promise<ContactsInterface> {
    let connection;
    try {
      connection = await connectDB();
  
      
      const [result]: any = await connection.execute(
        'INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)',
        [contact.name, contact.email, contact.phone]
      );
  
      
      const insertId = result.insertId;
  
      
      const [newContact] = await connection.execute(
        'SELECT * FROM contacts WHERE id = ?',
        [insertId]
      ) as [ContactsInterface[], any];
  
      if (newContact.length === 0) {
        throw new Error("Contact could not be created");
      }
  
      return newContact[0]; 
    } catch (error) {
      throw error;
    } finally {
      if (connection) {
        await connection.end();
      }
    }
  }
  async update(id: string): Promise<ContactsInterface | null> {
    let connection;
    try {
      connection = await connectDB();
  
      
      const [currentContact]: [ContactsInterface[], any] = await connection.execute(
        'SELECT archived FROM contacts WHERE id = ?',
        [id]
      ) as [ContactsInterface[], any];
  
      if (currentContact.length === 0) {
        throw new Error("Contact not found");
      }
  
      const isArchived = currentContact[0].archived;
  
      
      const newArchivedStatus = isArchived ? 0 : 1;
  
      const [result]: any = await connection.execute(
        'UPDATE contacts SET archived = ? WHERE id = ?',
        [newArchivedStatus, id]
      );
  
      
      if (result.affectedRows === 0) {
        throw new Error("Contact not found");
      }
  
      
      const [updatedContact]: [ContactsInterface[], any] = await connection.execute(
        'SELECT * FROM contacts WHERE id = ?',
        [id]
      ) as [ContactsInterface[], any];
  
      return updatedContact[0] || null; 
    } catch (error) {
      throw error;
    } finally {
      if (connection) {
        await connection.end();
      }
    }
  }
  
  async delete(id: string): Promise<boolean> {
    let connection;
    try {
      connection = await connectDB();
  
      
      const [result]: any = await connection.execute(
        'DELETE FROM contacts WHERE id = ?',
        [id]
      );
  
      
      if (result.affectedRows === 0) {
        throw new Error("Contact not found");
      }
  
      return true; 
    } catch (error) {
      throw error;
    } finally {
      if (connection) {
        await connection.end();
      }
    }
  }
}
