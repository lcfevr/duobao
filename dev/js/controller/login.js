define(['util',
    'ui',
    'config',
    'utils/md5',
    'module/user',
    'view/common',
    'ctrl/weixin'
], function(Util, UI, Config, MD5, ModUser, View, WeiXin) {
    var bindings = [{
        element: '#loginForm',
        event: 'submit',
        handler: function(e) {
            e.preventDefault();
            var phone= $.trim($('[name="phone"]',this).val()),
                password= $.trim($('[name="password"]',this).val());

            if(phone == ''){
                UI.showToast('请输入手机号码');
                return false;
            }else if(!(/^1[3|4|5|6|7|8]{1}\d{9}$/.test(phone))){
                UI.showToast('手机号码格式错误');
                return false;
            }else if(password == ''){
                UI.showToast('请输入密码');
                return false;
            }

            ModUser.login(phone,password,function(res) {
                if (res.status == 200 && res.data.token) {
                    backRef();
                }else{
                    UI.showToast(res.data);
                }
            });
        }
    }];

    var Login = {
        init: function() {

            UI.loading();
            
            if(ModUser.isLogin){
                backRef();
            }else{
                View.initLogin(Util.getQueryData(window.location.search));

                Util.bindEvents(bindings);
            }
            UI.loading(-1);

        }

    };

    return Login;

});