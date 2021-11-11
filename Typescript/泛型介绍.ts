
    
    
    interface Itest {
        a: string,
        b: number,
        c: number,
    }
    function setTest1<T extends Itest>(arg: T) {
        return arg.a;
    }
    // function setTest1(arg: Itest) {
    //     return arg.d;
    // }
    let string = '1';
    let number = 1;

    function setTest2<T>(arg: T): T {
        return arg;
    }

    

    function test() {
        this.setTest1({a: '1', b: 2, c: 3, d: 5,f: 11});

        number = this.setTest2(2)
    }
    