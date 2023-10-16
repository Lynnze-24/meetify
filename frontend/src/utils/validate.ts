export function isValidEmail(email: string): boolean {
  // Regular expression for a simple email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Test the email against the regex and return the result
  return emailRegex.test(email);
}
