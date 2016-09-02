define([
    'util',
    'ui',
    'config',
    'module/user',
    'view/common'
], function(Util, UI, Config, ModUser, View) {
    var bindings = [{
        element: 'a.coupon_allowed_give',
        event: 'click',
        handler: function(e) {
            $(".cdk-container").addClass("dn");
            $("#coupon_allowed").removeClass("dn");
            $("#coupon_allowed .cdk-show").removeClass("dn");
        }
    },{
        element: 'a.hideCoupon',
        event: 'click',
        handler: function(e) {
            var cid = $(this).attr('data-id');
            Coupon.hideMyCoupon(cid);
        }
    },{
        element: 'a.coupon_allowed_receive',
        event: 'click',
        handler: function(e) {
            var aid = $(this).attr('data-id');
            Coupon.receiveUsedCoupon(aid);
        }
    }];

    var Coupon = {
        loading: false,
        init: function(bool) {
            UI.loading();

            ModUser.getUserCoupon('1',function(data) {
                View.initCoupon({
                    unused: data.data.unused,
                    used: data.data.used,
                    allowed: data.data.allowed,
                    total:data.data.unused.item.length,
                    allowedTotal:data.data.allowed.item.length
                });
                Util.bindEvents(bindings);
                if(bool){
                    $("a.coupon_allowed_give").click();
                }
                UI.loading(-1);
            });


        },
        receiveUsedCoupon: function(aid){
            ModUser.receiveUsedCoupon(aid,function(data) {
                if(data && data.status==200){
                    UI.cdkAlert(data.msg);
                    $("#allowed_"+aid).addClass('dn');
                }else{
                    UI.cdkAlert("领取失败，请重新操作");
                }
            });
        },
        hideMyCoupon: function(cid){
            ModUser.hideMyCoupon(cid,function(data) {
                if(data && data.status==200){
                    $("#coupon_"+cid).addClass('dn');
                }else{
                    UI.cdkAlert("删除失败，请重新操作");
                }
            });
        }

    };

    return Coupon;

});