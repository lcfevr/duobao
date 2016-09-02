define(['util',
    'ui',
    'config',
    'utils/md5',
    'module/user',
    'view/common',
    'ctrl/weixin'
], function(Util, UI, Config, MD5, ModUser, View, WeiXin) {
    var bindings = [{
            element: '#changeUserName',
            event: 'submit',
            handler: function(e) {
                e.preventDefault();
                var name = $.trim($('[name="username"]').val());
                if (name == '') {
                    UI.showToast('请输入昵称');
                    return false;
                } else if (name.length < 2 || name.length > 20) {
                    UI.showToast('请输入2-20个字符');
                    return false;
                }

                UI.showWaiting();
                ModUser.setUserName(name, function(res) {
                    UI.hideWaiting();
                    if (res.status == 200 && res.data && res.data.result == "ok") {
                        UI.showToast('修改成功');
                        $('#detailUsername').html(name);
                        $('#userDetail').show();
                        $('#changeUserName').hide();
                    }else if(!!res.msg){
                        UI.alert(res.msg);
                    }else{
                        UI.alert('修改失败，请重试');
                    }
                });
            }
        }, {
            element: '#getCode',
            event: 'click',
            handler: function(e) {
                //w-button-gray
                var phone = $.trim($('#changePhone [name="phone"]').val());
                if (phone == '') {
                    UI.showToast('请填写手机号码');
                    return false;
                } else if (!Util.isPhone(phone)) {
                    UI.showToast('手机号码格式不正确');
                    return false;
                }
                ModUser.sendSMS(phone, function(res) {
                    if (res.status == 200 && res.data && res.data.status === true) {
                        UI.showToast('发送成功');
                        User.setTime();
                    }else if(!!res.msg){
                        UI.alert(res.msg);
                    }else{
                        UI.alert('验证码发送失败，请重试');
                    }
                })
            }
        }, {
            element: '#changePhone',
            event: 'submit',
            handler: function(e) {
                e.preventDefault();
                var code = $.trim($('[name="code"]').val());
                var password = $.trim($('[name="password"]').val());
                var password2 = $.trim($('[name="password-sec"]').val());
                var reg = /^[0-9A-Za-z]{8,20}$/;
                var mark = $('.w-span-mark').text();

                if(mark){
                    if(password == password2){
                        if(password.match(reg)){
                            UI.showWaiting();
                            ModUser.verifyPhone(code,password, function(res) {
                                UI.hideWaiting();
                                if (res.status == 200 && res.data && res.data.status === true) {
                                    UI.showToast('绑定成功');
                                    $('#detailUserphone').html($.trim($('#changePhone [name="phone"]').val()));
                                    $('#userDetail').show();
                                    $('#changePhone').hide();
                                } else {
                                    UI.showToast('绑定失败请重试');
                                }
                            });
                        }else{
                            UI.alert('密码格式不正确，只能为数字和字母长度至少8位');
                        }
                    }else{
                        UI.alert('两次密码不一致');
                    }
                }else{
                    UI.showWaiting();
                    ModUser.verifyPhone2(code, function(res) {
                        UI.hideWaiting();
                        if (res.status == 200 && res.data && res.data.status === true) {
                            UI.showToast('绑定成功');
                            $('#detailUserphone').html($.trim($('#changePhone [name="phone"]').val()));
                            $('#userDetail').show();
                            $('#changePhone').hide();
                        } else {
                            UI.showToast('绑定失败请重试');
                        }
                    });
                }
            }
        }

    ];

    var User = {
        codeBtn: null,
        init: function() {


            UI.loading();

            if (!ModUser.isLogin) {
                replaceUrl('?c=login&r=' + encodeURIComponent(window.location.search));
            } else {
                ModUser.getMessage(function(data) {
                    if (data.status == 200 && !!data.data && !!data.data.item && data.data.item.length > 0) {
                        View.initUserDetail(data.data.item[0]);
                        Util.bindEvents(bindings);
                    }

                    UI.loading(-1);

                });
            }

        },

        endTime: 0,

        startTime: 0,

        setTime: function() {
            var self = this;
            this.codeBtn = $('#getCode');

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

    return User;

});