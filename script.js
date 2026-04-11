import { tokeniser } from "./generateTokens";
import { parser } from "./parser";




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