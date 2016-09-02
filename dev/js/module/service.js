/**
 * Created by Sherry on 2016/8/25.
 */
define(['util','config'], function(Util, Config) {
    var Service = {
            get: function(url,callback) {
                $.ajax({
                    url: url,
                    type: 'get',
                    dataType: 'json',
                    success: function(res) {
                        callback && callback(res);
                    },
                    error: function(e) {
                        callback && callback(e);
                    }
                });
            },
    };

    return Service;
});