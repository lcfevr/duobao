define(['util', 'hbs'], function(Util, HBS) {

    var UI = {
        loadingNumber: 0,
        loading: function(n) {
            if (!isNaN(n) && n < 0 && --this.loadingNumber <= 0) {
                this.loadingNumber = 0;

                $('#loading').remove();
            } else {
                if (isNaN(n) || n > 0) {
                    $('html').css('font-size','62.5%');
                    this.loadingNumber++;
                }
                if ($('#loading').length == 0) {
                    $('body').append('<div id="loading"><div class="spinner"><div class="rect1"></div> <div class="rect2"></div> <div class="rect3"></div> <div class="rect4"></div> <div class="rect5"></div></div></div>');
                }
            }
        },
        popupLogin: function() {
            $('body').append('<div id="loginPup" class="login-pop mask" style="display: block;"><div class="click-mask"></div><div class="login"><a href="#" class="button button-blue">Sign in with Facebook</a><a href="#" class="button button-red">Sign in with Google</a><div class="fixed-footer"><a href="javascript:;" data-href="?c=text&amp;a=eula">Privacy Policy</a></div></div></div>');
            $('#loginPup').on('touchmove', function(e) {
                e.preventDefault();
            });
            $('#loginPup .login a,#loginPup .click-mask').on('click', function(e) {
                $('#loginPup').remove();
            });
        },

        // 只弹toast
        showToast: function(text, ms) {
            if (!text) {
                return false;
            }
            var dom = $('<div class="public-toast">' + text + '</div>');
            var ms = ms || 1500;
            $('body').append(dom);
            setTimeout(function() {
                dom.addClass('public-toast-show');
            }, 10);
            setTimeout(function() {
                dom.removeClass('public-toast-show');
                dom.on('webkitTransitionEnd', function() {
                    dom.remove();
                });
            }, ms);
        },
        
        showCenter:function(text,ms){
            if (!text) {
                return false;
            }
            var dom = $('<div class="public-show">' + text + '</div>');
            var ms = ms || 1500;
            $('body').append(dom);
            setTimeout(function() {
                dom.addClass('public-toast-show');
            }, 10);
            setTimeout(function() {
                dom.removeClass('public-toast-show');
                dom.on('webkitTransitionEnd', function() {
                    dom.remove();
                });
            }, ms);
        },

        popHtml: function(text, type, definBtns) {
            var html = "",
                dom = document['createElement']('div'),
                btns = [{
                    type: 'sure',
                    text: '确定',
                    style: ''
                }];

            if (!!definBtns && definBtns.length > 0) {
                btns = definBtns;
            }

            dom['className'] = 'mask';
            dom['style']['display'] = 'block';

            html += '<div class="client-pop"><p>' + text + '</p><div class="client-btns">';

            for (var i = 0; i < btns.length; i++) {
                html += '<a href="javascript:;" data-type="' + btns[i]['type'] + '"' + ((typeof btns[i]['style'] == 'string' && !!btns[i]['style']) ? 'style="' + btns[i]['style'] + '"' : '') + '>' + btns[i]['text'] + '</a>';
            };

            html += '</div></div>';

            dom.innerHTML = html;

            document.getElementsByTagName('body')[0].appendChild(dom);

            setTimeout(function() {
                $('.client-pop', dom).addClass('client-pop-show');
            }, 0);

            return $(dom);
        },

        alert: function(text, callback) {

            var dom = this.popHtml(text, 'alert');

            $('.client-btns a', dom).on('click', function() {
                dom.remove();
                if (typeof callback == 'function') {
                    callback();
                }
            });

            $('.client-pop',dom).on('touchmove', function(e) {
                e.stopPropagation();
                return true;
            });
            $(dom).on('touchmove', function(e) {
                e.preventDefault();
                return false;
            });
        },

        customAlert: function(text, button, callback) {

            var dom = this.popHtml(text, 'alert', [{
                type: 'sure',
                text: button || '确定',
                style: ''
            }]);

            $('.client-btns a', dom).on('click', function() {
                dom.remove();
                if (typeof callback == 'function') {
                    callback();
                }
            });

            $(dom).on('touchmove', function(e) {
                e.preventDefault();
                return false;
            });
        },

        confirm: function(text, callback, cancelCallback, definBtns) {
            var btns = [{
                type: 'cancel',
                text: '取消',
                style: ''
            }, {
                type: 'sure',
                text: '确定',
                style: ''
            }];

            if (!!definBtns && definBtns.length > 0) {
                btns = definBtns;
            }

            var dom = this.popHtml(text, 'confirm', btns);

            $('.client-btns a', dom).on('click', function() {
                var type = $(this).attr('data-type');
                dom.remove();
                if (type == "sure") {
                    callback && callback();
                } else {
                    cancelCallback && cancelCallback();
                }
            });

            $(dom).on('touchmove', function(e) {
                e.preventDefault();
                return false;
            });
        },
        showWaiting: function(text) {
            if ($('#waiting').length > 0) {
                return false;
            }
            text = text || '加载中...';
            $('body').append('<div id="waiting" class="mask"><div class="loading"><div class="ico-loading"></div>' + text + '</div></div>');
            $('#waiting').on('touchmove', function(e) {
                e.preventDefault();
            });
        },
        hideWaiting: function() {
            $('#waiting').remove();
        },
        anotherPopHtml:function(text, type, definBtns){
            var html = "",
                dom = document['createElement']('div'),
                btns = [{
                    type: 'sure',
                    text: '确定',
                    style: ''
                }];

            if (!!definBtns && definBtns.length > 0) {
                btns = definBtns;
            }

            dom['className'] = 'cdk-mask';
            dom['style']['display'] = 'block';

            html += '<div class="cdk-client-pop"><p>' + text + '</p><div class="cdk-client-btns">';

            for (var i = 0; i < btns.length; i++) {
                html += '<a href="javascript:;" data-type="' + btns[i]['type'] + '"' + ((typeof btns[i]['style'] == 'string' && !!btns[i]['style']) ? 'style="' + btns[i]['style'] + '"' : '') + '>' + btns[i]['text'] + '</a>';
            };

            html += '</div></div>';

            dom.innerHTML = html;

            document.getElementsByTagName('body')[0].appendChild(dom);

            setTimeout(function() {
                $('.cdk-client-pop', dom).addClass('cdk-client-pop-show');
            }, 0);

            return $(dom);
        },

        cdkAlert:function(text,callback){
            var dom = this.anotherPopHtml(text, 'alert');

            $('.cdk-client-btns a', dom).on('click', function() {
                dom.remove();
                if (typeof callback == 'function') {
                    callback();
                }
            });

            $('.cdk-client-pop',dom).on('touchmove', function(e) {
                e.stopPropagation();
                return true;
            });
            $(dom).on('touchmove', function(e) {
                e.preventDefault();
                return false;
            });
        },
        cdkConfirm: function(text, callback, cancelCallback, definBtns) {
            var btns = [{
                type: 'cancel',
                text: '取消',
                style: ''
            }, {
                type: 'sure',
                text: '确定',
                style: ''
            }];

            if (!!definBtns && definBtns.length > 0) {
                btns = definBtns;
            }

            var dom = this.anotherPopHtml(text, 'confirm', btns);

            $('.cdk-client-btns a', dom).on('click', function() {
                var type = $(this).attr('data-type');
                dom.remove();
                if (type == "sure") {
                    callback && callback();
                } else {
                    cancelCallback && cancelCallback();
                }
            });

            $(dom).on('touchmove', function(e) {
                e.preventDefault();
                return false;
            });
        },
    };

    return UI;
});