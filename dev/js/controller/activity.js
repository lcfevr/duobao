define(['util',
    'ui',
    'config',
    'module/user',
    'view/common',
    'ctrl/weixin'
], function(Util, UI, Config, ModUser,WeiXin) {
    var Activity = {
        bf:'',
        bc:'',
        init: function() {
            this.bf =  Util.getQueryString('bf');
            this.bc = Util.getQueryString('bc');
            window.location.href = Config.apiDomain +"/"+this.bc+"/"+this.bf+'?token=' + ModUser.token;
        }
    };

    return Activity;
});