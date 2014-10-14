function validatePattern(cadena,patron){
  return cadena.match(patron) !== null;
}

function validateUser(cadena) {
    return (validatePattern(cadena,/^[a-z0-9áéíóúñ_/-]*$/i) && cadena.length >= 4 && cadena.length <= 30) ;
}
function validateEmail(cadena) {
    return validatePattern(cadena,/[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/);
}
function validatePass(cadena) {
    return validatePattern(cadena,/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,16})$/);
}

module.exports = {
	validateUser : validateUser,
	validatePass : validatePass,
	validateEmail : validateEmail
 };
 