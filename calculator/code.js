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

        this.debug = debug;

        this.cache = 0;
        this.float = false;
        this.isNewNumber = true;
        this.activeAction = null;

        this.initActions();
        this.clear();
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
        this.activeAction = action;
        this.debug && console.log('handleAction', action);
    }

    change() {

    }

    percent(num) {
        this.float = true;
        this.activeAction = null; 
        this.updateCache((this.cache * num) / 100);
    }

    multiply(num) {
        this.activeAction = null; 
        this.updateCache(this.cache * num);
    }

    divide(num) {
        this.activeAction = null; 
        this.updateCache(this.cache / num);
    }

    dot() {
        this.float = true;
        this.updateValue('.');
    }

    equal() {
        this.result = this.cache;
        this.updateCache('0');
        this.setValue(this.result);      
    }

    plus(num) {
        this.activeAction = null; 
        this.updateCache(this.cache + num);
    }

    minus(num) {
        this.activeAction = null; 
        this.updateCache(this.cache - num);
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

    updateCache(num) {
        const cache = this.float ? parseFloat(num) : parseInt(num, 10);
        
        if (this.activeAction) {
            return this.activeAction(cache);           
        }

        this.cache = cache;        
        this.debug && console.log('updateCache', this.cache);
    }

    setValue(num) {
        document.querySelector('input').value = num;
    }

    clear() {
        this.result = 0;
        this.updateCache('0');
        this.setValue(this.result);
    }
}

(function() {
    new Calculator(true);
})();