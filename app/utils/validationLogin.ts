interface ValidTypes {
  (user_email: string, user_password: string): string[];
}

const validationLogin: ValidTypes = (user_email, user_password) => {
  const errors: string[] = [];

  if (!user_email || !user_password) {
    return ["All fields are required."]
  }

  if (user_password.length < 8) {
    errors.push("Password should match to that of a register one!");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(user_email)) {
    errors.push("Invalid email format.");
  }

  return errors;
};

export default validationLogin;
