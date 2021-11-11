function echoWithArr<T>(arg: T[]): T[] {
    console.log(arg.length)
    return arg;
} 

const arrs = echoWithArr([1, '2', 3])