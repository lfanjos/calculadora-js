class CalcController {

    constructor(){
        this._display = document.querySelector("#display");
        this._operation = [];
        this._history = [];
        this._availableOperators = ["÷", "X", "-", "+", "%", "√", "x²"];

        this.initialize();

    }

    initialize(){
        this.initButtons();

    }

    initButtons(){
        let buttons = document.querySelectorAll(".btn");

        buttons.forEach(button => {
            button.addEventListener("click", e=>{
                this.execButton(button);
                this.updateDisplay(this.findLastNumber());
                console.log(this._operation, this._history);
            })
        })
    }

    findLastNumber() {

        for (let i = this._operation.length; i >= 0; i--) {

            if (!isNaN(this._operation[i])) {

                return this._operation[i];

            }

        }
        return "0";
    }

    updateDisplay(value){

        this._display.innerHTML = value;

    }

    calc() {

        let expression = this._operation.join("");

        if (expression.includes("X")){
            expression = expression.replace("X", "*");
        }
        
        if (expression.includes("÷")){
            expression = expression.replace("÷", "/");
        }

        let result = eval(expression);

        this._history.push(...this._operation);
        this._operation = [result];


    }

    execButton(button){

        if (button.innerHTML === ",") {

            if (this.findLastNumber().includes(".")) return;

            if (this.checkLastOperation() === "number") return this._operation[this._operation.length - 1] += ".";

            if (this.checkLastOperation() === "operator" || this.checkLastOperation() === undefined) return this._operation.push("0.");

            
        }

        if (button.innerHTML === "←") {
            this._operation[this._operation.length - 1] = this._operation[this._operation.length - 1].slice(0, -1);
            if (this._operation[this._operation.length - 1].length == 0) this._operation.pop();
            this.updateDisplay(this.findLastNumber());
            return;
        }

        if (button.innerHTML === "C") {

            this._operation = [];
            this.updateDisplay(this.findLastNumber());

        }

        if (button.innerHTML === "CE") {

            this._operation.pop();
            this.updateDisplay(this.findLastNumber());
            return;

        }

        if (button.innerHTML === "%") {

            if(!this.validadeExpressionLength()) return;

            this._operation[this._operation.length - 1] /= 100;
            this.calc();
            return;

        }

        if (button.innerHTML === "=") {

            if (this._operation.length == 1) this._operation.push(
                this._history[this._history.length - 2],
                this._history[this._history.length - 1]
                );

            return this.calc();

        }

        if (button.classList.contains("btn-number")){

            if (this.checkLastOperation() == undefined || this.checkLastOperation() == "operator") return this._operation.push(button.innerHTML);

            return this._operation[this._operation.length - 1] += button.innerHTML;

        }

        if (button.classList.contains("btn-others")){

            if (this._operation.length == 0) return;

            if (this._operation.length == 3) {

                this.calc();
                this._operation.push(button.innerHTML);

            }

            if (this._availableOperators.indexOf( this._operation[this._operation.length - 1] ) > -1 ) {
                
                return this._operation[this._operation.length - 1] = button.innerHTML;
            }

            return this._operation.push(button.innerHTML);

        }

    }

    validadeExpressionLength() {
        return this._operation.length == 3;
    }

    checkLastOperation(){

        if(this._operation.length === 0) return undefined;

        if (this._availableOperators.indexOf(this._operation[this._operation.length - 1]) > -1) return "operator";

        return "number";

    }


}