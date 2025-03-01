import { ServiceInterface } from "../Interfaces/ServiceInterface";
import { ContactsInterface } from "../Interfaces/ContactInterface";
import { ContactModel } from "../Models/contact";

export class ContactServices implements ServiceInterface<ContactsInterface> {
  async fetchAll(): Promise<ContactsInterface[]> {
    try {
      const contact: ContactsInterface[] = await ContactModel.find();
      return contact;
    } catch (error) {
      throw error;
    }
  }

  async fetchById(id: string): Promise<ContactsInterface> {
    try {
      const contactId: ContactsInterface | null = await ContactModel.findById(
        id
      )
      if (!contactId) {
        throw new Error("Contact not found");
      }
      return contactId;
    } catch (error) {
      throw error;
    }
  }
  async create(contact: ContactsInterface): Promise<ContactsInterface> {
    try {
      const newContact = new ContactModel(contact);
      await newContact.save();
      return newContact;
    } catch (error) {
      throw error;
    }
  }
  async update(
    id: string,
    contact: ContactsInterface
  ): Promise<ContactsInterface | null> {
    try {
      const contactToUpdate: ContactsInterface | null =
        await ContactModel.findById(id);
      if (contactToUpdate === null) {
        throw new Error("Contact not found");
      }
      const contactObj = contactToUpdate.toObject()
      const updatedContact = { ...contactObj, ...contact };
      await ContactModel.findByIdAndUpdate(id, updatedContact, { new: true });

      return updatedContact;
    } catch (error) {
      throw error;
    }
  }
  async delete(id: string): Promise<boolean> {
    try {
      const contactToDelete = await ContactModel.findById(id);
      if (!contactToDelete) {
        throw new Error("HContact not found");
      }

      await ContactModel.findByIdAndDelete(id);
      return true;
    } catch (error) {
      throw error;
    }
  }
}
