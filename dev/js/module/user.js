define(['util', 'config', 'ctrl/weixin'], function(Util, Config, WeiXin) {
    var User = {
        isLogin: false,
        userInfo: null,
        token: '',
        timeout: 0,
        uid: '',
        payRecord: {},
        init: function(callback) {
            var self = this,
                queryData = Util.getQueryData(window.location.search.replace(/^\?/, '')),
                userInfo = localStorage.getItem('USER');

            if (queryData.res == 'clear') {

                localStorage.removeItem('CART');

                history.replaceState(history.state, null, this.getNoCodeHref());
            }

            // callback && callback();
            if (!!queryData.token) {
                this.token = queryData.token;
                this.timeout = Date.now() + 86400000;
                history.replaceState(history.state, null, this.getNoCodeHref());
                this.getUser(function(){
                    callback&&callback();
                    window.location.reload();
                });
            } else {
                this.checkUser(callback);
            }
            // if (!!userInfo) {
            //     userInfo = JSON.parse(userInfo);
            //     if (typeof userInfo.token == 'string' && !!userInfo.userId && !!userInfo.expireTime && userInfo.expireTime <= (new Date()).getTime()) {
            //         localStorage.removeItem('USER');
            //     }
            // }
            // if (WeiXin.isWeiXin && !!queryData.code) {
            //     $.ajax({
            //         // url: Config.apiDomain + '/api/user/infoTest',
            //         url: Config.apiDomain + '/api/user/info',
            //         type: 'POST',
            //         contentType: 'application/json;charset=UTF-8',
            //         data: JSON.stringify({
            //             code: queryData.code
            //         }),
            //         dataType: 'json',
            //         success: function(res) {
            //             if (res.errcode == 0) {
            //                 replaceUrl(self.getNoCodeHref());
            //                 self.saveUser(res.detail);
            //                 self.checkUser(callback);
            //             } else {
            //                 setTimeout(function(){
            //                     window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?' +
            //                     'appid=' + WeiXin.appId +
            //                     '&redirect_uri=' + encodeURIComponent(self.getNoCodeHref()) +
            //                     '&response_type=code' +
            //                     '&scope=snsapi_userinfo' +
            //                     '&state=STATE' +
            //                     '&connect_redirect=1' +
            //                     '#wechat_redirect';
            //                 },10);
            //             }
            //         }
            //     });
            // } else {
            //     this.checkUser(callback);
            // }
        },
        getNoCodeHref: function() {
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
        checkUser: function(callback) {
            var user = localStorage.getItem('USER');

            if (!!user) {
                user = JSON.parse(user);
            }

            if (user && user.token && user.timeout > Date.now()) {
                if (user.id) {
                    this.saveUser(user.token, user.timeout, user.id);
                    callback && callback();
                } else {
                    this.token = user.token;
                    this.timeout = user.timeout;
                    this.getUser(callback);
                }
            } else {
                this.removeUser();
                callback && callback();
            }
            // if (WeiXin.isWeiXin && (!userInfo || (!!userInfo && typeof userInfo.user != 'undefined' && userInfo.expireTime <= (new Date()).getTime()))) {
            //     var _new_url = 'https://open.weixin.qq.com/connect/oauth2/authorize?' +
            //      'appid=' + WeiXin.appId +
            //      '&redirect_uri=' + encodeURIComponent(this.getNoCodeHref()) +
            //      '&response_type=code' +
            //      '&scope=snsapi_userinfo' +
            //      '&state=STATE' +
            //      '&connect_redirect=1' +
            //      '#wechat_redirect';
            //     setTimeout(function(){
            //      window.location.href = _new_url;
            //     },10);
            // }else if(userInfo){
            //     this.saveUser(userInfo);
            //     callback && callback();
            // }else{
            // }
        },
        saveUser: function(token, timeout, id) {
            if (!token) {
                return;
            }
            var obj = {
                token: token,
                timeout: timeout || (Date.now() + 86400000),
                id: id
            };
            localStorage.setItem('USER', JSON.stringify(obj));
            this.token = obj.token;
            this.uid = obj.id;
            this.timeout = obj.timeout;
            this.isLogin = true;
            return obj;
        },
        removeUser: function() {
            this.isLogin = false;
            this.userInfo = null;
            this.token = '';
            this.timeout = 0;
            this.uid = '';
            localStorage.removeItem('USER');
        },
        login: function(phone, password, callback) {
            var self = this;
            $.ajax({
                url: Config.apiDomain + '/User/Login',
                type: 'POST',
                data: {
                    phone: phone,
                    password: password
                },
                dataType: 'json',
                success: function(res) {
                    if (res.status == 200 && res.data.token) {
                        self.token = res.data.token;
                        self.timeout = Date.now() + 86400000;
                        self.getUser(function() {
                            callback && callback(res);
                        });
                    } else {
                        callback && callback(res);
                    }
                }
            });
        },
        reg: function(data, callback) {
            $.ajax({
                url: Config.apiDomain + '/User/Register',
                type: 'POST',
                data: data,
                dataType: 'json',
                success: function(res) {
                    callback && callback(res);
                }
            });
        },
        loadData: function(url, data, callback) {
            var self = this;
            $.ajax({
                url: url + '?token=' + this.token,
                type: 'POST',
                data: data,
                dataType: 'json',
                success: function(res) {
                    // if (res.status == 403) {
                    //     self.removeUser();
                    // }
                    callback && callback(res);
                },
                error: function(e) {
                    callback && callback(e);
                }
            });
        },
        getUser: function(callback) {
            var self = this;
            this.loadData(Config.apiDomain + '/Member/getUserCenter', undefined, function(res) {
                if (res.status == 200 && !!res.data && !!res.data.item && res.data.item.length > 0) {
                    self.uid = res.data.item[0].id;
                    self.saveUser(self.token, self.timeout, self.uid);
                }
                callback && callback(res);
            });
        },
        getUID: function(callback) {
            var self = this;
            if (!!this.uid) {
                callback && callback(this.uid);
            }
            this.getUser(function(res) {
                if (data.status == 200 && !!data.data && !!data.data.item && data.data.item.length > 0) {
                    callback && callback(self.uid);
                }
            });
        },
        getAddress: function(callback) {
            this.loadData(Config.apiDomain + '/Member/getUserAddressList', undefined, function(res) {
                if (res.status == 200) {
                    // console.log(res);
                }
                callback && callback(res);
            });
        },
        getDefaultAddress: function(callback) {
            this.loadData(Config.apiDomain + '/Member/getUserDefaultAddress', undefined, function(res) {
                if (res.status == 200) {
                    // console.log(res);
                }
                callback && callback(res);
            });
        },
        getUserName: function(callback) {
            this.loadData(Config.apiDomain + '/Member/getUserName', undefined, function(res) {
                if (res.status == 200) {
                    // console.log(res);
                }
                callback && callback(res);
            });
        },
        getMoney: function(callback) {
            this.loadData(Config.apiDomain + '/Member/getUserMoney', undefined, function(res) {
                if (res.status == 200) {
                    // console.log(res);
                }
                callback && callback(res);
            });
        },
        getPhoto: function(callback) {
            this.loadData(Config.apiDomain + '/Member/getUserPhoto', undefined, function(res) {
                if (res.status == 200) {
                    // console.log(res);
                }
                callback && callback(res);
            });
        },
        getPhone: function(callback) {
            this.loadData(Config.apiDomain + '/Member/getUserPhone', undefined, function(res) {
                if (res.status == 200) {
                    // console.log(res);
                }
                callback && callback(res);
            });
        },
        getMessage: function(callback) {
            this.loadData(Config.apiDomain + '/Member/getUserMessage', undefined, function(res) {
                if (res.status == 200 && !!res.data && !!res.data.item && res.data.item.length > 0) {
                    self.uid = res.data.item[0].id;
                    // console.log(res);
                }
                callback && callback(res);
            });
        },
        getPayRecord: function(page, callback) {
            var obj = {
                    limit: 10,
                    offset: (page || 0) * 10
                },
                key = Util.objToQueryString(obj);
            // if (this.payRecord[key]) {
            //     callback && callback(this.payRecord[key]);
            //     return;
            // }

            this.loadData(Config.apiDomain + '/Member/getUserPayRecord', obj, callback);

        },
        addAddress: function(data, callback) {
            this.loadData(Config.apiDomain + '/Member/addUserAddress', data, callback);
        },
        delAddress: function(id, callback) {
            this.loadData(Config.apiDomain + '/Member/delUserAddress', {
                addressId: id
            }, callback);
        },
        updateAddress: function(data, callback) {
            this.loadData(Config.apiDomain + '/Member/updateUserAddress', data, callback);
        },
        setUserName: function(name, callback) {
            this.loadData(Config.apiDomain + '/Member/setUserName', {
                username: name
            }, callback);
        },
        sendSMS: function(phone, callback) {
            this.loadData(Config.apiDomain + '/Common/sendSMS', {
                phone: phone
            }, callback);
        },
        verifyPhone: function(code,password, callback) {
            this.loadData(Config.apiDomain + '/Common/verifyPhone', {
                code: code,
                password:password
            }, callback);
        },
        verifyPhone2: function(code, callback) {
            this.loadData(Config.apiDomain + '/Common/verifyPhone', {
                code: code,
            }, callback);
        },
        getMyIndiana: function(page, callback) {
            this.loadData(Config.apiDomain + '/Member/getMyIndiana', {
                limit: 10,
                offset: (page || 0) * 10
            }, callback);
        },
        getMyUnderway: function(page, callback) {
            this.loadData(Config.apiDomain + '/Member/getMyUnderway', {
                limit: 10,
                offset: (page || 0) * 10
            }, callback);
        },
        getMyAlreadyAnnounced: function(page, callback) {
            this.loadData(Config.apiDomain + '/Member/getMyAlreadyAnnounced', {
                limit: 10,
                offset: (page || 0) * 10
            }, callback);
        },
        getWinRecord: function(page, callback) {
            this.loadData(Config.apiDomain + '/Member/getMyWinRecord', {
                limit: 10,
                offset: (page || 0) * 10
            }, callback);
        },
        getWinDetail: function(gid, callback) {
            this.loadData(Config.apiDomain + '/Member/showMyWinGoodsStatusMsg', {
                gid: gid
            }, callback);
        },
        addGoodsSendAddr: function(gid, addrId, callback) {
            this.loadData(Config.apiDomain + '/Member/addGoodsSendAddr', {
                gid: gid,
                addressId: addrId
            }, callback);
        },
        updateGoodsSendAddr: function(gid, addrId, callback) {
            this.loadData(Config.apiDomain + '/Member/updateGoodsSendAddr', {
                gid: gid,
                addressId: addrId
            }, callback);
        },
        confirmGetGoods: function(gid, callback) {
            this.loadData(Config.apiDomain + '/Member/confirmGetGoods', {
                gid: gid
            }, callback);
        },
        setShareOrder: function(formData, callback) {
            this.loadData(Config.apiDomain + '/Shareorder/setShareOrder', formData, callback);
        },
        getVerifyImg:function(callback){
            // this.loadData(Config.apiDomain + '/User/verify', {}, callback);

            var self = this;
            $.ajax({
                // url:'http://api2.shaoyangduobao.weizhuanqiandao.com/User/verify',
                url: Config.apiDomain + '/User/verify',
                type: 'POST',
                dataType: 'json',
                success: function(res) {
                    // if (res.status == 403) {
                    //     self.removeUser();
                    // }
                    callback && callback(res);
                },
                error: function(e) {
                    callback && callback(e);
                }
            });
        },
        sendMsgForRegPhone:function(data,callback){
            var self = this;
            $.ajax({
                // url:'http://api2.shaoyangduobao.weizhuanqiandao.com/User/sendMsgForRegPhone',
                url: Config.apiDomain + '/User/sendMsgForRegPhone',
                type: 'POST',
                data:data,
                dataType: 'json',
                success: function(res) {
                    // if (res.status == 403) {
                    //     self.removeUser();
                    // }
                    callback && callback(res);
                },
                error: function(e) {
                    callback && callback(e);
                }
            });
        },
        getUserCoupon:function(type,callback){
            var token = this.token;
            $.ajax({
                //url: Config.apiDomain + '/Coupon/showMyCoupon',
                url: g_apiurl + '/Coupon/showMyCoupon',
                type: 'POST',
                data:{token:token,type:type},
                dataType: 'json',
                success: function(res) {
                    callback(res);
                },
                error: function(e) {
                    callback(e);
                }
            });
        },
        hideMyCoupon: function(cid,callback){
            var token = this.token;
            $.ajax({
                //url: Config.apiDomain + '/Coupon/showMyCoupon',
                url: g_apiurl + '/Coupon/hideMyCoupon',
                type: 'POST',
                data:{token:token,cid:cid},
                dataType: 'json',
                success: function(res) {
                    callback(res);
                },
                error: function(e) {
                    callback(e);
                }
            });
        },
        receiveUsedCoupon: function(aid,callback){
            var token = this.token;
            $.ajax({
                //url: Config.apiDomain + '/Coupon/showMyCoupon',
                url: g_apiurl + '/Coupon/receiveCoupon',
                type: 'POST',
                data:{token:token,aid:aid},
                dataType: 'json',
                success: function(res) {
                    callback(res);
                },
                error: function(e) {
                    callback(e);
                }
            });
        }


    };

    return User;
});