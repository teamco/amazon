class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }
  
  class Stack {
      constructor(){
          this.first = null;
          this.last = null;
          this.size = 0;
      }
  
      push(value){
          const newNode = new Node(val);
          //if stack is empty
          if (!this.first) {
            this.first = newNode;
            this.last = newNode;
            // add current first pointer to new first(new node), and make new node new first
          } else {
            newNode.next = this.first;
            this.first = newNode;
          }
          //add 1 to size
          this.size++;
  
          return this;
      }
      pop(){
          //if stack is empty return false
          if (this.size === 0) return false;
          //get poppednode
          const poppedNode = this.first;
          //get new first (could be NULL if stack is length 1)
          const newFirst = this.first.next;
          //if newFirst is null, reassign last to newFirst(null)
          if (!newFirst) {
              this.last = newFirst;
          }
          //assign new first
          this.first = newFirst;
          //remove reference to list
          poppedNode.next = null;
          //remove 1 from size
          this.size--;
          //return poppednode
          return poppedNode;
          }
      log(){
             let currentNode = this.first
             let i = 0;
             while(currentNode){
                 console.log(i, currentNode.value)
                 i++;
                 currentNode = currentNode.next
             }
          }
  }
  
  const studentStack = new Stack; 
  studentStack.push({"Willow Rosenberg": "A"});
  studentStack.log();
  //[{ "Willow Rosenberg": "A" }]
  
  studentStack.push({"Xander Harris": "C"});
  //[{ "Willow Rosenberg": "A" }, { "Xander Harris": "C" }]
  studentStack.log();
  
  studentStack.push({"Cordelia Chase": "B+"});
  studentStack.log();
  //[{ "Willow Rosenberg": "A" },{ "Xander Harris": "C" },{ "Cordelia Chase": "B+" }]
  
  studentStack.push({"Buffy Summers": "B"});
  studentStack.log();
  //[{ "Willow Rosenberg": "A" },{ "Xander Harris": "C" },{ "Cordelia Chase": "B+" },{ "Buffy Summers": "B" }]
  
  
  const firstOut = studentStack.pop();
  // { "Buffy Summers": "B" }
  studentStack.log();
  //[{ "Willow Rosenberg": "A" },{ "Xander Harris": "C" },{ "Cordelia Chase": "B+" }]
  
  const secondOut = studentStack.pop();
  //{"Cordelia Chase": "B+"}
  studentStack.log();
  //[{ "Willow Rosenberg": "A" }, { "Xander Harris": "C" }]