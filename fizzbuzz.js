class FizzBuzz {
    constructor(min, max) {
        this.min = min;
        this.max = max;

        this.count = 0;
        this.iterator();
    }

    isInt(num, _to) {
        return num % _to === 0;
    }

    isFizz(num) {
        num = this.isInt(num, 3) ? 'fizz' : num;
        return num;
    }

    isBuzz(num) {
        num = this.isInt(num, 5) ? 'buzz' : num;
        return num;
    }

    isFizzBuzz(num) {
        const buzz = this.isBuzz(num);
        const fizz = this.isFizz(num);
        
        if (typeof buzz === 'string' && typeof fizz === 'string') {
            return `${fizz}${buzz}`;
        } else if (typeof buzz === 'string') {
            return buzz;    
        } else if (typeof fizz === 'string') {
            return fizz;    
        } else {
            return num;
        }
    }

    iterator() {
        for (let i = this.min; i <= this.max; i += 3) {
            if (i - 1 >= 0) {            
                console.log(this.isFizzBuzz(i - 1));
                console.log(this.isFizzBuzz(i));
                console.log(this.isFizzBuzz(i + 1));
                this.count += 1;
            } else if (i < 3) {
                console.log(i);
                console.log(i + 1);
                this.count += 1;
            }
        } 
        
        console.log('Total', this.count);
    }
}

const fz = new FizzBuzz(0, 100);