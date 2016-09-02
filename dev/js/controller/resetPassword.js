define(['util',
    'ui',
    'config',
    'utils/md5',
    'module/user',
    'view/common',
    'ctrl/weixin'
], function(Util, UI, Config, MD5, ModUser, View, WeiXin) {
    var bindings = [{
        element: '#resetPasswordForm',
        event: 'submit',
        handler: function(e) {
            e.preventDefault();
            var oldpasswd = $.trim($('[name="oldpasswd"]', this).val()),
                newpasswd = $.trim($('[name="newpasswd"]', this).val()),
                code = $.trim($('[name="code"]', this).val());

            if (oldpasswd == '') {
                UI.showToast('请输入旧密码');
                return false;
            } else if (newpasswd == '') {
                UI.showToast('请输入新密码');
                return false;
            } else if (code == '') {
                UI.showToast('请输入手机验证码');
                return false;
            }
            UI.showWaiting('正在提交...');

            $.ajax({
                url: Config.apiDomain + '/User/verify_reset_passwd?token=' + ModUser.token,
                type: 'POST',
                data: {
                    oldpasswd: oldpasswd,
                    newpasswd: newpasswd,
                    code: code
                },
                dataType: 'json',
                success: function(data) {
                    UI.hideWaiting();
                    if (data.status == 200) {
                        UI.showToast(data.data.msg);
                        replaceUrl('?c=login&r='+ encodeURIComponent(window.location.search));

                    } else {
                        UI.alert(data.msg);
                    }
                },
                error: function() {
                    UI.hideWaiting();
                    UI.alert('修改密码失败，请重试');
                }
            });
        }
    }, {
        element: '#resetPasswordForm #getResetCode',
        event: 'click',
        handler: function(e) {
            //w-button-gray
            var oldpasswd = $('#resetPasswordForm [name="oldpasswd"]').val();

            if (oldpasswd == '') {
                UI.showToast('请填写旧密码');
                return false;
            }

            $.ajax({
                url: Config.apiDomain + '/User/reset_passwd?token=' + ModUser.token,
                type: 'POST',
                data: {
                    oldpasswd: oldpasswd
                },
                dataType: 'json',
                success: function(data) {
                    if (data.status == 200) {
                        UI.showToast(data.data.msg);
                        ResetPassword.setTime();
                    } else {
                        UI.alert(data.msg);
                    }
                },
                error: function() {
                    UI.alert('验证码发送失败，请重试');
                }
            });
        }
    }];

    var ResetPassword = {
        init: function() {

            UI.loading();

            if(!ModUser.isLogin){
                UI.loading(-1);
                UI.alert('请先登录',function(){
                    replaceUrl('?c=login&r='+ encodeURIComponent(window.location.search));
                });
            }else{
                View.initResetPassword(Util.getQueryData(window.location.search));

                Util.bindEvents(bindings);

                UI.loading(-1);
            }

        },
        endTime: 0,

        startTime: 0,

        setTime: function() {
            var self = this;
            this.codeBtn = $('#resetPasswordForm #getResetCode');

            if (this.endTime > Date.now()) {
                return false;
            }

            this.endTime = Date.now() + 60000;
            this.codeBtn.html('60秒后重新获取').addClass('w-button-gray').prop('disabled', true);

            var old = 0;

            function auto() {
                var surplus = self.endTime - Date.now();
                if (surplus <= 0) {
                    self.codeBtn.html('获取验证码').removeClass('w-button-gray').prop('disabled', false);
                } else {
                    var cur = Math.ceil(surplus / 1000);
                    if (cur != old) {
                        self.codeBtn.html(cur + '秒后重新获取');
                    }
                    nextFrame(auto);
                }
            }
            auto();
        }

    };

    return ResetPassword;

});