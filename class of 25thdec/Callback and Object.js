/* In this exercise,
 we are creating a fucntion which gives a prime and nonprime numbers from an array .
 then we create a file in which we are passing a prime numbers and in other we are sending a non prime numbers
  > using fs module 
  > using protoype of array.
*/

// requiring fs module.
const fs = require("fs");
//a function which gives prime and non prime number and without editing in orginal array.
function primeSieve(phandler, nphandler){
    let oarr = this; // we catch the orginal array .
    phandler.calledForTheFirstTime = true;// this helps in checking file existence.
    nphandler.calledForTheFirstTime = true;// this helps in checking file existence.
    for(let i = 0; i < oarr.length; i++){   // Loop in which we are getting a oarray
        let num = oarr[i];// getting values one by one.
// checking prime or not prime
        let isPrime = true;
        for (let div = 2; div * div <= num; div++) {
            if (num % div == 0) {
                isPrime = false;
                break;
            }
        }
        // if it is prime then it sending in other function.
        if(isPrime == true){
            phandler(num);
        }
        // if it is prime then it sending in other function.
        else{
            nphandler(num);
        }

    }
}
// from below part of code we creating a prototype of that funciton.
Array.prototype.seive = primeSieve;

// example array.
let arr = [2, 5, 7, 37, 48, 473, 81, 88, 14];
// calling the array with prototype function with it param and param is also a funciton here
arr.seive(logAllPrimes, logAllNonPrimes)
//a function who create a file of prime number and checking if file exists then it will delete that file.
function logAllPrimes(num) {
    if (logAllPrimes.calledForTheFirstTime == true) { // 
        if (fs.existsSync("primes.txt")) {// checcking file existing . if exists then removing it .
            fs.rmSync("primes.txt");
        }
        logAllPrimes.calledForTheFirstTime = false;
    }

    fs.appendFileSync("primes.txt", num + "->", "utf-8");// adding numbers in created file . here i.e prime.txt
}
//a function who create a file of non prime number and checking if file exists then it will delete that file.
function logAllNonPrimes(num) {
    if (logAllNonPrimes.calledForTheFirstTime == true) {
        if (fs.existsSync("non-primes.txt")) {// checcking file existing . if exists then removing it .
            fs.rmSync("non-primes.txt");
        }
        logAllNonPrimes.calledForTheFirstTime = false;
    }
    fs.appendFileSync("non-primes.txt", num + "->", "utf-8");// adding numbers in created file . here i.e non-prime.txt
}
