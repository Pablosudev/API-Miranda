import { ContactsInterface } from "../Interfaces/ContactInterface";

export class ContactValidators {
    validateProperties(contact: ContactsInterface): string [] {
        const errorMessages: string[] = [];
    const requiredProperties: string[] = [
      'date',
      'id',
      'full_name',
      'email',
      'phone',
      'asunto',
      'comment'
    ];

    requiredProperties.forEach((property) => {
      if (!(property in contact)) {
        errorMessages.push(`La propiedad [${property}] es obligatoria en Rooms.`);
      }
    });

    return errorMessages;
    }
    validateContacts(contact: ContactsInterface[]): string[] {
        const errorMessages: string[] = [];
    
        contact.forEach((contact, index) => {
          const contactErrors = this.validateProperties(contact);
          if (contactErrors.length > 0) {
            errorMessages.push(`Errores en el contacto ${index + 1}:`);
            errorMessages.push(...contactErrors);
          }
        });
    
        return errorMessages;
      }
}