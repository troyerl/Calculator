class Calculator {
    constructor(infix) {
        this.infix = infix;
        this.postfixArray = [];
        this.result = [];
        this.factory = new StackExprCommandFactory(this.result);
        this.parenthStack = [];
    }

    infixToPostfix() {
        this.postfixArray = [];
        let cmd;
        let temp = [];
        let top;
        let numCheck = 0;

        for (let i = 0; i < this.infix.length; i++) {
            switch(this.infix[i]) {
                case "+":
                    cmd = this.factory.createAddCommand();
                    break;
                case "-":
                    cmd = this.factory.createSubCommand();
                    break;
                case "*":
                    cmd = this.factory.createMultCommand();
                    break;
                case "/":
                    cmd = this.factory.createDivCommand();
                    break;
                case "%":
                    cmd = this.factory.createModCommand();
                    break;
                case "(":
                    if(numCheck > 0) {
                        temp.push(this.factory.createMultCommand());
                    }
                    this.parenthStack.push(0);
                    numCheck--;
                    continue;
                case ")":
                    let loopCount = this.parenthStack.pop();
                    let tempItem;

                    for(let i = 0; i < loopCount; i++){
                        tempItem = temp.pop();
                        this.postfixArray.push(tempItem);
                        loopCount--;
                    }

                    numCheck--;
                    continue;
                case " ":
                    continue;
                default:
                    let num = parseFloat(this.infix[i]);
                    cmd = this.factory.createNumCommand(num);
                    this.postfixArray.push(cmd);
                    numCheck++;
                    continue;
            }

            numCheck--;

            if(temp.length < 1) {
                temp.push(cmd);

                if(this.parenthStack.length > 0) {
                    let counter = this.parenthStack.pop();
                    this.parenthStack.push(counter += 1);
                }
            } else {
                top = temp[temp.length - 1];

                if (top.getRank() > cmd.getRank()) {
                    temp.push(cmd);

                    if(this.parenthStack.length > 0) {
                        let counter = this.parenthStack.pop();
                        this.parenthStack.push(counter += 1);
                    }

                } else if (top.getRank() <= cmd.getRank()) {
                    temp.pop();
                    this.postfixArray.push(top);
                    temp.push(cmd);
                    
                }
            }
        }

        while(temp.length > 0) {
           this.postfixArray.push(temp.pop());
        }
    };

    evalPostfix() {
        if (this.parenthStack.length > 0) {
            throw "Error";
        }

        for(let i = 0; i < this.postfixArray.length; i++) {
            this.postfixArray[i].execute();
        }
        
        console.log(this.result.length);

        if(this.result.length !== 1) {
            throw "Error";
        } else {
            return this.result.pop();
        }
    };

}