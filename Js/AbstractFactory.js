class ExprCommandFactory {
    createNumCommand(num) {}
    createAddCommand() {}
    createSubCommand() {}
    createModCommand() {}
    createMultCommand() {}
    createDivCommand() {}
}

class StackExprCommandFactory extends ExprCommandFactory {
    constructor(stack) {
        super();
        this.stack = stack;
    }

    createNumCommand(num) {
        return new NumCommand(this.stack, num);
    }

    createAddCommand() {
        return new AddCommand(this.stack);
    }

    createSubCommand() {
        return new SubCommand(this.stack);
    }

    createModCommand() {
        return new ModCommand(this.stack);
    }

    createMultCommand() {
        return new MultCommand(this.stack);
    }

    createDivCommand() {
        return new DivCommand(this.stack);
    }
}

