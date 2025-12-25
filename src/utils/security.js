/**
 * Mã hóa các ký tự không an toàn trong chuỗi để ngăn chặn XSS.
 * @param {string} str - Chuỗi đầu vào cần mã hóa.
 * @returns {string} - Chuỗi đã được mã hóa.
 */
export const escapeHTML = (str) => {
  if (typeof str !== 'string') {
    return str;
  }
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};
