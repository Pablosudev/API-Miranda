import { UsersInterface } from "../Interfaces/UsersInterface";

export class UsersInterfaceValidators {
  validateProperties(user: UsersInterface): string[] {
    const errorMessages: string[] = [];
    const requiredProperties: string[] = [
      "date",
      "id",
      "full_name",
      "email",
      "phone",
      "asunto",
      "comment",
    ];

    requiredProperties.forEach((property) => {
      if (!(property in user)) {
        errorMessages.push(
          `La propiedad [${property}] es obligatoria en Users.`
        );
      }
    });

    return errorMessages;
  }
  validateContacts(user: UsersInterface[]): string[] {
    const errorMessages: string[] = [];

    user.forEach((user, index) => {
      const contactErrors = this.validateProperties(user);
      if (contactErrors.length > 0) {
        errorMessages.push(`Errores en el usuario ${index + 1}:`);
        errorMessages.push(...contactErrors);
      }
    });

    return errorMessages;
  }
}
