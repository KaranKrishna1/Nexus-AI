/**
 * Calculates the factorial of a given number.
 * @param {number} num The number to calculate the factorial of.
 * @returns {number|Error} The factorial of the number or an Error if input is invalid.
 */
function factorial(num) {
  // Error handling for invalid input
  if (!Number.isInteger(num) || num < 0) {
    return new Error('Input must be a non-negative integer.');
  }

  // Base case: factorial of 0 is 1
  if (num === 0) {
    return 1;
  }

  // Recursive calculation
  let result = 1;
  for (let i = 2; i <= num; i++) {
    result *= i;
  }
  return result;
}

module.exports = factorial;