const a = {a: [1, 2, 3], b: [1,7,10,20],c: [6,10,23], d: 10};
const unwind1 = function(obj, key) {
  const length = obj[key].length;
  const arr = [];
  for(let i = 0; i < length; i++) {
    const params = {...obj};
    params[key] = obj[key][i];
    arr.push(params);
  }

  return arr;
}

const a = {a: [1, 2, 3], b: 1};
const unwind = function(obj, keys) {
  let i = 1;
  let arr = unwind1(obj, keys[1]);

  while(i < keys.length) {
    let li = [];
    arr.forEach(v => {
      li.push(unwind1(v, keys[i]));
    })

    // 将数组平铺
    arr = li.reduce((arr1, arr2) => {
      return arr1.concat(arr2);
    })
    i = i + 1;
  }
  return arr;
}
unwind(a, ['a', 'b', 'c']);
