define(['util',
    'ui',
    'config',
    'utils/md5',
    'module/user',
    'view/common',
    'ctrl/weixin'
], function(Util, UI, Config, MD5, ModUser, View, WeiXin) {
    var bindings = [{
        element: '#forgetForm',
        event: 'submit',
        handler: function(e) {
            e.preventDefault();
            var mobile = $.trim($('[name="mobile"]', this).val()),
                passwd = $.trim($('[name="passwd"]', this).val()),
                verify_code = $.trim($('[name="verify_code"]', this).val());

            if (mobile == '') {
                UI.showToast('请输入手机号码');
                return false;
            } else if (!Util.isPhone(mobile)) {
                UI.showToast('手机号码格式错误');
                return false;
            } else if (passwd == '') {
                UI.showToast('请输入密码');
                return false;
            } else if (verify_code == '') {
                UI.showToast('请输入手机验证码');
                return false;
            }
            UI.showWaiting('正在提交...');

            $.ajax({
                url: Config.apiDomain + '/User/verify_forget_passwd',
                type: 'POST',
                data: {
                    mobile: mobile,
                    verify_code: verify_code,
                    passwd: passwd
                },
                dataType: 'json',
                success: function(data) {
                    UI.hideWaiting();
                    if (data.status == 200) {
                        UI.showToast(data.data.msg);
                        setTimeout(function(){
                            replaceUrl('?c=login');
                        },1000);
                    } else {
                        UI.alert(data.msg);
                    }
                },
                error: function() {
                    UI.hideWaiting();
                    UI.alert('找回密码失败，请重试');
                }
            });
        }
    }, {
        element: '#forgetForm #getForgetCode',
        event: 'click',
        handler: function(e) {
            //w-button-gray
            var mobile = $.trim($('#forgetForm [name="mobile"]').val());

            if (mobile == '') {
                UI.showToast('请填写手机号码');
                return false;
            } else if (!Util.isPhone(mobile)) {
                UI.showToast('手机号码格式不正确');
                return false;
            }

            $.ajax({
                url: Config.apiDomain + '/User/forget_passwd',
                type: 'POST',
                data: {
                    mobile: mobile
                },
                dataType: 'json',
                success: function(data) {
                    if (data.status == 200) {
                        UI.showToast(data.data.msg);
                        Forget.setTime();
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

    var Forget = {
        init: function() {

            UI.loading();

            View.initForget(Util.getQueryData(window.location.search));

            Util.bindEvents(bindings);

            UI.loading(-1);

        },
        endTime: 0,

        startTime: 0,

        setTime: function() {
            var self = this;
            this.codeBtn = $('#forgetForm #getForgetCode');

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

    return Forget;

});