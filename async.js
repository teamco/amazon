//Call timer function that return result after 3 seconds
function countTimer() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('The time is up!');
        }, 3000);
    })
};
    
    //Start Timer
async function startTimer(){
    console.log('Timer activated');
    const result = await countTimer();
    console.log('result');
};
    
startTimer();