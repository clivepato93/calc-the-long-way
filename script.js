// collect more than one digit
// collect operators
// ignore space
// collect parantheses
// 4 - 2
function tokeniser(expr) {
  operations = new Set("-", "+", "/", "*");
  
  expr = expr + " ";
  let tokens = [];
  let currToken = [];
  for (let i = 0; i < expr.length; i++) {
    if (expr[i] == "(" || expr[i] == ")") {
      if(currToken.length){

        tokens.push(currToken.join(""));
        currToken.length = 0;
    }
      currToken.push(expr[i]);
      tokens.push(currToken.join(""));
       currToken.length = 0;
    }
    
    else if (/\d/.test(expr[i])) {
      currToken.push(expr[i]);
    } 
    
    else if (/ /.test(expr[i])) {
    if(currToken.length){

        tokens.push(currToken.join(""));
        currToken.length = 0;
    }
    } 
    // operations.has(expr[i])
    else if (/[+-/*]/.test(expr[i])) {
    if(expr[i] == '-' && tokens.length==0 || /[+-/*(]/.test(tokens[tokens.length-1])){
        currToken.push(expr[i])
    }
    else if(currToken.length){

        tokens.push(currToken.join(""));
        currToken.length = 0;
    }
    else{

        currToken.push(expr[i]);
        tokens.push(currToken.join(""));
        currToken.length = 0;
    }
    }
  }
  return tokens;
}
 console.log(tokeniser("-2 -(-5)"))
 console.log(tokeniser("4 * -2"))
// console.log(tokeniser('4 - 2'))
console.log(tokeniser("+"));
//  console.log(tokeniser('41 + ( 98+9) - 2'))
