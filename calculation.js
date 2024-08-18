const math = require("mathjs");

class Calculation {
  static calculateExpression(expression) {
    try {
      // Evaluate the mathematical expression
      const result = math.evaluate(expression);

      // Check if the result is Infinity or -Infinity
      if (!isFinite(result)) {
        return "Infinity";
      }

      return result.toString();
    } catch (error) {
      throw new Error("Invalid expression");
    }
  }
}

module.exports = Calculation;
