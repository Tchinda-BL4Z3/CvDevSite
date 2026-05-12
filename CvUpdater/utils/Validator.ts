interface ValidationError {
  field: string;
  message: string;
}

function validateRequired(value: string, fieldName: string): ValidationError | null {
  if (!value || value.trim().length === 0) {
    return { field: fieldName, message: `${fieldName} est requis` };
  }
  return null;
}

function validateEmail(email: string): ValidationError | null {
  if (!email) return null;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) {
    return { field: 'email', message: 'Email invalide' };
  }
  return null;
}

function validatePhone(phone: string): ValidationError | null {
  if (!phone) return null;
  const re = /^[+\d\s()-]{8,20}$/;
  if (!re.test(phone)) {
    return { field: 'telephone', message: 'Numéro de téléphone invalide' };
  }
  return null;
}

function validateUrl(url: string): ValidationError | null {
  if (!url) return null;
  try {
    new URL(url);
    return null;
  } catch {
    return { field: 'linkedin', message: 'URL invalide' };
  }
}

function validateMember(data: Record<string, string>): ValidationError[] {
  const errors: ValidationError[] = [];

  const nameErr = validateRequired(data.nom, 'Nom');
  if (nameErr) errors.push(nameErr);

  const emailErr = validateEmail(data.email);
  if (emailErr) errors.push(emailErr);

  const phoneErr = validatePhone(data.telephone);
  if (phoneErr) errors.push(phoneErr);

  const urlErr = validateUrl(data.linkedin);
  if (urlErr) errors.push(urlErr);

  return errors;
}

export type { ValidationError };
export { validateRequired, validateEmail, validatePhone, validateUrl, validateMember };
