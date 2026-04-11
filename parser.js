export function parser(tokens) {
  let expectedValue = true;
  let stack = [];
  for (const element of tokens) {
    if (expectedValue) {
      if (element == "(") {
        stack.push(")");
      } else if (/\d/.test(element)) {
        expectedValue = false;
      } else {
        return false;
      }
    } else {
      if (element == ")") {
        if (stack.length == 0) {
          return false;
        } else {
          stack.pop();
        }
      } else if (/[*/+-]/.test(element)) {
        expectedValue = true;
      } else {
        return false;
      }
    }
  }
  return expectedValue == false && stack.length == 0;
}
