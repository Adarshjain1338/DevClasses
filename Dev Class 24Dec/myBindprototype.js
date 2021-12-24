Function.prototype.myBind = function () {
    let orgfn = this;// we catch the calling function using this keyword by js 
    let orgargs = Array.from(arguments);// catched the arguments passed in the "called function i.e fun1()"
    let newthis = orgargs[0]; // we catch the new obj from arguments. and now this is our "new override_this"
    let newargs = orgargs.slice(1);// new arguments from idx=1 . we saved all the passing arguments 
    // now we created a function who will call the myBindfn
    let myfun = function () {
        let moreparams = Array.from(arguments);//let say we passed more arguments then ;;;; then we saved in to arguments and make it like a array.
        let totalparms = newargs.concat(moreparams);//we have passed arguments in bindfunction i.e("maithili"..)and more arguments i.e(sanu, ...);
        // so we have to save those arguments after that too .
        orgfn.apply(newthis, totalparms);// then we are just calling that orginal function using newthis and total params 
    }
    return myfun;

}
let obj = {
    fun1: function (friend1, friend2) {
        console.log("This man is called " + this.fullName + ". His age is " + this.age);
        console.log(this.fullName + " says hi to " + friend1)
        console.log(this.fullName + " says hi to " + friend2);
        console.log(arguments)
    },
    fun2: function () {
        console.log("This man is called " + obj.fullName + ". His age is " + obj.age);
    },
    fullName: "Sumeet Malik",
    age: 34
};
let o2 = {
    fullName: "Adarsh",
    age: 20
}
let Boundfunction = obj.fun1.myBind(o2, "Maithili", "devansh", "bunny");
Boundfunction("sanu", "pihu");



