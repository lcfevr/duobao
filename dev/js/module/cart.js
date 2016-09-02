define(['util', 'config', 'ctrl/weixin','module/user','ui'], function(Util, Config, WeiXin,User,Ui) {
    // {
    //     id: 123,
    //     num: 234
    // }
    var Cart = {

        cart: [],
        cartObj: {},
        idList: [],
        init: function() {

            var queryData = Util.getQueryData(window.location.search.replace(/^\?/, ''));

            if(queryData.res == 'clear'){
                
                localStorage.removeItem('CART');
                delete queryData.res;

                var su = Util.objToQueryString(queryData),
                    se = (su == '' ? '' : '?' + su);

                history.replaceState(history.state, null, se);
            
            }

            var cart = localStorage.getItem('CART');

            if (cart) {

                this.saveCart(JSON.parse(cart));

            }

        },
        add: function(id, num, total) {
            if(isNaN(num)){
                return false;
            }
            if (this.cartObj[id]) {
                this.cartObj[id].number += parseInt(num);
            } else {
                this.cartObj[id] = {
                    id: id,
                    number: parseInt(num),
                    total: parseInt(total)
                }
            }

            if (this.cartObj[id].number <= 0) {
                delete this.cartObj[id];
            }

            this.objSave();

            return this.cart.length;
        },
        removeItem: function(id) {
            delete this.cartObj[id];
            this.objSave();
        },
        changeItem: function(id, num) {
            if(isNaN(num)){
                return false;
            }
            if (!this.cartObj[id]) {
                this.add(id, num);
            } else {
                this.cartObj[id].number = num;
                this.objSave();
            }
        },
        objSave: function() {
            this.cart = Util.objToArr(this.cartObj);
            this.saveCart();
        },
        saveCart: function(arr) {
            if (typeof arr == 'object' && (arr instanceof Array)) {
                this.cart = arr;
                this.cartObj = Util.arrToObj(this.cart, 'id');
            }

            this.idList = [];

            for (var i = 0, len = this.cart.length; i < len; i++) {
                this.idList.push(this.cart[i].id);
            };
            //默认10夺宝币
            var cart = localStorage.getItem('CART');
            if(!cart)
                cart = '[]';
            var cart_json = Util.arrToObj(JSON.parse(cart), 'id');
            for (var i = 0; i < this.cart.length; i++) {
                if(!cart_json[this.cart[i].id] && this.cart[i].total>=50){
                    this.cart[i].number = 10;
                }
            }
            localStorage.setItem('CART', JSON.stringify(this.cart));
        },
        clear:function(){
            this.saveCart([]);
        },
        getCartNum:function(){
            return this.cart.length;
        },
        getCoupon:function(items,callback){
            var sids = [],
                nums = [];
            $.each(items,function(m,n){
                sids.push(n.sid);
                nums.push(n.number);
            });
            $.ajax({
                url: Config.apiDomain + '/Coupon/getCoupon?token='+User.token,
                type: 'POST',
                data: {
                    sids: sids.join(','),
                    nums: nums.join(',')
                },
                dataType: 'json',
                success: function(res) {
                    callback && callback(res.data);
                }
            });
        },
        getList: function(callback) {
            if (this.idList.length == 0) {
                callback && callback({
                    "status": 200,
                    "msg": "",
                    "data": {}
                });
                return;
            }
            var self = this;
            $.ajax({
                url: Config.apiDomain + '/Cart/listCart?token='+User.token,
                type: 'POST',
                data: {
                    idstr: this.idList.join(',')
                },
                dataType: 'json',
                success: function(res) {
                    if (res.status == 200) {
                        if (res.data && res.data.item) {
                            self.formatList(res.data);
                        }else{
                            self.clear();
                        }
                        callback && callback(res);
                    }else if(res.status == 401){
                        Ui.alert(res.msg,function(){
                            self.clear();
                            res.status=200;
                            callback && callback(res);
                        });
                    }
                }
            });
        },
        formatList: function(data) {

            var arr = data.item,
                list = [],
                obj = {},
                total = 0,
                goodsNum = 0;
            for (var i = 0; i < arr.length; i++) {
                obj = {
                    id: arr[i].id,
                    number: Math.min(this.cartObj[arr[i].id].number, arr[i].limit),
                    total:arr[i].totalNeed
                };
                
                arr[i].number = obj.number;
                
                total += obj.number;
                
                goodsNum++;

                list.push(obj);
            };
            data.total = total;
            data.goodsNum = goodsNum;
            this.saveCart(list);
        },
        freeBuy: function(id,callback) {
            if (!User.isLogin) {
                replaceUrl('?c=login&r=' + encodeURIComponent(window.location.search));
                Ui.loading(-1);
            }else {
                $.ajax({
                    url: Config.apiDomain + '/Pay/freePay?token='+User.token,
                    type: 'POST',
                    data: {
                        good_id: id
                    },
                    dataType: 'json',
                    success: function(res) {
                        callback && callback(res);
                        /*if (res.status == 200) {
                         if (res.data && res.data.item) {
                         self.formatList(res.data);
                         }else{
                         self.clear();
                         }
                         callback && callback(res);
                         }else if(res.status == 401){
                         Ui.alert(res.msg,function(){
                         self.clear();
                         res.status=200;
                         callback && callback(res);
                         });
                         }*/
                    }
                });
            }
        }

    };

    return Cart;
});