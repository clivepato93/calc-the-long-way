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