class Calculator {

    constructor(debug) {
        this.actions = {
            'C': this.clear,
            '+/-': this.change,
            '%': this.percent,
            'X': this.multiply,
            '/': this.divide,
            '-': this.minus,
            '+': this.plus,
            '=': this.equal,
            '.': this.dot
        }

        // this.priority = ['multiply', 'divide'];

        this.debug = debug;

        this.clear();
        this.initActions();
    }

    resetDefaults() {
        this.result = 0;
        this.cache = [];
        this.float = false;
        this.prevAction = null;
        this.isNewNumber = true;
    }

    initActions() {
        const btns = document.querySelectorAll('li');
        btns.forEach(btn => {
            btn.addEventListener('click', e => {
                e.preventDefault();
                const action = this.actions[btn.innerText];
                if (action) {
                    return this.handleAction.call(this, action);
                }

                this.updateValue(btn.innerText);
                this.isNewNumber = false;
            });
        });
    }

    handleAction(action) {
        this.isNewNumber = true;
        if (action.name === 'equal') {
            return this.equal();
        }
        if (action.name === 'clear') {
            return this.clear();
        }  
        if (action.name === 'dot') {
            this.isNewNumber = false;
            return this.dot();
        }  
        if (action.name === 'change') {
            this.isNewNumber = false;
            return this.change();
        }        
        this.updateCache(action);
        this.debug && console.log('handleAction', action);
    }

    change() {
        if (this.isNewNumber) {
            return false;
        }
        const num = this.cache[this.cache.length - 1];
        this.cache[this.cache.length - 1] = num * -1;
        this.setValue(this.cache[this.cache.length - 1]);
    }

    percent(num1, num2) {
        this.float = true;
        this.updateResult((num1 * num2) / 100);
    }

    multiply(num1, num2) {
        this.updateResult(num1 * num2);
    }

    divide(num1, num2) {
        this.updateResult(num1 / num2);
    }

    plus(num1, num2) {
        this.updateResult(num1 + num2);
    }

    minus(num1, num2) {
        this.updateResult(num1 - num2);
    }

    dot() {
        this.float = true;
        this.updateValue('.');
    }

    equal() {
        this.calculate();
        this.result = 0;     
    }

    updateValue(num) {
        const input = document.querySelector('input');
        if (input.value === '0' || this.isNewNumber) {
            this.updateCache(num);
            return this.setValue(num);
        }
        input.value += num;
        this.updateCache(input.value);
    }

    updateResult(num) {
        this.result = num;
        this.setValue(num);
    }

    calculate() {
        if (this.prevAction && typeof this.prevAction.fn === 'function') {
            const num1 = this.result || this.cache[this.prevAction.idx - 1];
            const num2 = this.cache[this.cache.length - 1];       
            if (isNaN(num1) || isNaN(num2)) {
                console.warn('Invalid Math operation');
                return this.clear('NaN');
            }
            this.prevAction.fn.call(this, num1, num2);
            this.prevAction = null;
        } 
    }

    updateCache(entity) {
        if (typeof entity === 'function') {
            this.calculate();
            this.prevAction = {fn: entity, idx: this.cache.length};
        }
        const cache = typeof entity === 'function' ? 
            entity : 
            this.float ? parseFloat(entity) : parseInt(entity, 10);
        this.cache.push(cache); 

        this.debug && console.log('updateCache', this.cache);
    }

    setValue(num) {
        document.querySelector('input').value = num;
    }

    clear(num = 0) {
        this.resetDefaults();
        this.setValue(num);
    }
}

(function() {
    new Calculator(true);
})();