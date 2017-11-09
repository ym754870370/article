var thousandBitSeparator = function(numStr){
     var b = /([-+]?\d{3})(?=\d)/g;
     return numStr.replace(b, function(j, k){
         return k + ',';
     });
 }
thousandBitSeparator('2132131231231');




function comma(num) {
    var source = String(num).split(".");//按小数点分成2部分
        source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)','ig'),"$1,");//只将整数部分进行都好分割
    return source.join(".");//再将小数部分合并进来
}
comma(-123456.789);//-123,456.789
