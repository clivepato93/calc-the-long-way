// collect more than one digit
// collect operators
// ignore space
// collect parantheses
// 4 - 2


function generateToken(currToken) {
  if (currToken.length ==1) {
    return currToken[0];
  }
  let negativeOp = 0;
  let finalOutput = [];
  for (let j = 0; j < currToken.length; j++) {
    if (currToken[j] == "-") {
      negativeOp++;
    } else if(/\d/.test(currToken[j])) {
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
  for (let i = 0; i < expr.length; i++) {
    if (/[/*()]/.test(expr[i])) {
      if (currToken.length) {
        tokens.push(generateToken(currToken));
        currToken.length = 0;
        currToken.push(expr[i]);
        tokens.push(generateToken(currToken));
        currToken.length = 0;
      }
      else{
        currToken.push(expr[i]);
        tokens.push(generateToken(currToken));
        currToken.length = 0;
      }
    }

    else{
      let lastToken = tokens[tokens.length-1]
      if(tokens.length && /\d/.test(lastToken[lastToken.length-1])  && /[-+]/.test(expr[i])){
        currToken.push(expr[i])
        tokens.push(generateToken(currToken));
        currToken.length = 0;
      }

      if(/\d/.test(currToken[currToken.length-1]) && /[-+]/.test(expr[i])){
        tokens.push(generateToken(currToken));
        currToken.length = 0;
        currToken.push(expr[i])
        tokens.push(generateToken(currToken));
        currToken.length = 0;
      }

      else if(expr[i]!=' '){
        currToken.push(expr[i])
      }
    }
    //

    
  }
  if (currToken.length) {
    tokens.push(generateToken(currToken));
        currToken.length = 0;
  }
  return tokens;
}
console.log(tokeniser("-(-3)"));
console.log(tokeniser("-2 -(-5)"));
console.log(tokeniser("4 * -2"));
console.log(tokeniser('4 - 2'))
console.log(tokeniser("+"));
 console.log(tokeniser('41 + ( 98+9) - 2'))

 console.log(tokeniser("4 + ---3"))

  console.log(tokeniser("-4 + (10 - ---2) * --3"))
