define(['util',
    'ui',
    'config',
    'module/user',
    'module/cart',
    'view/common',
    'ctrl/weixin'
], function(Util, UI, Config, ModUser, ModCart, View, WeiXin) {
    var bindings = [{
        element: '#cartList [data-cartremove]',
        event: 'click',
        handler: function(e) {
            var $_this = $(this),
                $_wrap = $_this.closest('.item'),
                $_total = $('[data-fn="cartTotal"]'),
                total = parseInt($_total.text()),
                $_goodsNum = $('[data-fn="cartGoodsNum"]'),
                goodsNum = parseInt($_goodsNum.text()),
                id = $(this).attr('data-cartremove'),
                val = parseInt($_wrap.find('.w-number-input').val());

            ModCart.removeItem($(this).attr('data-cartremove'));

            $_total.html(total - val);

            $_goodsNum.html(goodsNum - 1);

            if(goodsNum - 1 <= 0){
                View.initCart({});
            }
            e.preventDefault();
        }
    },{
        element: '#cartList [data-change]',
        event: 'click',
        handler: function(e) {
            e.preventDefault();
            var $_this = $(this),
                $_wrap = $_this.closest('[data-cartitem]'),
                $_input = $_wrap.find('.w-number-input'),
                id = $_wrap.attr('data-cartitem'),
                num = parseInt($_this.attr('data-change')),
                min = parseInt($_input.attr('data-min')),
                max = parseInt($_input.attr('data-max')),
                val = parseInt($_input.val()) + num;
            if(val < min || val > max){
                return false;
            }

            
            $_input.val(val).attr('data-val',val);

            ModCart.changeItem(id,val);

            Cart.changeVal();
        }
    },{
        element: '#cartList .w-number-input',
        event: 'input',
        handler: function(e) {
            var $_this = $(this),
                id = $_this.closest('[data-cartitem]').attr('data-cartitem'),
                min = parseInt($_this.attr('data-min')),
                max = parseInt($_this.attr('data-max')),
                oldVal = parseInt($_this.attr('data-val'));
                val = parseInt($_this.val());
            if(isNaN(val)){
                val = oldVal;
            }

            if(val < min){
                val = min;
            }else if(val > max){
                val = max;
            }
            $_this.val(val).attr('data-val',val);

            ModCart.changeItem(id,val);
            Cart.changeVal();

        }
    }];

    var Cart = {
        init: function() {

            UI.loading();

            ModCart.getList(function(res){
                if(res.status == 200){
                    View.initCart(res.data);
                    Util.bindEvents(bindings);
                }
                UI.loading(-1);
            });
        },
        changeVal:function(){
            var t = 0;

            $('#cartList .w-number-input').each(function(){
                var n = parseInt($(this).val());
                if(!isNaN(n)){
                    t+=n;
                }
            });
            $('#page-cart [data-fn="cartTotal"]').html(t);
        }

    };

    return Cart;

});