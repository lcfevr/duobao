define([], function() {

    Date.prototype.format = function(format) {
        var o = {
            "M+": this.getMonth() + 1, //month 
            "d+": this.getDate(), //day 
            "h+": this.getHours(), //hour 
            "m+": this.getMinutes(), //minute 
            "s+": this.getSeconds(), //second 
            "q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
            "S": this.getMilliseconds() //millisecond 
        }

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    };

    Date.prototype.addDays = function(addDays) {
        return new Date(this.getFullYear(), this.getMonth(), this.getDate() + addDays);
    };

    var util = {

        /**
         * 验证是否Emai
         * @param  {String}  str 需要验证的字符串
         * @return {Boolean}     是否Email：true|false
         */
        isEmail: function(str) {
            var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
            return reg.test(str);
        },

        /**
         * 验证对象类型是否为空（无键值）
         * @param  {Object}  obj 验证的对象类型
         * @return {Boolean}     是否为空：true|false
         */
        isEmpty: function(obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    return false;
                }
            }

            return true;
        },

        isUrl: function(str) {
            var regStr = '^((https|http|ftp|rtsp|mms)?://)?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-z_!~*\'()-]+.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].[a-z]{2,6})(:[0-9]{1,4})?((/?)|(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$';
            var reg = new RegExp(regStr);

            return reg.test(str);
        },
        isPhone: function(str) {
            return /^1[3|4|5|7|8]\d{9}$/.test(str);
        },

        /**
         * 获取字符串长度
         * @param  {String} str 需要计算的字符串
         * @return {Number}     字符串字节数
         */
        getCharLength: function(str) {
            var iLength = 0;
            for (var i = 0; i < str.length; i++) {
                if (str.charCodeAt(i) > 255) {
                    iLength += 2;
                } else {
                    iLength += 1;
                }
            }
            return iLength;
        },

        /**
         * 克隆对象
         * @param  {Object} obj 需要克隆的对象
         * @return {Object}     克隆后对象
         */
        clone: function(obj) {
            var o;
            switch (typeof obj) {
                case 'undefined':
                    break;
                case 'string':
                    o = obj + '';
                    break;
                case 'number':
                    o = obj - 0;
                    break;
                case 'boolean':
                    o = obj;
                    break;
                case 'object':
                    if (obj === null) {
                        o = null;
                    } else {
                        if (obj instanceof Array) {
                            o = [];
                            for (var i = 0, len = obj.length; i < len; i++) {
                                o.push(this.clone(obj[i]));
                            }
                        } else {
                            o = {};
                            for (var k in obj) {
                                o[k] = this.clone(obj[k]);
                            }
                        }
                    }
                    break;
                default:
                    o = obj;
                    break;
            }
            return o;
        },

        /**
         * 绑定Dom事件
         * @param  {Array} bindings 绑定的多个事件
         * @return {undefined}          无返回
         */
        bindEvents: function(bindings) {
            for (var i in bindings) {
                if (bindings[i].selector) {
                    $(bindings[i].element).on(bindings[i].event, bindings[i].selector, bindings[i].handler);
                } else {
                    $(bindings[i].element)
                        .on(bindings[i].event, bindings[i].handler);
                }
            }
        },

        /**
         * 解除绑定Dom事件
         * @param  {Array} bindings 绑定的多个事件
         * @return {undefined}          无返回
         */
        unBindEvents: function(bindings) {
            for (var i in bindings) {
                if (bindings[i].selector) {
                    $(bindings[i].element)
                        .off(bindings[i].event, bindings[i].selector, bindings[i].handler);
                } else {
                    $(bindings[i].element)
                        .off(bindings[i].event, bindings[i].handler);
                }
            }
        },

        /**
         * 获取图片file的base64
         * @param  {Element}   target   file表单
         * @param  {Function}  callback 获取后回调
         * @return {undefined}          无返回值
         */
        previewImg: function(target, callback) {
            var reader = new FileReader();
            var file = target.files[0];

            reader.onload = callback;

            reader.readAsDataURL(file);
        },

        /**
         * 根据传入的query字符串返回键值对形式的对象
         * @param {String} queryString query字符串
         * @return {KeyValueObject}
         */
        getQueryData: function(queryString) {

            /* 去掉字符串前面的"?"，并把&amp;转换为& */
            queryString = queryString.replace(/^\?+/, '').replace(/&amp;/, '&');
            var querys = queryString.split('&'),
                i = querys.length,
                _URLParms = {};

            while (i--) {
                item = querys[i].split('=');
                if (item[0]) {
                    var value = item[1] || '';
                    try {
                        value = decodeURIComponent(value);
                    } catch (e) {
                        value = unescape(value);
                    }
                    _URLParms[decodeURIComponent(item[0])] = value;
                }
            }
            return _URLParms;
        },

        /**
         * 获取当前页面或者指定DOM对象的URL中的指定的GET参数的值
         * @param {String} key 要获取的GET参数的键
         * @param {DOM} el 如此传递此参数，则获取这个DOM对象的url，如果不传则获取当前页面的url
         * @return {String|null}
         */
        getQueryString: function(key, el) {
            var parms,
                queryString = el ? this.getElSearchString(el) : window.location.search.substring(1);

            parms = this.getQueryData(queryString);
            return (key in parms) ? parms[key] : null;
        },

        /**
         * 获取指定DOM对象的链接地址的queryString
         * @param {DOM} el 要获取参数的DOM对象
         * @return {String}
         */
        getElSearchString: function(el) {
            /* 在某些Android下获取不到el.search的值，要使用自定义方法从url中截取 */
            var el = $(el).get(0),
                searchString = el.search || '';
            if (!searchString) {
                var hrefString = ('FORM' == el.nodeName ? el.getAttribute('action') : el.getAttribute('href')),
                    pos = hrefString.indexOf('?');
                if (-1 !== pos) {
                    searchString = hrefString.slice(pos);
                }
            }
            return searchString;
        },

        /**
         * 设置指定DOM对象或者页面的URL中的指定的GET参数的值
         * @param {DOM} el 设置这个DOM对象的url
         * @param {Object} data 要设置的GET参数，以键值对的方式提供
         */
        setQueryString: function(el, data) {
            var el = $(el),
                elTag = el.get(0),
                elSearch = elTag.search,
                _searchString = elSearch || '',
                _key,
                _value;
            /* 非<A>对象没有search属性 */
            if (!elSearch) {
                var hrefString,
                    nodeName = elTag.nodeName;
                if ('FORM' == nodeName) {
                    if ('post' == elTag['method'].toLowerCase()) {
                        hrefString = el.attr('action') || (location + ''); /* 如果action为空则取当前页面的url */
                    } else {
                        /* 如果使用GET方式提交的表单，要把GET参数以HIDDEN表单字段的方式附加到表单中去 */
                        for (_key in data) {
                            _value = data[_key];
                            var inputEl = $('input[name="' + _key + '"]', el);
                            if (inputEl) {
                                inputEl.val(_value);
                            } else {
                                el.append($('<input type="hidden" name="' + _key + '" value="' + _value + '" />'));
                            }
                        }
                        return;
                    }
                } else {
                    hrefString = el.attr('href') || (location + ''); /* 如果href为空则取当前页面的url */
                }
                var startPos = hrefString.indexOf('?'),
                    endPos = hrefString.indexOf('#');
                if (-1 == endPos) endPos = hrefString.length;
                if (startPos < 0 || startPos > endPos) {
                    _searchString = '';
                    startPos = endPos; /* 用于下面设置searchString */
                } else {
                    _searchString = hrefString.slice(startPos + 1, endPos);
                }
            }

            var URLParms = this.getQueryData(_searchString),
                /* 获取对象原有的GET参数 */
                _result = [];

            /* 把新参数和对象原有的GET参数合并 */
            for (_key in data) {
                URLParms[_key] = data[_key];
            }

            for (_key in URLParms) {
                _value = URLParms[_key];
                _result.push(_key + (_value ? ('=' + encodeURIComponent(_value)) : ''));
            }
            if (_result.length < 1) return;

            var newSearchString = '?' + _result.join('&');

            if (elSearch) {
                elTag.search = newSearchString;
            } else {
                var attri = ('FORM' == nodeName) ? 'action' : 'href';
                el.attr(attri, hrefString.slice(0, startPos) + newSearchString + hrefString.slice(endPos));
            }
        },

        /**
         * 参数对象转为查询字符串片段
         */
        objToQueryString: function(obj) {
            var result = [],
                key, value, i;
            for (key in obj) {
                value = obj[key];
                if (value instanceof Array) {
                    for (i = value.length; i--;) {
                        result.push(key + '[]=' + encodeURIComponent(value[i]));
                    }
                } else {
                    result.push(key + ('' === value ? '' : ('=' + encodeURIComponent(value))));
                }
            }
            return result.join('&');
        },

        getImgBox: function(uri) {
            var obj = {};
            obj.w = /w=(\d+)/.exec(uri) && RegExp.$1;
            obj.h = /h=(\d+)/.exec(uri) && RegExp.$1;
            return obj;
        },

        arrToObj: function(arr, key) {
            if (typeof arr == 'object' && (arr instanceof Array)) {
                var obj = {};
                for (var i = 0, len = arr.length; i < len; i++) {
                    if (!!arr[i] && arr[i][key]) {
                        obj[arr[i][key]] = arr[i];
                    }
                };
                return obj;
            }
            return null;
        },
        objToArr:function(obj){
            var arr = [];
            for (var k in obj) {
                if(obj.hasOwnProperty(k)){
                    arr.push(obj[k]);
                }
            };
            return arr;
        }

    };

    return util;
});