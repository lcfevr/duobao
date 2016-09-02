define(['util',
    'ui',
    'config',
    'pageSwitch',
    'module/goods',
    'view/common',
    'ctrl/weixin'
], function(Util, UI, Config, pageSwitch, ModGoods, View, WeiXin) {

    var Static = {
        init: function(page) {

            UI.loading();

            switch(page){
                case 'help':
                    View.initHelp();
                    break;
                case 'agreement':
                    View.initAgreement();
                    break;
                case 'qa':
                    View.initQA();
                    break;
                case 'guide':
                    View.initGuide();
                    break;
            }
            UI.loading(-1);

        }

    };

    return Static;

});