define(['util',
    'ui',
    'hbs',
    'config',
    'module/cart',
    'module/user',
    'ctrl/weixin',
    'text!tpl/common_header.hbs',
    'text!tpl/common_footer.hbs',
    'text!tpl/common_fixbtn.hbs',
    'text!tpl/page_home.hbs',
    'text!tpl/page_share_order.hbs',
    'text!tpl/tpl_share_order_item.hbs',
    'text!tpl/page_list.hbs',
    'text!tpl/tpl_list_item.hbs',
    'text!tpl/page_detail.hbs',
    'text!tpl/page_intro.hbs',
    'text!tpl/page_previous_record.hbs',
    'text!tpl/tpl_previous_record_item.hbs',
    'text!tpl/tpl_record_item.hbs',
    'text!tpl/page_share_detail.hbs',
    'text!tpl/page_login.hbs',
    'text!tpl/page_reg.hbs',
    'text!tpl/page_reg_1.hbs',
    'text!tpl/page_user.hbs',
    'text!tpl/page_user_detail.hbs',
    'text!tpl/page_address.hbs',
    'text!tpl/tpl_address_form.hbs',
    'text!tpl/page_charge_record.hbs',
    'text!tpl/tpl_charge_record_item.hbs',
    'text!tpl/page_buy_record.hbs',
    'text!tpl/tpl_buy_record_item.hbs',
    'text!tpl/page_win_record.hbs',
    'text!tpl/tpl_win_record_item.hbs',
    'text!tpl/page_cart.hbs',
    'text!tpl/page_help.hbs',
    'text!tpl/page_pay.hbs',
    'text!tpl/page_pay_result.hbs',
    'text!tpl/page_recharge.hbs',
    'text!tpl/page_profile.hbs',
    'text!tpl/tpl_profile_record.hbs',
    'text!tpl/tpl_profile_win.hbs',
    'text!tpl/tpl_profile_share.hbs',
    'text!tpl/page_agreement.hbs',
    'text!tpl/page_qa.hbs',
    'text!tpl/page_calculation.hbs',
    'text!tpl/page_win_detail.hbs',
    'text!tpl/tpl_win_addr_item.hbs',
    'text!tpl/page_guide.hbs',
    'text!tpl/page_share_edit.hbs',
    'text!tpl/page_forget.hbs',
    'text!tpl/page_reset_password.hbs',
    'text!tpl/page_latest.hbs',
    'text!tpl/tpl_latest_item.hbs',
    'text!tpl/page_free.hbs',
    'text!tpl/page_coupon.hbs',
    'text!tpl/page_servic.hbs'
], function(
    Util,
    UI,
    HBS,
    Config,
    ModCart,
    User,
    WeiXin,
    TplHeader,
    TplFooter,
    TplFixedButton,
    TplHome,
    TplShareOrder,
    TplShareItem,
    TplList,
    TplListItem,
    TplDetail,
    TplIntro,
    TplPreviousRecord,
    TplPreviousRecordItem,
    TplRecordItem,
    TplShareDetail,
    TplLogin,
    TplReg,
    TplReg1,
    TplUser,
    TplUserDetail,
    TplAddress,
    TplAddressForm,
    TplChargeRecord,
    TplChargeRecordItem,
    TplBuyRecord,
    TplBuyRecordItem,
    TplWinRecord,
    TplWinRecordItem,
    TplCart,
    TplHelp,
    TplPay,
    TplPayResult,
    TplRecharge,
    TplProfile,
    TplProfileRecordItem,
    TplProfileWinItem,
    TplProfileShareItem,
    TplAgreement,
    TplQA,
    TplCalculation,
    TplWinDetail,
    TplWinAddrItem,
    TplGuide,
    PageShareEdit,
    PageForget,
    PageResetPassword,
    TplLatest,
    TplLatestItem,
    TplFree,
    TplCoupon,
    TplService
) {

    var CommonView = {

        getQueryData: function() {
            return $.extend(Util.getQueryData(window.location.search), {
                // isWeiXin: true
                isWeiXin: WeiXin.isWeixin,
                cart:true,
                cartNum:ModCart.getCartNum()
            });
        },

        addHeader: function(str) {
            return HBS.compile(TplHeader)(this.getQueryData()) + (str || '');
        },

        addFooter: function(str) {
            return (str || '') + HBS.compile(TplFooter)(this.getQueryData());
        },

        getFixedButton: function(btnConf) {
            return HBS.compile(TplFixedButton)($.extend({
                toTop: true
            }, btnConf));
        },

        addHF: function(str, btnConf) {

            return this.addFooter(this.addHeader(str || '',btnConf)) + this.getFixedButton(btnConf);

        },

        noFH: function(id, tpl, data, addClass) {
            if ($('#' + id).length == 0) {

                $('body').append('<section id="' + id + '" class="page-wrap' + (typeof addClass == 'string' ? ' ' + addClass : '') + '"></section>');

            }

            $('#' + id).html(HBS.compile(tpl)(data)).addClass('page-show');

        },

        initPage: function(id, tpl, data, addClass) {

            if ($('#' + id).length == 0) {

                $('body').append('<section id="' + id + '" class="page-wrap' + (typeof addClass == 'string' ? ' ' + addClass : '') + '"></section>');

            }

            $('#' + id).html(this.addHF(HBS.compile(tpl)(data))).addClass('page-show');

            //---------------------------------------------------
            $('body').append('<script>' +
                '$(function(){' +

                '   if ($("ul.m-nav-list > li").length >0) {' +
                '       $.each($("ul.m-nav-list > li"),function(m,n){' +
                '           $(n).attr("onclick","_czc.push([\'_trackEvent\',\'首页-导航-"+$(n).find("a")[0].innerHTML.replace(/<[^>]+>/g,"")+"\',\'点击\']);");' +
                '       });' +
                '   };' +

                '   if ($("i.ico-miniCart").length >0) {' +
                '       $.each($("i.ico-miniCart"),function(m,n){' +
                '           $(n).attr("onclick","_czc.push([\'_trackEvent\',\'首页-购物车\',\'点击\']);");' +
                '       });' +
                '   };' +

                '   if ($("button.w-button-backToTop").length >0) {' +
                '       $.each($("button.w-button-backToTop"),function(m,n){' +
                '           $(n).attr("onclick","_czc.push([\'_trackEvent\',\'首页-回到顶部-"+(m+1)+"\',\'点击\']);");' +
                '       });' +
                '   };' +

                '   if ($("div.w-more").length >0) {' +
                '       $.each($("div.w-more"),function(m,n){' +
                '           $(n).attr("onclick","_czc.push([\'_trackEvent\',\'首页-点击查看更多-"+(m+1)+"\',\'点击\']);");' +
                '       });' +
                '   };' +

                '   if ($("p.m-link").length >0) {' +
                '       $.each($("p.m-link"),function(m,n){' +
                '           $(n).attr("onclick","_czc.push([\'_trackEvent\',\'首页-什么是一元商品\',\'点击\']);");' +
                '       });' +
                '   };' +

                '})' +
                '</script>');
            //---------------------------------------------------
        },

        /******************************************************/

        // 首页
        initHome: function(data) {

            this.initPage('page-home', TplHome, data);
            //---------------------------------------------------
            $('body').append('<script>' +
                '$(function(){' +

                '   if ($("ul[id] > li").length >0) {' +
                '       $.each($("ul[id] > li"),function(m,n){' +
                '           $(n).attr("onclick","_czc.push([\'_trackEvent\',\'首页-banner-"+(m+1)+"\',\'点击\']);");' +
                '       });' +
                '   };' +

                '   if ($("div.m-index-mod-bd > ul").length >0) {' +
                '        var h3 = $("h3");' +
                '        $.each($("div.m-index-mod-bd > ul"),function(m,n){' +
                '            $(n).find("li").each(function(k,v){' +
                '                $(v).attr("onclick","_czc.push([\'_trackEvent\',\'首页-"+h3[m].innerText+"-"+(k+1)+"\',\'点击\']);");' +
                '            })' +
                '        });' +
                '    }' +

                '   if ($("h3 + a").length >0) {' +
                '       $.each($("h3 + a"),function(m,n){' +
                '           $(n).attr("onclick","_czc.push([\'_trackEvent\',\'首页-"+$(n.parentNode).find("h3")[0].innerText+"-"+n.innerHTML+"\',\'点击\']);");' +
                '       });' +
                '   };' +

                '   if ($("a.w-button-addToCart").length >0) {' +
                '       $.each($("a.w-button-addToCart"),function(m,n){' +
                '           $(n).attr("onclick","_czc.push([\'_trackEvent\',\'首页-加入购物车-"+(m+1)+"\',\'点击\']);");' +
                '       });' +
                '   };' +

                '})' +
                '</script>');
                //---------------------------------------------------
        },

        /******************************************************/

        // 所有晒单
        initAllShareOrder: function(data) {
            var uid = Util.getQueryString('uid');
            if (data.id == 0 && !uid) {

                this.initPage('page-share', TplShareOrder, data);

                $('#page-share').removeClass('page-detail');

            } else {

                this.noFH('page-share', TplShareOrder, data, 'page-detail');
                $('#page-share').addClass('page-detail');

            }

            this.appendShareOrderList(data);

        },
        // 追加晒单列表
        appendShareOrderList: function(data) {
            var lists = $(HBS.compile(TplShareItem)(data));
            $('#shareOrderList').append(lists);
            //---------------------------------------------------
            if ($("a.w-shareItem").length >0) {
                $.each($("a.w-shareItem"), function (m, n) {
                    var href = $(n).attr('data-href');
                    $(n).attr("onclick", "_czc.push(['_trackEvent','晒单-晒单列表-" + href.substring(href.lastIndexOf('=')+1) + "','点击']);");
                });
            }
            //---------------------------------------------------
            return lists;
        },

        /******************************************************/

        // 晒单详情
        initShareDetail: function(data) {
            this.noFH('page-share-detail', TplShareDetail, data, 'page-user');
        },

        // 全部免费商品
        initFree: function(data) {

            this.noFH('page-free', TplFree, data);
            $('#page-free').append(HBS.compile(TplFooter)(this.getQueryData()));
        },

        /******************************************************/

        // 全部商品
        initList: function(data) {
            this.initPage('page-list', TplList, data);
            //---------------------------------------------------
            if ($("ul.m-list-catlog-list > li").length >0) {
                $.each($("ul.m-list-catlog-list > li"),function(m,n){
                    $(n).attr("onclick","_czc.push([\'_trackEvent\',\'全部商品-商品分类-"+$(n).find("a")[0].innerHTML.replace(/<[^>]+>/g,"")+"\',\'点击\']);");
                });
            };
            if ($("ul.m-list-types-list > li").length >0) {
                $.each($("ul.m-list-types-list > li"),function(m,n){
                    $(n).attr("onclick","_czc.push([\'_trackEvent\',\'全部商品-商品排序-"+$(n).find("a")[0].innerHTML.replace(/<[^>]+>/g,"")+"\',\'点击\']);");
                });
            };
            //---------------------------------------------------
            this.appendList({
                item: data.data
            });
        },
        // 追加全部商品列表
        appendList: function(data) {
            $('#page-list #list').append(HBS.compile(TplListItem)(data));
            //---------------------------------------------------
            if ($(".w-goodsList-item").length >0) {
                $.each($(".w-goodsList-item"), function (m, n) {
                    $(n).attr("onclick", "_czc.push(['_trackEvent','全部商品-商品列表-" + (m + 1) + "','点击']);");
                });
            }
            //---------------------------------------------------
        },
        // 清除全部商品列表
        clearList: function(data) {
            $('#page-list #list').html('');
            if (!!data) {
                this.appendList(data);
            }
        },


        /******************************************************/

        // 商品详情
        initDetail: function(data) {
            data.cartNum = ModCart.getCartNum()
            this.noFH('page-detail', TplDetail, data, 'page-detail');
        },
        // 商品详情购买记录
        appendRecordList: function(data) {
            $('#page-detail #detailRecordList').append(HBS.compile(TplRecordItem)(data));
        },
        // 商品详情介绍
        initIntro: function(data) {
            this.noFH('page-intro', TplIntro, data, 'page-detail');
        },

        /******************************************************/

        // 往期
        initPreviousRecord: function(data) {
            this.noFH('page-previous-record', TplPreviousRecord, data, 'page-detail');
            this.appendPreviousRecordList(data);
        },
        // 往期列表
        appendPreviousRecordList: function(data) {
            $('#page-previous-record #previousRecordList').append(HBS.compile(TplPreviousRecordItem)(data));
        },

        /******************************************************/

        //最新揭晓数据
        initLatest:function(data){
            this.noFH('page_latest', TplLatest , data,'page-detail');
            this.appendLatestList(data);
        },
        //最新揭晓列表
        appendLatestList:function(data){
            $('#page_latest #latestList').append(HBS.compile(TplLatestItem)(data));
        },

        /***************************************************/
        // 登录
        initLogin: function(data) {
            this.noFH('page-login', TplLogin, data);
        },

        // 注册
        initReg: function(data) {
            this.noFH('page-reg', TplReg, data,'page-user');
        },

        // 注册,二维码
        initReg_1: function(data) {
            this.noFH('page-reg-1', TplReg1, data,'page-user');
        },

        // 注册
        initForget: function(data) {
            this.noFH('page-forget', PageForget, data,'page-user');
        },

        initResetPassword:function(data){
            this.noFH('page-reset-password', PageResetPassword, data,'page-user');
        },

        /******************************************************/

        // 个人中心
        initUser: function(data) {
            if(User.isLogin){
                data.token = User.token;
                data.apiDomain = Config.apiDomain;
                this.noFH('page-user',TplUser,data,'page-user')
            }



            //---------------------------------------------------
            if ($("div.per-user-bar > a").length >0) {
                console.log('lll')
                $.each($("div.m-user-bar > a"),function(m,n){
                    $(n).attr("onclick","_czc.push([\'_trackEvent\',\'个人中心-链接-"+n.innerHTML.replace(/<[^>]+>/g,"")+"\',\'点击\']);");
                });
            };
            //---------------------------------------------------
        },

        // 个人详情
        initUserDetail: function(data) {
            this.noFH('page-user-detail', TplUserDetail, data, 'page-user');
        },
        
        //服务中心
        initService: function(data) {
            this.noFH('page-service', TplService, data, 'page-user');
        },
        // 收货地址
        initAddress: function(data) {
            this.noFH('page-address', TplAddress, data, 'page-user');
        },

        // 收货地址编辑
        setAddressEdit: function(data, id) {
            var id = id || '#addressForm';
            $(id).html(HBS.compile(TplAddressForm)(data));
        },

        // 充值记录
        initChargeRecord: function(data) {
            this.noFH('page-charge-record', TplChargeRecord, data, 'page-user');
            this.setChargeRecordList(data);
        },

        // 充值记录list
        setChargeRecordList: function(data) {
            $('#chargeRecordList').append(HBS.compile(TplChargeRecordItem)(data));
        },

        // 购买记录
        initBuyRecord: function(data) {
            this.noFH('page-buy-record', TplBuyRecord, data, 'page-user');
        },

        // 购买记录
        appendBuyRecord: function(data) {
            $('#buyRecordList').append(HBS.compile(TplBuyRecordItem)(data));
        },

        // 购买记录
        initWinRecord: function(data) {
            this.noFH('page-win-record', TplWinRecord, data, 'page-user');
        },

        // 购买记录
        appendWinRecord: function(data) {
            $('#winRecordList').append(HBS.compile(TplWinRecordItem)(data));
        },

        initCart: function(data) {
            this.noFH('page-cart', TplCart, data, 'page-cart');
        },

        initHelp: function() {
            this.noFH('page-help', TplHelp, Config, 'page-help');
        },

        initGuide: function() {
            this.noFH('page-guide', TplGuide, {}, 'page-help');
        },

        initShareEdit: function(data) {
            this.noFH('page-share-edit', PageShareEdit, data, 'page-user');
        },

        initAgreement: function() {
            this.noFH('page-agreement', TplAgreement, Config, 'page-help');
        },

        initQA: function() {
            this.noFH('page-qa', TplQA, Config, 'page-help');
        },

        initPay: function(data) {
            data.isWeixin = WeiXin.isWeixin;


            if ($('#page-pay').length == 0) {

                $('body').append('<section id="page-pay" class="page-wrap page-pay"></section>');

            }

            setTimeout(function(){
                $('#page-pay').html(HBS.compile(TplPay)(data)).addClass('page-show');
            },500);
        },

        initPayResult: function(data) {
            this.noFH('page-pay-result', TplPayResult, data, 'page-pay');
        },

        initRecharge: function(data) {
            data = data || {};
            data.isWeixin = WeiXin.isWeixin;
            this.noFH('page-recharge', TplRecharge, data, 'page-pay');
        },
        initProfile: function(data) {
            data = data || {};
            data.isWeixin = WeiXin.isWeixin;
            data.queryData = Util.getQueryData(window.location.href);
            this.noFH('page-profile', TplProfile, data, 'page-user');
        },

        appendProfileRecord: function(data) {
            $('#page-profile #profileList').append(HBS.compile(TplProfileRecordItem)(data));
        },

        appendProfileWin: function(data) {
            $('#page-profile #profileList').append(HBS.compile(TplProfileWinItem)(data));
        },

        appendProfileShare: function(data) {
            $('#page-profile #profileList').append(HBS.compile(TplProfileShareItem)(data));
        },

        initCalculation: function(data) {
            this.noFH('page-calculation', TplCalculation, data, 'page-detail');
        },

        initWinDetail: function(data) {
            this.noFH('page-win-detail', TplWinDetail, data, 'page-user');
        },

        setWinAddrList: function(data) {
            $('#page-win-detail #winAddrList').html(HBS.compile(TplWinAddrItem)(data));
        },

        initCoupon: function(data) {
            this.noFH('page-coupon', TplCoupon, data);
        },

        
    };

    return CommonView;
});