function numberValueIsValid(value) {
  const intValue = parseInt(value);
  return !isNaN(intValue);
}

function textValueIsValid(value) {
  return value === "" ? false : true;
}

const formValid = ({ fieldsValid }) => {
  let valid = true;

  Object.values(fieldsValid).forEach((isValid) => {
    if (!isValid) {
      valid = false;
      return;
    }
  });

  return valid;
};

export { textValueIsValid, numberValueIsValid, formValid };
