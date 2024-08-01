export function validatePhoneNumber(inputtxt) {
  var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return phoneno.test(inputtxt);
}

export function validateEmail(email) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function validatePassword(password) {
  var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return re.test(String(password));
}
