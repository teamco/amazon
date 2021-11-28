class Fibonacci {
  constructor(limit = 1) {  
    this.store = [0];
    this.limit = limit;  
    this.iterate();  
    this.get();
  }

  iterate() {
    for(let i=0; i<this.limit;i ++) {
      if (i >= this.limit) {
        // TODO (teamco): Do nothing.
        break;
      }

      const _left = this.store[i-2];
      if (typeof _left === 'undefined') {
        this.store.push(1);
      } else {          
        this.store.push(this.store[i] + this.store[i-1]);
      }       
    }   
  }

  get() {
    return this.store[this.limit - 1]
  }
}
