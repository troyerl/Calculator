function appendInput(value) {
    let inputValue = $(".input").val();
    let newValue;
    if(inputValue === "0") {
        newValue = value;
    } else {
        newValue = inputValue + value;
    }
    $(".input").val(newValue);
}

function calculate(input) {
    let placeholder = $(".input").attr("placeholder");
    if (placeholder === 'Error') {
        $(".input").attr("placeholder", " ");
    }
    let result;
    try {
        let infix = input.split(" ");
        
        while(!infix[infix.length - 1]){
            infix.pop();
        }

        const calculator = new Calculator(infix);
        calculator.infixToPostfix();
        result = calculator.evalPostfix();

    } catch(err) {
        $(".input").attr("placeholder", err);
    }
    
    $(".input-history").text(input + " =");
    $(".input").val(result);
}

$(document).ready(function(){
    $(".form").submit(function(e){
        e.preventDefault();
        let infix = $(".input").val();
        calculate(infix);
    });

    $(".number").click(function(e) {
        appendInput(e.target.value);
    });

    $(".operator").click(function(e) {
        appendInput(" " + e.target.value + " ");
    });

    $('.clear').click(function(e) {
        $(".input").val(0);
    });
});