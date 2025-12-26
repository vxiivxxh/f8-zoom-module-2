/**
 * Xác thực địa chỉ email.
 * @param {string} email 
 * @returns {boolean}
 */
export const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

/**
 * Xác thực mật khẩu.
 * Quy tắc: Ít nhất 8 ký tự.
 * @param {string} password 
 * @returns {boolean}
 */
export const validatePassword = (password) => {
  return password && password.length >= 8;
};

/**
 * Xác thực tên.
 * Quy tắc: Ít nhất 25 ký tự.
 * @param {string} name 
 * @returns {boolean}
 */
export const validateName = (name) => {
  return name && name.trim().length <= 25;
};
