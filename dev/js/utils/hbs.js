define(['hbs', 'util'], function(HBS, Util) {
    function isEmpty(val) {
        var x = false;
        switch (typeof val) {
            case 'string':
                x = val == '';
                break;

            case 'object':
                if (val instanceof Array) {
                    x = val.length == 0;
                } else if (val == null) {
                    x = true;
                } else {
                    x = Object.keys(val).length == 0;
                }
                break;

            case 'undefined':
                x = true;
                break;

            default:
                x = false;
        }
        return x;
    }

    // 相等
    HBS.registerHelper('eq', function(a, b, options) {
        a = isNaN(a) ? a : parseFloat(a);
        b = isNaN(b) ? b : parseFloat(b);
        if (a == b) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    // 不相等
    HBS.registerHelper('neq', function(a, b, options) {
        a = isNaN(a) ? a : parseFloat(a);
        b = isNaN(b) ? b : parseFloat(b);
        if (a != b) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    // 大于
    HBS.registerHelper('gt', function(a, b, options) {
        a = isNaN(a) ? a : parseFloat(a);
        b = isNaN(b) ? b : parseFloat(b);
        if (a > b) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
    // 小于
    HBS.registerHelper('lt', function(a, b, options) {
        a = isNaN(a) ? a : parseFloat(a);
        b = isNaN(b) ? b : parseFloat(b);
        if (a < b) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    // 大于等于
    HBS.registerHelper('egt', function(a, b, options) {
        a = isNaN(a) ? a : parseFloat(a);
        b = isNaN(b) ? b : parseFloat(b);
        if (a >= b) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
    // 小于
    HBS.registerHelper('elt', function(a, b, options) {
        a = isNaN(a) ? a : parseFloat(a);
        b = isNaN(b) ? b : parseFloat(b);
        if (a <= b) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    // 不为空
    HBS.registerHelper('nempty', function(n, options) {
        if (!isEmpty(n)) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    // 为空
    HBS.registerHelper('empty', function(n, options) {
        if (isEmpty(n)) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    // 加
    HBS.registerHelper('add', function(a, b, options) {
        if (!isNaN(a) && !isNaN(b)) {
            return options.fn({
                val: parseFloat(a) + parseFloat(b)
            });
        } else {
            return options.fn({
                val: a + b
            });
        }
    });
    // 减
    HBS.registerHelper('subtract', function(a, b, options) {
        return options.fn({
            val: a - b
        });
    });
    // 乘
    HBS.registerHelper('multiply', function(a, b, options) {
        return options.fn({
            val: a * b
        });
    });
    // 除
    HBS.registerHelper('divide', function(a, b, options) {
        return options.fn({
            val: a / b
        });
    });
    // 百分比
    HBS.registerHelper('percent', function(a, b, options) {
        return options.fn({
            val: a / b * 100
        });
    });
    // 百分比
    HBS.registerHelper('npercent', function(a, b, options) {
        return options.fn({
            val: (b- a) / b * 100
        });
    });
    // toFixed
    HBS.registerHelper('toFixed', function(number, n, options) {
        return options.fn({
            val: number.toFixed(parseInt(n))
        });
    });
    // toInt
    HBS.registerHelper('toInt', function(number, options) {
        return options.fn({
            val: parseInt(number)
        });
    });

    HBS.registerHelper('list', function(items, options) {
        var out = "";
        for (var k in items) {
            out = out + options.fn(items[k]);
        }

        return out;
    });

    HBS.registerHelper('listSearchKey', function(items, key, options) {
        var out = "";

        for (var k in items) {
            if (key == k) {
                out = out + options.fn(items[k]);
            } else {
                out = out + options.inverse(items[k]);
            }
        }

        return out;
    });

    HBS.registerHelper('objItem', function(items, k, options) {
        if (typeof items == 'object' && item instanceof Array) {
            k = parseInt(k);
        }
        return options.fn({
            val: items[k]
        });
    });

    HBS.registerHelper('arrValueList', function(items, options) {
        var out = "";
        for (var i = 0, l = items.length; i < l; i++) {
            out = out + options.fn({
                'val': items[i]
            });
        }

        return out;
    });

    HBS.registerHelper('arrFirstItem', function(items, options) {
        return options.fn({
            'val': items[0]
        });
    });

    HBS.registerHelper('bannerPrice', function(price, options) {
        var p = price.split('.'),
            str = '';
        str += '<strong>' + p[0] + '</strong>';
        str += '.' + (p[1] || '00');

        return str;
    });

    HBS.registerHelper('replace', function(str, a, b, options) {
        var r = new RegExp(a, 'gi');
        return str.replace(r, b);
    });

    HBS.registerHelper('encode', function(str, options) {
        return encodeURIComponent(str);
    });

    HBS.registerHelper('decode', function(str, options) {
        return decodeURIComponent(str);
    });

    HBS.registerHelper('dateFormat', function(str, formatStr, options) {
        if (!isNaN(str) && (str = parseInt(str), str.toString().length < 13)) {
            str *= 1000;
        }
        return (new Date(str)).format(formatStr);
    });

    HBS.registerHelper('provincesList', function(items,provinceId, options) {
        var out = "";
        if(!!provinceId){
            out += '<option value="" disabled>请选择</option>';
        }else{
            out += '<option value="" disabled selected>请选择</option>';
        }
        for (var k in items) {
            out += '<option disabled>' + k + '</option>';
            for (var i = 0, len = items[k].length; i < len; i++) {
                if(!!provinceId && provinceId == items[k][i][0]){
                    out += '<option value="' + items[k][i][0] + '" selected>' + items[k][i][1] + '</option>';
                }else{
                    out += '<option value="' + items[k][i][0] + '">' + items[k][i][1] + '</option>';
                }
            };
        }

        return out;
    });

    HBS.registerHelper('citiesList', function(items,cityId, options) {
        var out = "";
        if(!!cityId || (items && items.length==1)){
            out += '<option value="" disabled>请选择</option>';
        }else{
            out += '<option value="" disabled selected>请选择</option>';
        }
        if(items && items.length > 0){
            if(items.length == 1){
                    out += '<option value="' + items[0][0] + '" selected>' + items[0][1] + '</option>';
            }else{
                for (var i = 0, len = items.length; i < len; i++) {
                    if(!!cityId && cityId == items[i][0]){
                        out += '<option value="' + items[i][0] + '" selected>' + items[i][1] + '</option>';
                    }else{
                        out += '<option value="' + items[i][0] + '">' + items[i][1] + '</option>';
                    }
                };
            }
        }

        return out;
    });

    HBS.registerHelper('winInfo', function(status, options) {

        if (!!status && status != "afterDelivery") {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    return HBS;
});