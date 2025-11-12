export function validatePassword(password) {
  const errors = [];
  if (!/[A-Z]/.test(password)) errors.push('Must contain an uppercase letter.');
  if (!/[a-z]/.test(password)) errors.push('Must contain a lowercase letter.');
  if (password.length < 6) errors.push('Must be at least 6 characters long.');
  return errors;
}
