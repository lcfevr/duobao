define(['util',
    'ui',
    'config',
    'utils/md5',
    'module/goods',
    'view/common',
    'ctrl/weixin'
], function(Util, UI, Config, MD5, ModGoods, View, WeiXin) {
    var bindings = [{
        element: '#page-calculation .m-calc-A-unfoldBtn',
        event: 'click',
        handler: function(e) {
            $(this).hide();
            $('#page-calculation .m-calc-A-foldBtn, #page-calculation .m-calc-list').show();
        }
    },{
        element: '#page-calculation .m-calc-A-foldBtn',
        event: 'click',
        handler: function(e) {
            $(this).hide();
            $('#page-calculation .m-calc-list').hide();
            $('#page-calculation .m-calc-A-unfoldBtn').show();
        }
    }];

    var Calculation = {
        init: function() {

            UI.loading();
            var id = Util.getQueryString('id');
            if(!id){
                hisBack();
                UI.loading(-1);
                return;
            }

            ModGoods.getCheckCalculateDetail(id,function(data){
                View.initCalculation(data);
                Util.bindEvents(bindings);
            });

            UI.loading(-1);

        }

    };

    return Calculation;

});