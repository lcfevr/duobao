define(['util',
    'ui',
    'hbs',
    'lib/fastclick',
    'module/user',
    'module/cart',
    'ctrl/weixin'
], function(Util, UI, HBS, FastClick, ModUser, ModCart, WeiXin) {

    window.nextFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            var currTime = +new Date,
                delay = Math.max(1000 / 60, 1000 / 60 - (currTime - lastTime));
            lastTime = currTime + delay;
            return setTimeout(callback, delay);
        };

    window.cancelFrame = window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.webkitCancelRequestAnimationFrame ||
        window.mozCancelRequestAnimationFrame ||
        window.msCancelRequestAnimationFrame ||
        clearTimeout;

    var bindings = [{
        // url链接
        element: document,
        event: 'click',
        selector: '[data-href]',
        handler: function(e) {
            var href = $(this).attr('data-href');
            openUrl(href);
        }
    }, {
        // 后退按钮
        element: document,
        event: 'click',
        selector: '[data-fn="back"]',
        handler: function(e) {
            hisBack();
        }
    }, {
        // 退出按钮
        element: document,
        event: 'click',
        selector: '[data-fn="logout"]',
        handler: function(e) {
            ModUser.removeUser();
            window.location.href = window.location.origin + window.location.pathname;
        }
    }, {
        // 返回顶部
        element: document,
        event: 'click',
        selector: '.w-button-backToTop',
        handler: function(e) {
            window.scrollTo(0, 0);
        }
    }, {
        // 滚动
        element: window,
        event: 'scroll',
        handler: function(e) {
            if (window.scrollY > 200) {
                $('.w-button-backToTop').show();
            } else {
                $('.w-button-backToTop').hide();
            }
        }
    }, {
        // 微信图片
        element: document,
        event: 'click',
        selector: '.msg-label-img',
        handler: function(e) {
            var $_this = $(this),
                $_list = $('.msg-label-img', $_this.closest('.msg-list')),
                arr = [];
            $_list.each(function(i, e) {
                arr.push($(e).attr('data-src'));
            });
            WeiXin.previewImage($_this.attr('data-src'), arr);
        }
    }, {
        // tab切换
        element: document,
        event: 'click',
        selector: '[data-tab]',
        handler: function(e) {
            var _this = $(this),
                $_content = $(_this.attr('data-tab'));
            if (_this.hasClass('cur')) {
                return false;
            }

            _this.closest('.tab').find('[data-tab]').removeClass('cur');
            _this.addClass('cur');

            $_content.closest('.tab-contents').find('.tab-content').hide();
            $_content.show();

            if (_this.attr('data-taburi')) {
                var queryData = Util.getQueryData(window.location.search);
                queryData.tab = _this.attr('data-taburi');
                history.replaceState(history.state, null, '?' + Util.objToQueryString(queryData));
            }

            return false;
        }
    }, {
        // 显示
        element: document,
        event: 'click',
        selector: '[data-show]',
        handler: function(e) {
            var selector = $(this).attr('data-show');
            $(selector).show();
        }
    }, {
        // 隐藏
        element: document,
        event: 'click',
        selector: '[data-hide]',
        handler: function(e) {
            var selector = $(this).attr('data-hide');
            $(selector).hide();
        }
    }, {
        // 删除元素
        element: document,
        event: 'click',
        selector: '[data-remove]',
        handler: function(e) {
            var selector = $(this).attr('data-remove');
            $(selector).remove();
        }
    }, {
        // 遮罩
        element: document,
        event: 'touchmove',
        selector: '.mask,.pro-mask',
        handler: function(e) {
            e.stopPropagation();
            e.preventDefault();
        }
    }, {
        element: document,
        event: 'click',
        selector: '[data-addcart]',
        handler: function(e) {
            GlobalEvent.addCart(this);
        }
    }, {
        element: document,
        event: 'click',
        selector: '[data-showcode]',
        handler: function(e) {
            var codes = $(this).attr('data-showcode');
            UI.alert(codes.replace(/,$/,'').replace(/,/g,', '));
        }
    }];

    var GlobalEvent = {
        showed: false,
        init: function() {

            // 快速点击
            // FastClick.attach(document.body);

            // 绑定全局事件
            Util.bindEvents(bindings);

            if (!localStorage.getItem('showed')) {

            }
        },
        addCart: function(btn) {
            var $_btn = $(btn),
                $_wrap = $_btn.closest('[data-gi]'),
                $_img = $_wrap.find('[data-img]'),
                $_cart = $('[data-fn="cartnum"]'),
                offset = $_img.offset(),
                id = $_wrap.attr('data-gi');

            if ($_cart.length > 0) {
                console.log('a')
                var div = $('<div class="w-goods-pic cart-anim"></div>'),
                    cof = $_cart.offset(),
                    top = cof.top + $_cart.height() / 2 - $_img.height() / 2,
                    left = cof.left + $_cart.width() / 2 - $_img.width() / 2,
                    style = {
                        "background-image": $_img.css('background-image'),
                        "width": $_img.width(),
                        "height": $_img.height(),
                        "top": top,
                        "left": left,
                        "-webkit-transform": "scale(1) translate3d(" + (offset.left - left) + "px," + (offset.top - top) + "px,0) rotateZ(-720deg)",
                        "transform": "scale(1) translate3d(" + (offset.left - left) + "px," + (offset.top - top) + "px,0) rotateZ(-720deg)"
                    };
                console.log(cof);
                console.log(top);
                console.log(left);

                div.css(style);
                div.on('webkitAnimationEnd', function(e) {
                    div.remove();
                });
                $('body').append(div);

                var num = ModCart.add(id, 1);
                if (num > 0) {
                    $('[data-fn="cartnum"]').html(num).show();
                } else {
                    $('[data-fn="cartnum"]').html(num).hide();
                }
            }
        },
        showTip: function() {
            $('body').append('<div id="newtip"></div>');
        }
    };

    return GlobalEvent;
});