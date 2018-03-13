// ajax
// jsonp
(function() {
    var Ajs = function() {
        return new Ajs.prototype.init()
    }
    Ajs.prototype = {
        init: function() {
            return this
        },
        ajax: function(opt) {
            var opt = opt || {}
            if (!opt.url) return
            url = opt.url
            type = opt.type || 'get'
            jsonp = opt.jsonp || 'callback'
            timeout = opt.timeout || '3000'

            if (window.XMLHttpRequest) {
                var xml = new XMLHttpRequest()
            } else {
                var xml = new ActiveXObject('Microsoft.XMLHTTP')
            }

            switch (type.toLowerCase()) {
                case 'get':
                    xml.open('get', url, true)
                    xml.send()
                    break
                case 'post':
                    xml.open('post', url, true)
                    xml.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
                    xml.send()
                    break
                case 'jsonp':
                    var script = document.createElement('script')
                    script.setAttribute('type', 'text/javascript')
                    var cbFuncName = "jsonp_cb" + Math.random().toString().replace(".", '');
                    window[cbFuncName] = callback;
                    queryString += 'callback=' + cbFuncName;
                    script.setAttribute('src', url + queryString)
                    document.querySelector('head').appendChild(script)
            }
            xml.onreadystechange = function() {
                if (xml.readyState === 4) {
                    if (xml.status === 200) {
                        console.log('ok')
                    } else {
                        console.log('err')
                    }
                }
            }
        },
        jsonp: function() {

        }
    }
    Ajs.prototype.init.prototype = Ajs.prototype;

    window.Ajs = Ajs
})()