/**
 * Validates an email address.
 * @param {string} email 
 * @returns {boolean}
 */
export const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

/**
 * Validates a password.
 * Rules: At least 6 characters.
 * @param {string} password 
 * @returns {boolean}
 */
export const validatePassword = (password) => {
  return password && password.length >= 6;
};

/**
 * Validates a name.
 * Rules: At least 2 characters.
 * @param {string} name 
 * @returns {boolean}
 */
export const validateName = (name) => {
  return name && name.trim().length >= 2;
};
