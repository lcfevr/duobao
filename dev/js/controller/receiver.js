define(['util',
    'ui',
    'config',
    'utils/md5',
    'module/user',
    'view/common',
    'ctrl/weixin'
], function(Util, UI, Config, MD5, ModUser, View, WeiXin) {

    var Receiver = {
        id: 0,
        init: function() {
            this.id =  Util.getQueryString('id');
            window.location.href = Config.apiDomain + '/Auto/receive?token=' + ModUser.token+"&id="+this.id;
        }
    };

    return Receiver;
});