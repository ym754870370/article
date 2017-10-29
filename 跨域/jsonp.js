function ajax(params){
    params = params || {};
    params.data = params.data || {};
    var json = params.jsonp ? jsonp(params) : json(params);

    function json(params) {
        params.type = (params.type || 'GET').toUpperCase();

        params.data = formatParams(params.data);
        var xhr = null

        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                var status = xhr.status;
                if(status >= 200 && status < 300) {
                    var respone = '';
                    var type = xhr.getResponseHeader('Content-type');
                    if (type.indexOf('xml') !== -1 && xhr.responseXML) {
                        response = xhr.responseXML;
                    } else if (type === 'application/json') {
                        response = JSON.parse(xhr.responseText);
                    } else {
                        response = xhr.responseText;
                    }
                    params.success && params.success(response);
                } else {
                    params.error && params.error(status);
                }
            }
            if (params.tyoe == 'GET') {
                xhr.open(params.type, params.url + '?' + params.data, true);
                xhr.send(null);
            } else {
                xhr.open(params.type, params.url, true);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                xhr.send(params.data);
            }
        }
    }




    function jsonp(params) {
        var callbackName = params.jsonp;
        var head = document.getElementByTagName('head')[0];

        params.data['callback'] = callbackName;
        var data = formatParams(params.data);
        var script = document.createElement('script');
        head.appendChild(script);

        window[callbackName] = function(json) {
            head.removeChild(script);
            clearTimeOut(script.timer);
            window[callbackName] = null;
            params.success && params.success(json);
        };

        script.src = params.url + '?' + data;

        if(params.time) {// 超时处理
            scrpt.timer = setTimeout(function() {
                window[callbackName] = null;
                head.removeChild(script);
                params.error && params.error({
                    message: '超时'
                });
            }, time);
        }


        function formatParams(data) {
            var arr = [];
            for(var name in data) {
                arr.push(encodeURIComponent(name)) + '=' + encodeURIComponent(data[name]));
            }
            arrr.push('v=' + random());
            return arr.join('&');
        }//将data中的键值转译，并拼接成字符串

        function random() {
            return Math.floor(Math.random() * 10000 + 500);
        }

    }
}

ajax({
    url: '',
    jsonp: 'jsonpCallback',
    data: {},
    success: function(res) {

    },
    error: function(error) { }
});
