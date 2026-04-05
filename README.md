#  Calculator

A project to help me understand how programming language calculate math expressions:

The program reads an expression and calculates the result through tokenising > parsing through the tokens > evaluate the result.

------------------------------------------------------------------------

## 🚀 Features

-   Converting an expression to into tokens
-   Detecting numbers,operators parantheses 
-   Checking the expression is valid
-   Simple **command-line interface**

Example:

Input "(1 + (2 * -3))"
Tokeniser process converts the expression to ["(", 1, "+", "(", 2, "*", -1, "*", 3, ")", ")"]
The parser returns true as the expresssion is valid
Evaluate return -5

------------------------------------------------------------------------

## 📂 Project Structure

    .
    ├── script.js      # Entry point of the program
    ├── test.py        # Unit Testing for each part of the process
 

### script.js

Responsible for:

-   Handling command-line arguments
-   Calling the tokeniser, parser & evaluate functions
-   Displaying results

### test.js

Contains the testing to ensure the functions are working correctly:

------------------------------------------------------------------------

## 🛠 Requirements

-   Node.js

------------------------------------------------------------------------

## ▶️ Usage

Run the program from the command line and pass the path to a text file:

    node script.js "Math expression goes here" ....

Example:

    node script.js "1 * (2 + 0)"

If no expression is provided, the program will show:

    Error: Please enter more arguments when calling the script usage:
    node script.js "Math Expression...

------------------------------------------------------------------------

## 📈 Future Improvements

Planned features for future development:

    -   Allow frontend interaction and get the expression from the frontend.
    -   Decimal numbers
    -   Rearrange functionality of the process for further learning such as:
        1.  Numbers and operators are collected at the token stage then do the logic between unary and binary for numbers when parsing.
        2.  The use of AST instead of RPN.

------------------------------------------------------------------------

## 🧠 Learning Goals

This project is intended as a learning exercise for:

-   Expression handling
-   How Programming language understand the difference between unary and binary
-   How to evaluate precende

------------------------------------------------------------------------
## 📜 License

This project is open-source and free to use for learning purposes.