export const isPhoneNumber = (value) => {
  if (!/^1[3456789]\d{9}$/.test(value)) {
    return false;
  }
  return true;
};
export const isIdCard = (value) => {
  let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (reg.test(value) === false) {
    return false;
  }
  return true;
};
