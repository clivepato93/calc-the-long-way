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
    if (typeof tokens[i] == 'number') {
      outputQueue.push(tokens[i]);
    } else {
      if (precende[tokens[i]]) {
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
        if(res == -Infinity || res== Infinity) return `Unable to return return due to the value being: ${res}`
        res.push(result);
      }
    }

    i++;
  }
  return res[0];
}



if(process.argv[1].endsWith('script.js')){

  if (process.argv.length <3) {
    throw new Error('Please enter more arguments when calling the script usage:\nnode script.js "Math Expression..." ...');
  } else {
    let expression = []
    process.argv.slice(2).forEach(function(arg, i) {
      expression.push(arg)
    });
    let tokens = tokeniser(expression.join(''))
    
    if(parser(tokens)){
      console.log(`the result is: ${evaluate(tokens)}`)
    }else{
      throw new Error('Invalid expression please enter a valid expression')
    }
  }
}

export {tokeniser,parser,evaluate}