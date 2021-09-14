class Calculator {

    constructor(debug) {        
        this.debug = debug;
        this.input = document.querySelector('.result');
        this.condition = document.querySelector('.condition');

        this.math = {
            '×': '*',
            '÷': '/',
            '−': '-',
            '+': '+',
            '%': (a, b) => (b * 100 / a)
        }

        this.initActions();
    }


    initActions() {
        const btns = document.querySelectorAll('li');
        btns.forEach(btn => {
            btn.addEventListener('click', e => {
                e.preventDefault();

                if (btn.innerText === 'C') {
                    return this.clean();
                }

                this.updateValue(btn);

                if (btn.innerText === '=') {
                    this.calculate();
                }
                
                this.debug && console.log(btn.innerText);
            });
        });
    }

    updateValue(entity) {
        if (this.input.innerText === '0') {
            this.input.innerText = '';
        }
        this.input.innerText += entity.innerText;
    }

    calculate() {
        let value = this.input.innerText;
        this.debug && console.log('Before change', value);  
        
        Object.keys(this.math).forEach(math => {
            const replaceTo = this.math[math]; 
            if (math === '+') {            
                math = '\\+';
            }
            
            if (typeof replaceTo === 'function') {
                debugger
            }
            const regexp = new RegExp(math, 'g');
            value = value.replace(regexp, replaceTo);        
        });

        this.debug && console.log('After change', value);

        try {
            const result = eval(value.replace(/=/, ''));
            this.debug && console.info(result);
            this.condition.innerText = this.input.innerText + '?';
            this.input.innerText = result;

        } catch(e) {
            console.warn(e);
            this.input.innerText = 'NaN';
        }
    }

    clean() {
        this.input.innerText = '0';
        this.condition.innerText = '';
    }
}

(function() {
    new Calculator(true);
})();