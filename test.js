import { tokeniser, parser, evaluate } from "./script.js";

// tokeniser
try {
  const input = ["","1", "-( 3 )", "3*4", "(1 + (2 * -3))"];
  let expected = [
    [],
    [1],
    [-1, "*", "(", 3, ")"],
    [3, "*", 4],
    ["(", 1, "+", "(", 2, "*", -1, "*", 3, ")", ")"],
  ];
  input.forEach((expr,i)=>{
    const res = tokeniser(expr)
    if(res.length != expected[i].length){
        throw new Error(`token length is incorrect ${res} ${expected[i]}`);
    }
    for (let j = 0; j < res.length; j++) {
        if(res[j]!= expected[i][j]){
            throw new Error(`token ${res[j]} isn't equal to ${expected[i][j]}`)
        }
        
    }
    console.log(`Tokeniser Test ${i+1} passed: ${res}`)
  })
} catch (e) {
    console.log(e)
}

try {
  let input = [
    [],
    ['('],
    [')'],
    ['(','(',')','(']
    [1],
    [-1, "*", "(", 3, ")"],
    [3, "*", 4],
    ["(", 1, "+", "(", 2, "*", -1, "*", 3, ")", ")"],
  ];
  let expected = [false,false,false,false,true,true,true,true]
  input.forEach((expr,i)=>{
    const res = parser(expr)
    if(res != expected[i]){
        throw new Error(`Result doesn't match expected: ${res} ${expected[i]}`);
    }
    console.log(`Parser test ${i+1} passed: ${res}`)
  })
} catch (e) {
    console.log(e)
}