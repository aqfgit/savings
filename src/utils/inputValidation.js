function numberValueIsValid(value) {
    const intValue = parseInt(value);
    return !isNaN(intValue);
  }

 function textValueIsValid(value) {
    return (value === '') ? false : true;
  }

  export {
      textValueIsValid,
      numberValueIsValid,
  }