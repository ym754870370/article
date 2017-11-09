var thousandBitSeparator = function(numStr){
     var b = /([-+]?\d{3})(?=\d)/g;
     return numStr.replace(b, function(j, k){
         return k + ',';
     });
 }
thousandBitSeparator('2132131231231');
