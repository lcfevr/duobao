define(['util',
    'ui',
    'config',
    'module/user',
    'view/common',
    'ctrl/weixin'
], function(Util, UI, Config, ModUser, View, WeiXin) {
    var bindings = [{
        element: '#regForm',
        event: 'submit',
        handler: function(e) {
            e.preventDefault();
            var phone = $.trim($('[name="phone"]', this).val()),
                password = $.trim($('[name="password"]', this).val()),
                msgcode = $.trim($('[name="msgcode"]', this).val());

            if (phone == '') {
                UI.showToast('请输入手机号码');
                return false;
            } else if (!(/^1[3|4|5|6|7|8]{1}\d{9}$/.test(phone))) {
                UI.showToast('手机号码格式错误');
                return false;
            } else if (password == '') {
                UI.showToast('请输入密码');
                return false;
            } else if (msgcode == '') {
                UI.showToast('请输入手机验证码');
                return false;
            }
            UI.showWaiting('正在提交...');

            ModUser.reg({phone:phone,msgcode:msgcode,password:password}, function(res) {
                UI.hideWaiting();
                if (res.status == 200) {
                    UI.showWaiting('注册成功，正在登录...');

                    ModUser.login(phone, password, function(res) {
                        UI.hideWaiting();
                        if (res.status == 200) {
                            backRef();
                        } else {
                            UI.showToast(res.msg);
                            replaceUrl('?c=login');
                        }
                    });
                } else {
                    UI.showToast(res.msg);
                }
            });
        }
    }, {
        element: '#regForm #imgCode',
        event: 'click',
        handler: function(e) {
            e.preventDefault();
            ModUser.getVerifyImg(function(data) {
                console.log(data);
                if (data.status == 200) {
                    $('#regForm [name="mark"]').val(data.data.mark);
                    $('#regForm #imgCode').attr('src', 'data:image/png;base64,' + data.data.imgbase64);
                }
            });
        }
    }, {
        element: '#regForm #getRegCode',
        event: 'click',
        handler: function(e) {
            //w-button-gray
            var phone = $.trim($('#regForm [name="phone"]').val()),
                code = $.trim($('#regForm [name="code"]').val()),
                mark = $.trim($('#regForm [name="mark"]').val());
            if (!code || code == '') {
                UI.alert('请填写图片验证码');
                return false;
            } else if (phone == '') {
                UI.showToast('请填写手机号码');
                return false;
            } else if (!Util.isPhone(phone)) {
                UI.showToast('手机号码格式不正确');
                return false;
            }
            ModUser.sendMsgForRegPhone({
                mark: mark,
                phone: phone,
                code: code
            }, function(res) {
                if (res.status == 200 && res.data && res.data.status === true) {
                    UI.showToast('发送成功');
                    Reg.setTime();
                }else{
                    UI.alert(res.msg);
                }
            })
        }
    }];

    var Reg = {
        init: function() {

            UI.loading();
            ModUser.getVerifyImg(function(data) {
                console.log(data);
                if (data.status == 200) {
                    // var data = {data:{}};
                    data.data.queryDdata = Util.getQueryData(window.location.search)
                    View.initReg(data.data);
                    Util.bindEvents(bindings);

                    UI.loading(-1);
                }
            });

        },

        endTime: 0,

        startTime: 0,

        setTime: function() {
            var self = this;
            this.codeBtn = $('#regForm #getRegCode');

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

    return Reg;

});