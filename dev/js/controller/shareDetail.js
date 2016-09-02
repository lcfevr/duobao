define(['util',
    'ui',
    'config',
    'pageSwitch',
    'module/shareOrder',
    'view/common',
    'ctrl/weixin'
], function(Util, UI, Config, pageSwitch, ModShareOrder, View, WeiXin) {

    var ShareDetail = {
        id : '',
        init: function() {

            UI.loading();

            var self = this;

            this.id = Util.getQueryString('id');

            ModShareOrder.getShareDetail(this.id,function(data) {
                if(!data){
                    hisBack();
                }else{
                    View.initShareDetail(data);
                }
                UI.loading(-1);
            });

        }

    };

    return ShareDetail;

});