Function.prototype.myapply = function(){
    let orgfn = this;// we catch the calling function using this keyword by js 
    let orgargs = Array.from(arguments);// catched the arguments passed in the "called function i.e fun1()"
    let newthis = orgargs[0]; // we catch the new obj from arguments. and now this is our "new override_this"
    let newargs = orgargs[1];// new arguments from idx=1 . we saved all the passing arguments 

    newthis.fun1 = orgfn;
    newthis.fun1(...newargs);
    delete newthis.fun1;
}

let obj = {
    fun1: function(friend1, friend2){
        console.log("This man is called " + this.fullName + ". His age is " + this.age);
        console.log(this.fullName + " says hi to "+ friend1 )
        console.log(this.fullName + " says hi to "+ friend2);
        console.log(arguments)
    },
    fun2: function(){
        console.log("This man is called " + obj.fullName + ". His age is " + obj.age);
    },
    fullName: "Sumeet Malik",
    age: 34
};
let o2 = {
    fullName : "Adarsh",
    age : 20
}
obj.fun1.myapply(o2, ["Maithili", "Devansh", "Bunny"]);



