const addNumbers = (...args)=>{
    let sum=0;
    args.forEach((arg)=>(sum += arg ));
    return sum;
};

console.log(addNumbers(1,2,3,4,5,6));