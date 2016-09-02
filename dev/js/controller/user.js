define(['util',
    'ui',
    'config',
    'utils/md5',
    'module/user',
    'view/common',
    'ctrl/weixin'
], function(Util, UI, Config, MD5, ModUser, View, WeiXin) {
    var bindings = [{
        element: '#logOut',
        event: 'click',
        handler: function(e) {
            e.preventDefault();
            UI.cdkConfirm('是否退出登录？',function(){
                ModUser.removeUser();
                replaceUrl('./');
            });
        }
    }];

    var User = {
        init: function() {

            UI.loading();
            if(!ModUser.isLogin){
                replaceUrl('?c=login&r='+ encodeURIComponent(window.location.search));
                UI.loading(-1);
            }else{
                ModUser.getUser(function(data){
                    if(data.status == 200 && !!data.data && !!data.data.item&& data.data.item.length > 0){
                        View.initUser(data.data.item[0]);
                        Util.bindEvents(bindings);
                    }else if(data.status == 403){
                        ModUser.removeUser();
                        UI.alert('登录失效，请重新登录',function(){
                            replaceUrl('?c=login&r='+ encodeURIComponent(window.location.search));
                        });
                    }

                    UI.loading(-1);

                });
            }

        }

    };

    return User;

});