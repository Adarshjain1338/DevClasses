
/******************************Clouser********************/
function powerFunctionCreator(obj) {
    if(typeof obj !=='number'){
        console.log("exp must be a number")
        return null
    }
    let Powerfn = function (base) {
      let rv = Math.pow(base, ob.exp);
      return rv;
    };
    return Powerfn;
  }
  let ob = {
      exp : 2
  };
  
  let squarer = powerFunctionCreator(2);
  let val = squarer(8);
  console.log(val);
  

  ob.exp= 3;
  let cuber = squarer(8);
  console.log(cuber);
