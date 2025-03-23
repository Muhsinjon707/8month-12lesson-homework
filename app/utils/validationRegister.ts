interface ValidTypes {
  (
    user_firstname: string,
    user_lastname: string,
    user_email: string,
    user_password: string,
    user_terms: boolean
  ): string[];
}

const validationRegister: ValidTypes = (
  user_firstname,
  user_lastname,
  user_email,
  user_password,
  user_terms
) => {
  const errors: string[] = [];

  if (
    !user_firstname ||
    !user_lastname ||
    !user_email ||
    !user_password ||
    !user_terms
  ) {
    return ["All fields are required."];
  }

  if (user_firstname.length < 3) {
    errors.push("First name should be at least 3 characters");
  }

  if (user_lastname.length < 3) {
    errors.push("Last name should be at least 3 characters");
  }

  if (user_password.length < 8) {
    errors.push("Password must be at least 8 characters.");
  }
  if (!/[A-Z]/.test(user_password)) {
    errors.push("Password must contain at least one uppercase letter.");
  }
  if (!/[a-z]/.test(user_password)) {
    errors.push("Password must contain at least one lowercase letter.");
  }
  if (!/[0-9]/.test(user_password)) {
    errors.push("Password must contain at least one number.");
  }
  if (!/[\W_]/.test(user_password)) {
    errors.push("Password must contain at least one special character.");
  }

  if (!user_terms) errors.push("All terms should be checked");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(user_email)) {
    errors.push("Invalid email format.");
  }

  return errors;
};

export default validationRegister;
