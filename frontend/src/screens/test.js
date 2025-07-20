const factorial = require('./new.js');

// Test cases
console.log(factorial(5)); // Output: 120
console.log(factorial(0)); // Output: 1
console.log(factorial(-1)); // Output: Error: Input must be a non-negative integer.
console.log(factorial(3.14)); // Output: Error: Input must be a non-negative integer.
console.log(factorial(10)); // Output: 3628800