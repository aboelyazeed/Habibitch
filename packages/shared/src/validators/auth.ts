export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validatePassword(password: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  if (password.length < 8)
    errors.push("Password must be at least 8 characters");
  if (!/[A-Z]/.test(password))
    errors.push("Password must contain at least one uppercase letter");
  if (!/[a-z]/.test(password))
    errors.push("Password must contain at least one lowercase letter");
  if (!/[0-9]/.test(password))
    errors.push("Password must contain at least one number");
  return { valid: errors.length === 0, errors };
}

export function validateDisplayName(name: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  if (name.length < 2)
    errors.push("Display name must be at least 2 characters");
  if (name.length > 30)
    errors.push("Display name must be at most 30 characters");
  if (/[<>{}[\]\\\/]/.test(name))
    errors.push("Display name contains invalid characters");
  return { valid: errors.length === 0, errors };
}

export function validateStreamTitle(title: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  if (title.length < 3)
    errors.push("Stream title must be at least 3 characters");
  if (title.length > 100)
    errors.push("Stream title must be at most 100 characters");
  return { valid: errors.length === 0, errors };
}
