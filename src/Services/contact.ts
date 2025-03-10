import { ContactsInterface } from "../Interfaces/ContactInterface";
import Contact from "../Models/contact";

export class ContactServices {
  async fetchAll(): Promise<ContactsInterface[]> {
    try {
      const contacts = await Contact.findAll();
      return contacts;
    } catch (error) {
      throw new Error(`Error fetching contacts ${error}`);
    }
  }

  async fetchById(id: number): Promise<ContactsInterface> {
    try {
      const contactId = await Contact.findByPk(id);
      if (!contactId) {
        throw new Error(`Contact with id ${id} not found`);
      }
      return contactId.get({ plain: true });
    } catch (error) {
      throw new Error(`Error fetching contactId ${error}`);
    }
  }

  async update(id: number): Promise<ContactsInterface | null> {
    try {
      const contact = await Contact.findByPk(id);
      if (!contact) {
        throw new Error("Contact not found");
      }
      const isArchived = contact.archived;
      const newArchivedStatus = !isArchived;
      contact.archived = newArchivedStatus;
      await contact.save();
      return contact.get({ plain: true });
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const contact = await Contact.findByPk(id);

      if (!contact) {
        throw new Error("Contact not found");
      }

      await contact.destroy();

      return true;
    } catch (error) {
      throw error;
    }
  }
}
