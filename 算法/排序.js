var swap = function(index1, index2) {
  var arr2 = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = arr2;
}

// 快排
var quickSort = function(arr) {
  if(arr.length <= 1) {
    return arr;
  }

  const mid = Math.floor(arr.length/2);

  const midValue = arr.splice(mid, 1)[0];
  const right = [];
  const left = [];

  for(let i = 0; i < arr.length; i++) {
    if(arr[i] >= midValue) {
      right.push(arr[i])
    } else {
      left.push(arr[i])
    }
  }

  return quickSort(left).concat([midValue], quickSort(right));
}

// 归并
var merge = function(array) {
  var arr = chaifen(array);
  return arr;
}

var chaifen = function(arr) {
  if(arr.length <= 1) {
    return arr;
  }

  const index = Math.floor(array.length/2);
  const left = arr.slice(0, index);
  const right = arr.slice(index, arr.length);

  return paixu(chaifen(left), chaifen(right));
}

var paixu = function(left, right) {
  let i = 0;
  let j = 0;
  const arr = [];

  while(i < left.length && j < right.length) {
    if(left[i] > right[j]) {
      arr.push(right[j++])
    } else {
      arr.push(left[i++])
    }
  }

  while(i < left.length) {
    arr.push(left[i++])
  }

  while(j < right.length) {
    arr.push(right[j++]);
  }

  return arr;
}


// 深拷贝

const deepClone = function(copyObj, obj = {}) {
  for(key in copyObj) {
    if(typeof copyObj[KEY] === 'object') {
      obj[key] = (copyObj[key].constructor === Array) ? [] : {};
      deepClone(copyObj[key], obj[key])
    } else {
      obj[key] = copyObj[key]
    }
  }
}