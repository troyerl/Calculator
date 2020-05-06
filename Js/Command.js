class Command {
    constructor() { }

    execute() {}
};

class NumCommand extends Command {
    constructor(stack, num) {
        super();
        this.num = num;
        this.stack = stack;
    }

    execute() {
        this.stack.push(this.num);
    }
}

class BinaryOperation extends Command {
    constructor(stack) {
        super();
        this.stack = stack;
    }

    evaluate(num1, num2) {}

    execute() {
        let n2 = this.stack.pop();
        let n1 = this.stack.pop();

        let result = this.evaluate(n1, n2);
        this.stack.push(result);
    }
}

class AddCommand extends BinaryOperation {

    constructor(stack) {
        super(stack);
        this.rank = 2;
    }

    evaluate(num1, num2) {
        return num1 + num2;
    }

    getRank() {
        return this.rank;
    }

}

class SubCommand extends BinaryOperation {
    constructor(stack) {
        super(stack);
        this.rank = 2;
    }

    evaluate(num1, num2) {
        return num1 - num2;
    }

    getRank() {
        return this.rank;
    }
}

class DivCommand extends BinaryOperation {
    constructor(stack) {
        super(stack);
        this.rank = 1;
    }

    evaluate(num1, num2) {
        if(num2 === 0 ) {
            throw "Error";
        } else {
            return num1 / num2;
        }
    }

    getRank() {
        return this.rank;
    }
}

class MultCommand extends BinaryOperation {
    constructor(stack) {
        super(stack);
        this.rank = 1;
    }

    evaluate(num1, num2) {
        return num1 * num2;
    }

    getRank() {
        return this.rank;
    }
}

class ModCommand extends BinaryOperation {
    constructor(stack) {
        super(stack);
        this.rank = 1;
    }

    evaluate(num1, num2) {
        if(num2 === 0) {
            throw "Error";
        } else {
            return num1 % num2;
        }
    }

    getRank() {
        return this.rank;
    }
}
