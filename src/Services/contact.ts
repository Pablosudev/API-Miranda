import { ServiceInterface } from "../Interfaces/ServiceInterface";
import { ContactsInterface } from "../Interfaces/ContactInterface";
import contact from "../Data/contact.json"

export class ContactServices implements ServiceInterface<ContactsInterface>{
    private contact : ContactsInterface [] = contact;

    fetchAll(): ContactsInterface[] {
        return this.contact;
    }

    fetchById(id: number): ContactsInterface | undefined {
        return this.contact.find((contacts) => contacts.id === id);
    }
    create(contact: ContactsInterface): ContactsInterface {
        const newContact = { ...contact, id: this.contact.length + 1 };
        this.contact.push(newContact);
        return newContact;
    }
    update(id: number, contact: ContactsInterface): ContactsInterface | null {
        const contactToUpdate = this.contact.filter((contacts) => contacts.id === id);
        if (contactToUpdate.length > 0) {
            const updatedContact = { ...contactToUpdate[0], ...contact };
            const finalList = this.contact.filter((contacts) => contacts.id !== id);
            finalList.push(updatedContact);
            this.contact = finalList;
            return updatedContact;
        }
        return null;
    }
    delete(id:number): boolean {
        const contactToDelete = this.contact.filter((contacts) => contacts.id === id);
        if (contactToDelete.length > 0) {
            this.contact = this.contact.filter((contacts) => contacts.id !== id);
            return true;
        }
        return false;
    }

}
