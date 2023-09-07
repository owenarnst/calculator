const precedence = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2
}

export const infix_to_postfix = (arr) => {
    const output = [], opStack = [];
    arr.forEach(element => {
        if(precedence[element]) {
            if(opStack.length == 0) {
                opStack.unshift(element);
            }
            else {
                while(precedence[opStack[0]] >= precedence[element]) {
                    output.push(opStack.shift());
                }
                opStack.unshift(element);
            }
        }
        else {
            output.push(element);
        }
    });
    return output.concat(opStack);
}

export const evaluate = (operator, operand2, operand1) => {
    switch(operator) {
        case("+"):
            return operand1 + operand2;
        case("-"):
            return operand1 - operand2;
        case("*"):
            return operand1 * operand2;
        case("/"):
            return operand1 / operand2;
        default:
            return "error";
    }
}

export const postfix_to_answer = (postfix) => {
    const stack = [];
    postfix.forEach(element => {
        if (precedence[element]) {
            stack.push(evaluate(element, stack.pop(), stack.pop()));
        }
        else {
            stack.push(parseFloat(element));
        }
    });
    return stack[0];
}