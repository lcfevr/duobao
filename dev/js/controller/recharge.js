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
        element: '#page-recharge .m-pay-moneySelector-item',
        event: 'click',
        handler: function(e) {
            e.preventDefault();
            if ($(this).hasClass('m-pay-moneySelector-item-selected')) {
                return false;
            }
            $('#page-recharge .m-pay-moneySelector-item').removeClass('m-pay-moneySelector-item-selected');
            $(this).addClass('m-pay-moneySelector-item-selected');
        }
    }, {
        element: '#page-recharge .m-pay-moneySelector-item [name="data"]',
        event: 'input',
        handler: function(e) {
            var $_this = $(this),
                val = $(this).val(),
                $_closest = $_this.closest('.m-pay-moneySelector-item'),
                oldVal = $_closest.attr('data-val');
            if($.trim(val) == ''){
                oldVal = '';
            }else if (!isNaN(val) || val == '') {
                oldVal = parseFloat(val);
            }
            $_this.val(oldVal);
            $_closest.attr('data-val', oldVal);
        }
    }, {
        element: '#rechargeBtn',
        event: 'click',
        handler: function(e) {
            e.preventDefault();
            if ($(this).hasClass('w-button-disabled')) {
                return false;
            }
            var val = $('#page-recharge .m-pay-moneySelector-item-selected').attr('data-val');

            if(isNaN(val)){
                UI.alert('请输入正确金额');
                return false;
            }

            $.ajax({
                url: Config.apiDomain + '/Order/createOrder?token=' + ModUser.token,
                type: 'POST',
                data: {
                    type: 'recharge',
                    data: val
                },
                dataType: 'json',
                success: function(res) {
                    if (res.status == 200) {
                        window.location.href = Config.apiDomain + '/Pay/showPayPage?token=' + ModUser.token + '&order=' + res.data.order;
                    }
                },
                error: function(e) {
                    console.log(e);
                }
            });
        }
    }];

    var Recharge = {
        init: function() {

            UI.loading();
            if (!ModUser.isLogin) {
                replaceUrl('?c=login&r=' + encodeURIComponent(window.location.search));
                UI.loading(-1);
            } else {
                View.initRecharge();
                Util.bindEvents(bindings);
                UI.loading(-1);
            }

        }

    };

    return Recharge;

});