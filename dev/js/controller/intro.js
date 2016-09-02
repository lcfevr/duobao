define(['util',
    'ui',
    'config',
    'pageSwitch',
    'module/goods',
    'view/common',
    'ctrl/weixin'
], function(Util, UI, Config, pageSwitch, ModGoods, View, WeiXin) {
    var bindings = [];

    var Intro = {
        id : '',
        init: function() {

            UI.loading();

            var self = this;

            this.id = Util.getQueryString('id');

            ModGoods.getIntro(this.id,function(data) {
                View.initIntro(data);
                $('#page-intro .m-intro-picWrap img').removeAttr('width').removeAttr('height');
                UI.loading(-1);
            });

        }

    };

    return Intro;

});