function validatePattern(string, pattern){
  return string.match(pattern) !== null;
}

function validateUser(string) {
    return (validatePattern(string,/^[a-z0-9áéíóúñ_/-]*$/i) && string.length >= 4 && string.length <= 30) ;
}
function validateEmail(string) {
    return validatePattern(string,/[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/);
}
function validatePass(string) {
    return validatePattern(string,/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,16})$/);
}

module.exports = {
	validateUser : validateUser,
	validatePass : validatePass,
	validateEmail : validateEmail
 };
