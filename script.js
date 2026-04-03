function generateToken(currToken) {
  let negativeOp = 0;
  let finalOutput = [];
  let tokens = [];
  for (let j = 0; j < currToken.length; j++) {
    if (currToken[j] == "-") {
      negativeOp++;
    } else if (/\d/.test(currToken[j])) {
      finalOutput.push(currToken[j]);
    }
  }
  if (negativeOp % 2) {
    tokens.push(-1);
    tokens.push("*");
  }
  if (finalOutput.length) {
    tokens.push(+finalOutput.join(""));
  }
  return tokens;
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
      if (unary && "+" == expr[i]) {
        continue;
      }
      if (unary && "-" == expr[i]) {
        currToken.push(expr[i]);
      } else {
        if (currToken.length) {
          const newtokens = generateToken(currToken);
          for (let token of newtokens) {
            tokens.push(token);
          }
          currToken.length = 0;
        }

        tokens.push(expr[i]);
        unary = true;
      }
    } else if (/[/*() ]/.test(expr[i])) {
      if (" " == expr[i] && /\d/.test(currToken[currToken.length - 1])) {
        const newtokens = generateToken(currToken);
        for (let token of newtokens) {
          tokens.push(token);
        }
        currToken.length = 0;
        unary = false;
      }

      if (/[/*(]/.test(expr[i])) {
        if (currToken.length) {
          const newtokens = generateToken(currToken);
          for (let token of newtokens) {
            tokens.push(token);
          }
          currToken.length = 0;
        }
        tokens.push(expr[i]);
        unary = true;
      }
      if (")" == expr[i]) {
        if (currToken.length) {
          const newtokens = generateToken(currToken);
          for (let token of newtokens) {
            tokens.push(token);
          }
          currToken.length = 0;
        }
        tokens.push(expr[i]);
        unary = false;
      }
    }
  }

  if (currToken.length) {
    const newtokens = generateToken(currToken);
    for (let token of newtokens) {
      tokens.push(token);
    }

    currToken.length = 0;
  }
  return tokens;
}

function parser(tokens) {
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

function evaluate(tokens) {
  const precende = {
    "-": 1,
    "+": 1,
    "*": 2,
    "/": 2,
  };

  const operations = {
    "-": function (a, b) {
      return a - b;
    },
    "+": function (a, b) {
      return a + b;
    },
    "*": function (a, b) {
      return a * b;
    },
    "/": function (a, b) {
      return a / b;
    },
  };

  let outputQueue = [];
  let operators = [];
  for (let i = 0; i < tokens.length; i++) {
    if (/\d/.test(tokens[i])) {
      outputQueue.push(+tokens[i]);
    } else {
      if (precende[tokens[i]] <= precende[operators[operators.length - 1]]) {
        while (
          precende[tokens[i]] <= precende[operators[operators.length - 1]]
        ) {
          const currentOp = operators.pop();
          if (precende[currentOp]) {
            outputQueue.push(currentOp);
          }
        }
        operators.push(tokens[i]);
      } else if (tokens[i] == ")") {
        while (true) {
          const currentOp = operators.pop();
          if (currentOp == "(") {
            break;
          }
          if (precende[currentOp]) {
            outputQueue.push(currentOp);
          }
        }
      } else {
        operators.push(tokens[i]);
      }
    }
  }
  if (operators.length) {
    while (operators.length) {
      const currentOp = operators.pop();
      if (precende[currentOp]) {
        outputQueue.push(currentOp);
      }
    }
  }
  let res = [outputQueue[0]];
  let i = 1;
  while (i < outputQueue.length) {
    if (i < outputQueue.length && isNaN(outputQueue[i]) == false) {
      res.push(outputQueue[i]);
    } else {
      if (res.length >= 2) {
        const second = res.pop();
        const first = res.pop();
        const result = operations[outputQueue[i]](first, second);
        res.push(result);
      }
    }

    i++;
  }
  return res[0];
}

// console.log(evaluate(tokeniser("-+-3")));        // 3
// console.log(evaluate(tokeniser("--(3+2)")));     // 5

// console.log(evaluate(tokeniser("(1 + (2 * -3))")));

// console.log(tokeniser("9)-3"));
// console.log(tokeniser("-3 12"));
// console.log(evaluate(tokeniser("-(-3)")));
// console.log( evaluate(tokeniser("-2 -(-5)")));

// console.log(tokeniser("-2 -(-5)"));
// console.log(tokeniser("-(3+2)"));
// console.log(tokeniser("  -   3"));
// console.log(evaluate(tokeniser("4 * -2")));
// console.log(tokeniser("4 - 2"));
// console.log(tokeniser("+"));
// console.log(evaluate(tokeniser("41 + ( 98+9) - 2")));
// console.log(evaluate(tokeniser("41 + ( 98+9) - 2")));

// console.log(tokeniser("4 + ---3"));

// console.log(evaluate(tokeniser("-4 + (10 - ---2) * --3")));

// console.log(tokeniser("-   3"));
// console.log(tokeniser("( - ( - ( -3 ) ) )"));
// console.log(parser(tokeniser("( - ( - ( -3 ) ) )")));

// console.log(tokeniser("-3"));
// console.log(evaluate(tokeniser("- 3")));
// console.log(tokeniser("-   3"));
// console.log(tokeniser("--3"));
// console.log(tokeniser("- -3"));
// console.log(tokeniser("- - 3"));
// console.log(tokeniser("+3"));
// console.log(tokeniser("+ +3"));
// console.log(tokeniser("-+-3"));

// console.log(tokeniser("4+-3"));
// console.log(tokeniser("4 + -3"));
// console.log( evaluate( tokeniser("4 - -3")));

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
// console.log( evaluate(tokeniser("( - ( - ( -3 ) ) )")));

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

// console.log(parser(tokeniser("-3")));
// console.log(parser(tokeniser("- 3")));
// console.log(parser(tokeniser("-   3")));
// console.log(parser(tokeniser("--3")));
// console.log(parser(tokeniser("- -3")));
// console.log(parser(tokeniser("- - 3")));
// console.log(parser(tokeniser("+3")));
// console.log(parser(tokeniser("+ +3")));
// console.log(parser(tokeniser("-+-3")));

// console.log(parser(tokeniser("4+-3")));
// console.log(parser(tokeniser("4 + -3")));
// console.log(parser(tokeniser("4 - -3")));
// console.log(parser(tokeniser("4--3")));
// console.log(parser(tokeniser("4 -+-3")));

// console.log(parser(tokeniser("(-3)")));
// console.log(parser(tokeniser("( -3 )")));
// console.log(parser(tokeniser("( - 3 )")));
// console.log(parser(tokeniser("-(3)")));
// console.log(parser(tokeniser("- (3)")));
// console.log(parser(tokeniser("-( 3 )")));

// console.log(parser(tokeniser("(1 + (2 * -3))")));
// console.log(parser(tokeniser("(((-3)))")));
// console.log(parser(tokeniser("( - ( - ( -3 ) ) )")));

// console.log(parser(tokeniser("3*4")));
// console.log(parser(tokeniser("3 *4")));
// console.log(parser(tokeniser("3* 4")));
// console.log(parser(tokeniser("3 *  4")));
// console.log(parser(tokeniser("3/ -2")));
// console.log(parser(tokeniser("3/-2")));

// console.log(parser(tokeniser("   3")));
// console.log(parser(tokeniser("3   ")));
// console.log(parser(tokeniser("   3 +    4   ")));
// console.log(parser(tokeniser("   -   5")));

// console.log(parser(tokeniser("3 4")));
// console.log(parser(tokeniser("(3)4")));
// console.log(parser(tokeniser("4(3)")));
// console.log(parser(tokeniser("+*3")));
// console.log(parser(tokeniser("*/3")));

// console.log(parser(tokeniser("-  3")));
// console.log(parser(tokeniser("4 +  -   2")));
// console.log(parser(tokeniser("(  -  5 )")));

// console.log(evaluate(tokeniser("(12/(3+1))")));            // 3
// console.log(evaluate(tokeniser("-(6/(3-1))")));            // -3
// console.log(evaluate(tokeniser("(8/(2*(1+1)))")));         // 2
// console.log(evaluate(tokeniser("(12/( (2+1) * -(1+1) ))"))); // -2
// console.log(evaluate(tokeniser("( ( ( 9 ) ) / 3 )")));     // 3

// console.log(evaluate(tokeniser("-(3+4)")));              // -7
// console.log(evaluate(tokeniser("(10/(2+3))")));          // 2
// console.log(evaluate(tokeniser("((8/2)+3)")));           // 7
// console.log(evaluate(tokeniser("-(6/(3+1))")));           // -1.5
// console.log(evaluate(tokeniser("(20/( (2+3) * 2 ))")));   // 2

// console.log(tokeniser("5 - (3+2)"));        // ❌ likely incorrect
// console.log(evaluate(tokeniser("10 - (2*3)")));       // ❌ likely incorrect
// console.log(evaluate(tokeniser("8 - (6/2)")));        // ❌ likely incorrect
// console.log(evaluate(tokeniser("7 - (2+3*2)")));      // ❌ likely incorrect
// console.log(evaluate(tokeniser("20 - ( (2+3) * 2 )"))); // ❌ likely incorrect

// console.log(tokeniser("10 - (2*3)"));
// console.log(tokeniser("-(3+2)"));
// console.log(tokeniser("4 * -(3+2)"));
// console.log(tokeniser("-(2+3) * 4"));
// console.log(tokeniser("-(2+(3*2))"));
// console.log(tokeniser("10 / -(2+3)"));
