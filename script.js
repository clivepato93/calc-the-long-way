// collect more than one digit
// collect operators
// ignore space
// collect parantheses
// 4 - 2

function generateToken(currToken) {
  if (currToken.length == 1) {
    return currToken[0];
  }
  let negativeOp = 0;
  let finalOutput = [];
  for (let j = 0; j < currToken.length; j++) {
    if (currToken[j] == "-") {
      negativeOp++;
    } else if (/\d/.test(currToken[j])) {
      finalOutput.push(currToken[j]);
    }
  }
  if (negativeOp % 2) {
    finalOutput = "-" + finalOutput.join("");
  } else {
    finalOutput = finalOutput.join("");
  }
  return finalOutput;
}

function tokeniser(expr) {
  let tokens = [];
  let currToken = [];
  let unary = true;

  for (let i = 0; i < expr.length; i++) {
    if (/\d/.test(expr[i])) {
      unary = false;
      currToken.push(expr[i]);
    } else if (/[+-]/.test(expr[i])) {
      if (unary) {
        currToken.push(expr[i]);
      } else {
        if (currToken.length) {
          tokens.push(generateToken(currToken));
          currToken.length = 0;
        }

        tokens.push(generateToken(expr[i]));
        unary = true;
      }
    } else if (/[/*() ]/.test(expr[i])) {
      if (" " == expr[i] && /\d/.test(currToken[currToken.length - 1])) {
        tokens.push(generateToken(currToken));
        currToken.length = 0;
        unary = false;
      }

      if (/[/*(]/.test(expr[i])) {
        if (currToken.length) {
          tokens.push(generateToken(currToken));
          currToken.length = 0;
        }
        tokens.push(generateToken(expr[i]));
        unary = true;
      }
      if (")"==expr[i]) {
        if (currToken.length) {
          tokens.push(generateToken(currToken));
          currToken.length = 0;
        }
        tokens.push(generateToken(expr[i]));
        unary = false;
      }
    }
  }

  if (currToken.length) {
    tokens.push(generateToken(currToken));
    currToken.length = 0;
  }
  return tokens;
}

function parser(tokens){
  let expectedValue = true;
  let stack = []
  for (const element of tokens) {
    if(expectedValue){
      if(element=='('){
        stack.push(')')
      }
      else if(/\d/.test(element)){
        expectedValue = false
      }

      else{
        return false
      }
      
    }
    else{
      if(element == ')'){
        if(stack.length ==0){
          return false
        }
        else{
          stack.pop()
        }
      }
      else if(/[*/+-]/.test(element)){
        expectedValue = true
      }
      else{
        return false
      }
    }
  }
  return stack.length ==0
}

// console.log(parser(tokeniser("9)-3")));
// console.log(parser(tokeniser("-3 12")));
// console.log(tokeniser("-(-3)"));
// console.log(tokeniser("-2 -(-5)"));
// console.log(tokeniser("-(3+2)"));
// console.log(tokeniser("  -   3"));
// console.log(tokeniser("4 * -2"));
// console.log(tokeniser("4 - 2"));
// console.log(tokeniser("+"));
// console.log(tokeniser("41 + ( 98+9) - 2"));

// console.log(tokeniser("4 + ---3"));

// console.log(tokeniser("-4 + (10 - ---2) * --3"));

// console.log(tokeniser("-   3"));
// console.log(tokeniser("( - ( - ( -3 ) ) )"));

// console.log(tokeniser("-3"));
// console.log(tokeniser("- 3"));
// console.log(tokeniser("-   3"));
// console.log(tokeniser("--3"));
// console.log(tokeniser("- -3"));
// console.log(tokeniser("- - 3"));
// console.log(tokeniser("+3"));
// console.log(tokeniser("+ +3"));
// console.log(tokeniser("-+-3"));

// console.log(tokeniser("4+-3"));
// console.log(tokeniser("4 + -3"));
// console.log(tokeniser("4 - -3"));
// console.log(tokeniser("4--3"));
// console.log(tokeniser("4 -+-3"));

// console.log(tokeniser("(-3)"));
// console.log(tokeniser("( -3 )"));
// console.log(tokeniser("( - 3 )"));
// console.log(tokeniser("-(3)"));
// console.log(tokeniser("- (3)"));
// console.log(tokeniser("-( 3 )"));

// console.log(tokeniser("(1 + (2 * -3))"));
// console.log(tokeniser("(((-3)))"));
// console.log(tokeniser("( - ( - ( -3 ) ) )"));

// console.log(tokeniser("3*4"));
// console.log(tokeniser("3 *4"));
// console.log(tokeniser("3* 4"));
// console.log(tokeniser("3 *  4"));
// console.log(tokeniser("3/ -2"));
// console.log(tokeniser("3/-2"));

// console.log(tokeniser("   3"));
// console.log(tokeniser("3   "));
// console.log(tokeniser("   3 +    4   "));
// console.log(tokeniser("   -   5"));

// console.log(tokeniser("3 4"));
// console.log(tokeniser("(3)4"));
// console.log(tokeniser("4(3)"));
// console.log(tokeniser("+*3"));
// console.log(tokeniser("*/3"));

// console.log(tokeniser("-  3"));
// console.log(tokeniser("4 +  -   2"));
// console.log(tokeniser("(  -  5 )"));