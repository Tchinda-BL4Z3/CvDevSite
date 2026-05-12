export interface ValidationError {
  field: string;
  message: string;
}

export class Validator {
  static validateRequired(value: string, fieldName: string): ValidationError | null {
    if (!value || value.trim().length === 0) {
      return { field: fieldName, message: `${fieldName} est requis` };
    }
    return null;
  }

  static validateEmail(email: string): ValidationError | null {
    if (!email) return null;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
      return { field: 'email', message: 'Email invalide' };
    }
    return null;
  }

  static validatePhone(phone: string): ValidationError | null {
    if (!phone) return null;
    const re = /^[+\d\s()-]{8,20}$/;
    if (!re.test(phone)) {
      return { field: 'telephone', message: 'Numéro de téléphone invalide' };
    }
    return null;
  }

  static validateUrl(url: string): ValidationError | null {
    if (!url) return null;
    try {
      new URL(url);
      return null;
    } catch {
      return { field: 'linkedin', message: 'URL invalide' };
    }
  }

  static validateMember(data: Record<string, string>): ValidationError[] {
    const errors: ValidationError[] = [];

    const nameErr = this.validateRequired(data.nom, 'Nom');
    if (nameErr) errors.push(nameErr);

    const emailErr = this.validateEmail(data.email);
    if (emailErr) errors.push(emailErr);

    const phoneErr = this.validatePhone(data.telephone);
    if (phoneErr) errors.push(phoneErr);

    const urlErr = this.validateUrl(data.linkedin);
    if (urlErr) errors.push(urlErr);

    return errors;
  }
}
