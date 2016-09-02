define(['util',
    'ui',
    'config',
    'module/user',
    'view/common',
    'ctrl/weixin'
], function(Util, UI, Config, ModUser, View, WeiXin) {

    var Reg_1 = {
        init: function() {

            UI.loading();

            var data = {"img_reg":g_focus_qr};
            View.initReg_1(data);
            UI.loading(-1);


        }
    };

    return Reg_1;

});