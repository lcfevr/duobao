define(['util',
    'ui',
    'config',
    'utils/md5',
    'module/user',
    'module/cart',
    'view/common',
    'ctrl/weixin'
], function(Util, UI, Config, MD5, ModUser, ModCart, View, WeiXin) {
    var bindings = [{
        element: '#payForm .w-checkBar',
        event: 'click',
        handler: function(e) {
            e.preventDefault();
            if ($(this).hasClass('w-checkBar-checked') || $(this).hasClass('w-checkBar-disabled')) {
                return false;
            }
            $('#payForm .w-radioBar').removeClass('w-radioBar-checked');
            $('input[name="paytype"]', this).prop('checked', true);
            $(this).addClass('w-checkBar-checked');
        }
    }, {
        element: '#payForm .w-radioBar',
        event: 'click',
        handler: function(e) {
            e.preventDefault();
            if ($(this).hasClass('w-radioBar-checked')) {
                return false;
            }
            $('#payForm .w-checkBar').removeClass('w-checkBar-checked');
            $('#payForm .w-radioBar').removeClass('w-radioBar-checked');
            $(this).addClass('w-radioBar-checked');
            $('input[name="paytype"]', this).prop('checked', true);
        }
    }, {
        element: '.w-couponBar',
        event: 'click',
        handler: function(e) {
            e.preventDefault();
            if ($(this).hasClass('w-checkBar-checked')) {
                $(this).removeClass('w-checkBar-checked');
                $('input', this).removeAttr("checked");
                return false;
            }
            var coupon_id = $('input', this).attr("value");
            var coupon_sid = $('input', this).attr("sid");
            $(".w-"+coupon_id).removeClass('w-checkBar-checked');
            $("input[value='"+coupon_id+"']").removeAttr("checked");
            $(".w-"+coupon_sid).removeClass('w-checkBar-checked');
            $("input[sid='"+coupon_sid+"']").removeAttr("checked");

            $(this).addClass('w-checkBar-checked');
            $('input', this).attr("checked","checked");
        }
    }, {
        element: '#payForm',
        event: 'submit',
        handler: function(e) {
            e.preventDefault();
            var from = $('#couponForm').serializeArray();
            var coupon_ids = [];
            $.each(from,function(m,n){
                if(n.name == 'coupon[]')
                    coupon_ids.push(n.value);
            });
            Pay.submitOrder($('#payForm input[name="paytype"]:checked').val(),coupon_ids.join(","));
        }
    }];

    var Pay = {
        init: function() {

            UI.loading();
            if (!ModUser.isLogin) {
                replaceUrl('?c=login&r=' + encodeURIComponent(window.location.search));
                UI.loading(-1);
            } else if (!WeiXin.isWeixin) {
                UI.alert('本页面需在微信环境下使用~');
                hisBack();
                UI.loading(-1);
            } else {

                ModCart.getList(function(res) {
                    if (res.status == 200 && res.data && res.data.item && res.data.item.length > 0) {

                        ModCart.getCoupon(res.data.item,function(data){

                            $.each(res.data.item,function(m,n){
                                res.data.item[m].coupon = [];
                                $.each(data.item,function(i,j){
                                    if(n.sid == j.s_id){
                                        res.data.item[m].coupon.push(j);
                                    }
                                })
                            })
                        });

                        ModUser.getMoney(function(data) {
                            if (data) {
                                res.data.money = parseFloat(data.data.money);
                                View.initPay(res.data);
                                setTimeout(function() {
                                    Util.bindEvents(bindings);
                                },1000);
                            }
                        });
                    } else {
                        replaceUrl('?c=cart');
                    }
                    UI.loading(-1);
                });
            }

        },
        submitOrder: function(type,coupon_ids) {
            var self = this;
            $.ajax({
                url: Config.apiDomain + '/Order/createOrder?token=' + ModUser.token,
                type: 'POST',
                data: {
                    type: type,
                    data: JSON.stringify(ModCart.cart),
                    coupon_ids: coupon_ids
                },
                dataType: 'json',
                success: function(res) {
                    if (res.status == 200) {
                        self.pay(res.data)
                    }
                },
                error: function(e) {
                    console.log(e);
                }
            });

        },
        pay: function(data) {
            window.location.href = Config.apiDomain + '/Pay/showPayPage?token=' + ModUser.token + '&order=' + data.order;
        }

    };

    return Pay;

});