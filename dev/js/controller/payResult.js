define(['util',
    'ui',
    'config',
    'utils/md5',
    'module/user',
    'module/cart',
    'view/common',
    'ctrl/weixin'
], function(Util, UI, Config, MD5, ModUser, ModCart, View, WeiXin) {
    var bindings = [];

    var PayResult = {
        init: function() {

            UI.loading();
            View.initPayResult();
            UI.loading(-1);

        }

    };

    return PayResult;

});