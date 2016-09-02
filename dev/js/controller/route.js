define(['util',
    'module/user',
    'ctrl/weixin',
    'ctrl/home',
    'ctrl/shareOrder',
    'ctrl/list',
    'ctrl/detail',
    'ctrl/intro',
    'ctrl/previousRecord',
    'ctrl/shareDetail',
    'ctrl/login',
    'ctrl/reg',
    'ctrl/reg_1',
    'ctrl/user',
    'ctrl/userDetail',
    'ctrl/address',
    'ctrl/chargeRecord',
    'ctrl/buyRecord',
    'ctrl/winRecord',
    'ctrl/cart',
    'ctrl/static',
    'ctrl/pay',
    'ctrl/payResult',
    'ctrl/recharge',
    'ctrl/profile',
    'ctrl/calculation',
    'ctrl/winDetail',
    'ctrl/shareEdit',
    'ctrl/forget',
    'ctrl/resetPassword',
    'ctrl/receiver',
    'ctrl/activity',
    'ctrl/latest',
    'ctrl/free',
    'ctrl/coupon',
    'ctrl/serviceCenter'
    
], function(Util,
    ModUser,
    WeiXin,
    Home,
    ShareOrder,
    List,
    Detail,
    Intro,
    PreviousRecord,
    ShareDetail,
    Login,
    Reg,
    Reg_1,
    User,
    UserDetail,
    Address,
    ChargeRecord,
    BuyRecord,
    WinRecord,
    Cart,
    Static,
    Pay,
    PayResult,
    Recharge,
    Profile,
    Calculation,
    WinDetail,
    ShareEdit,
    Forget,
    ResetPassword,
    Receiver,
    Activity,
    Latest,
    Free,
    Coupon,
    ServiceCenter
) {

    var Route = {
        historyNum: 0,
        state:0,
        init: function() {
            var self = this;

            if (!!history.state && !isNaN(history.state.num)) {
                Route.historyNum = history.state.num;
            } else if (!history.state) {
                history.replaceState({
                    'num': 0
                }, '', '');
            } else {
                history.replaceState($.extend(history.state, {
                    'num': 0
                }), '', '');
            }

            // 页面地址变化
            window.onpopstate = function(e) {
                $('audio').each(function(i, e) {
                    e.pause();
                });
                if(!!self.state){
                    self.run();
                }

            };
            // if (ModUser.isLogin) {
            this.run();
            // } else {
            //     this.openUrl('?c=login');
            // }
        },
        run: function() {
            var obj = Util.getQueryData(window.location.search.replace(/^\?/, ''));
            $('.page-show').removeClass('page-show');
            WeiXin.updateShare({
                // link:WeiXin.getShareUrl()
                link:window.location.origin + window.location.pathname
            });
            if (!obj['c']) {
                Home.init();
            } else {

                switch (obj['c'].toLowerCase()) {
                    case 'share':
                        $('html').css('font-size','62.5%');
                        ShareOrder.init();
                        break;
                    case 'list':
                        $('html').css('font-size','62.5%');
                        List.init();
                        break;
                    case 'detail':
                        $('html').css('font-size','62.5%');
                        Detail.init();
                        break;
                    case 'intro':
                        $('html').css('font-size','62.5%');
                        Intro.init();
                        break;
                    case 'previousrecord':
                        $('html').css('font-size','62.5%');
                        PreviousRecord.init();
                        break;
                    case 'sharedetail':
                        $('html').css('font-size','62.5%');
                        ShareDetail.init();
                        break;
                    case 'login':
                        $('html').css('font-size','62.5%');
                        Login.init();
                        break;
                    case 'reg':
                        $('html').css('font-size','62.5%');
                        Reg.init();
                        break;
                    case 'reg_1':
                        $('html').css('font-size','62.5%');
                        Reg_1.init();
                        break;
                    case 'user':
                        $('html').css('font-size','62.5%');
                        User.init();
                        break;
                    case 'userdetail':
                        $('html').css('font-size','62.5%');
                        UserDetail.init();
                        break;
                    case 'address':
                        $('html').css('font-size','62.5%');
                        Address.init();
                        break;
                    case 'chargerecord':
                        $('html').css('font-size','62.5%');
                        ChargeRecord.init();
                        break;
                    case 'buyrecord':
                        $('html').css('font-size','62.5%');
                        BuyRecord.init();
                        break;
                    case 'winrecord':
                        $('html').css('font-size','62.5%');
                        WinRecord.init();
                        break;
                    case 'cart':
                        $('html').css('font-size','62.5%');
                        Cart.init();
                        break;
                    case 'help':
                    case 'agreement':
                    case 'qa':
                    case 'guide':
                        Static.init(obj['c'].toLowerCase());
                        break;
                    case 'pay':
                        $('html').css('font-size','62.5%');
                        Pay.init();
                        break;
                    case 'payresult':
                        $('html').css('font-size','62.5%');
                        PayResult.init();
                        break;
                    case 'recharge':
                        $('html').css('font-size','62.5%');
                        Recharge.init();
                        break;
                    case 'profile':
                        $('html').css('font-size','62.5%');
                        Profile.init();
                        break;
                    case 'calculation':
                        $('html').css('font-size','62.5%');
                        Calculation.init();
                        break;
                    case 'windetail':
                        $('html').css('font-size','62.5%');
                        WinDetail.init();
                        break;
                    case 'shareedit':
                        $('html').css('font-size','62.5%');
                        ShareEdit.init();
                        break;
                    case 'forget':
                        $('html').css('font-size','62.5%');
                        Forget.init();
                        break;
                    case 'resetpassword':
                        $('html').css('font-size','62.5%');
                        ResetPassword.init();
                        break;
                    case 'receiver':
                        $('html').css('font-size','62.5%');
                        Receiver.init();
                        break;
                    case 'activity':
                        $('html').css('font-size','62.5%');
                        Activity.init();
                        break;
                    case 'latest':
                        $('html').css('font-size','62.5%');
                        Latest.init();
                        break;
                    case 'free':
                        $('html').css('font-size','62.5%');
                        Free.init();
                        break;
                    case 'coupon':
                        Coupon.init(false);
                        break;
                    case 'getcoupon':
                        Coupon.init(true);
                        break;
                    case 'servicecenter':

                        $('html').css('font-size','62.5%');
                        ServiceCenter.init();
                        break;
                    default:
                        history.replaceState(history.state, null, window.location.pathname);
                        Home.init();
                }
            }
            if (history.state && history.state.scrollY) {
                window.scrollTo(0, history.state.scrollY); // 四轮定位
            }
            this.state = 1;
        },
        openUrl: function(href) {
            var scrollY = window.scrollY,
                state = history.state,
                locationData = Util.getQueryData(window.location.search),
                queryData;
            if (!!href && href.split('?').length > 1) {
                queryData = Util.getQueryData(href.split('?')[1]);
                if(!!queryData.c && queryData.c == 'detail'){
                    window.location.href = href;
                    return;
                }
            } else {
                queryData = {};
            }

            if (!!state) {
                state.scrollY = scrollY;
            } else {
                state = {
                    'scrollY': scrollY,
                    'num': 0
                };
            }

            history.replaceState(state, null);

            if (!href || href == '') {
                if (!locationData.c) {
                    history.replaceState({
                        'num': state.num
                    }, null, window.location.pathname);
                } else {
                    history.pushState({
                        'num': (state.num + 1)
                    }, null, window.location.pathname);
                }
            } else {
                if (!!queryData.c && !!locationData.c && queryData.c == locationData.c) {
                    history.replaceState({
                        'num': state.num
                    }, null, href);
                } else {
                    history.pushState({
                        'num': (state.num + 1)
                    }, null, href);
                }
            }
            this.run();
        },
        replaceUrl: function(href) {
            history.replaceState(history.state, null, href);
            this.run();
        },
        updateTitle: function(title) {
            document.title = title;
            // if (WeiXin.isWeixin) {
            //     // hack在微信等webview中无法修改document.title的情况
            //     var $iframe = $('<iframe src="/favicon.ico"></iframe>').on('load', function() {
            //         setTimeout(function() {
            //             $iframe.off('load').remove();
            //         }, 0);
            //     }).appendTo($('body'));
            // }
        },
        back: function() {
            if (history.state && !isNaN(history.state.num) && history.state.num > 0) {
                history.back();
            } else {
                Route.openUrl('');
            }
        },
        backRef: function() {
            var ref = Util.getQueryString('r');
            if (ref && Util.isUrl(ref)) {
                window.location.href = ref;
            } else if (ref) {
                this.replaceUrl(ref);
            } else {
                this.replaceUrl('./');
            }

        }
    };

    window.openUrl = function(url) {
        Route.openUrl(url);
    }
    window.replaceUrl = function(url) {
        Route.replaceUrl(url);
    }
    window.hisBack = function() {
        Route.back();
    }
    window.updateTitle = function(title) {
        Route.updateTitle(title);
    }
    window.backRef = function() {
        Route.backRef();
    }

    return Route;
});