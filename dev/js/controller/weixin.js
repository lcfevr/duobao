define(['util', 'ui', 'config'], function(Util, UI, Config) {
    var WeiXin = {
        appId: '',
        isWeixin: "micromessenger" == window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i),
        pcWeixin: "windowswechat" == window.navigator.userAgent.toLowerCase().match(/WindowsWechat/i),
        shareTip: function(tipText) {
            tipText = tipText || '点击右上角分享给朋友↑';
            if ($('#shareTip').length > 0) {
                $('#shareTip').show();
            } else {
                $('body').append('<section id="shareTip" class="mask">' + tipText + '</section>');
            }
        },
        shareConf: {
            title: "邵阳夺宝",
            desc: "邵阳夺宝!",
            link: (function(){
                return window.location.origin + window.location.pathname;
                // var search = Util.getQueryData(window.location.search),
                //     href = window.location.origin + window.location.pathname;
                // delete search.code;
                // delete search.state;
                // delete search.from;
                // delete search.isappinstalled;
                // delete search.token;
                // delete search.res;
                // search = Util.objToQueryString(search);

                // return href + (search == '' ? '' : '?' + search);

            })(),
            imgUrl: "http://front.weizhuanqiandao.com/images/logo.png",
            success: function() {
                $('#shareTip').remove();
            },
            cancel: function() {}
        },
        getShareUrl:function(){
            var search = Util.getQueryData(window.location.search),
                href = window.location.origin + window.location.pathname;
            delete search.code;
            delete search.state;
            delete search.from;
            delete search.isappinstalled;
            delete search.token;
            delete search.res;
            search = Util.objToQueryString(search);

            return href + (search == '' ? '' : '?' + search);
        },
        location: null,
        locationStr: '',
        init: function(callback) {
            if (!this.isWeixin) {
                callback && callback();
                return false;
            }
            var self = this,
                //XHR = new XMLHttpRequest,
                conf = self.conf,
                setings = "onMenuShareTimeline onMenuShareAppMessage onMenuShareQQ onMenuShareWeibo onMenuShareQZone startRecord stopRecord onVoiceRecordEnd playVoice pauseVoice stopVoice onVoicePlayEnd uploadVoice downloadVoice chooseImage previewImage uploadImage downloadImage translateVoice getNetworkType openLocation getLocation hideOptionMenu showOptionMenu hideMenuItems showMenuItems hideAllNonBaseMenuItem showAllNonBaseMenuItem closeWindow scanQRCode chooseWXPay openProductSpecificView addCard chooseCard openCard";
            $.ajax({
                url: Config.apiDomain + '/Weixin/getSignPackage',
                type: 'POST',
                dataType: 'json',
                data: {
                    url: encodeURIComponent(location.href.replace(/#.*$/, ""))
                },
                success: function(json) {
                    if (json.status == 200) {
                        var f = json.data.signature;
                        self.appId = f.appId;
                        wx.config({
                            debug: !1,
                            appId: f.appId,
                            timestamp: parseInt(f.timestamp),
                            nonceStr: f.nonceStr,
                            signature: f.signature,
                            jsApiList: setings.split(" ")
                        });
                        wx.ready(function() {
                            // self.updateShare();
                            // callback && callback();
                            self.getShareConfig(callback);
                        });
                        wx.error(function(res) {
                            // alert("微信验证失败\n" + JSON.stringify(res));
                            callback && callback();
                        });
                    } else {
                        // alert("获取签名信息返回错误\n" + json.errmsg);
                        callback && callback();
                    }
                },
                error: function(res) {
                    // alert("获取签名信息失败\n" + JSON.stringify(res));
                    callback && callback();
                }
            });
        },
        getShareConfig:function(callback){
            var self = this;
            $.ajax({
                url: Config.apiDomain + '/Common/shareInterface',
                type: 'POST',
                dataType: 'json',
                data: {
                    url: encodeURIComponent(location.href.replace(/#.*$/, ""))
                },
                success: function(json) {
                    if (json.status == 200) {
                        self.shareConf.title = json.data.shareTitle;
                        self.shareConf.desc = json.data.shareName;
                        self.shareConf.imgUrl = json.data.shareImg;
                    }
                    self.updateShare();
                    callback && callback();
                },
                error: function(res) {
                    self.updateShare();
                    callback && callback();
                }
            });
        },
        updateShare: function(conf) {
            var setings = "onMenuShareTimeline onMenuShareAppMessage onMenuShareQQ onMenuShareWeibo onMenuShareQZone",
                thisConf = this.shareConf,
                obj = {},
                conf = conf || {};
            for (var k in thisConf) {
                if (conf.hasOwnProperty(k)) {
                    obj[k] = conf[k];
                } else {
                    obj[k] = thisConf[k];
                }
            }
            setings.split(" ").forEach(function(e) {
                if(e == 'onMenuShareTimeline'){
                    wx[e]({
                        title: obj['title'], // 分享标题
                        link: obj['link'], // 分享链接
                        imgUrl: obj['imgUrl'], // 分享图标
                        fun_name: 'onMenuShareTimeline', // 分享图标
                        success: obj['success'],
                        cancel: obj['cancel']
                    });
                } else {
                    obj['fun_name'] = '';
                    wx[e](obj);
                }
            });
        },
        previewImage: function(current, urls) {
            wx.previewImage({
                current: current, // 当前显示图片的http链接
                urls: urls // 需要预览的图片http链接列表
            });
        },
        timer: null,
        getLocation: function() {
            var self = this;

            wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function(res) {
                    // var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    // var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    // var speed = res.speed; // 速度，以米/每秒计
                    // var accuracy = res.accuracy; // 位置精度
                    if (res.errMsg == 'getLocation:ok') {
                        self.location = res;
                        self.locationStr = '' + res.latitude + ',' + res.longitude + ',' + res.speed + ',' + res.accuracy;
                    }
                }
            });
            // setTimeout(function() {
            //     self.getLocation();
            // }, 5000);
        },
        chooseWXPay: function(data, callback) {
            wx.chooseWXPay({
                appId: data.appId,
                timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
                package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: data.paySign, // 支付签名
                success: function(res) {
                    callback && callback(res);
                }
            });
        }

    };

    return WeiXin;
});