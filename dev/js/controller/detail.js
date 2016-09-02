define(['util',
    'ui',
    'config',
    'pageSwitch',
    'module/goods',
    'module/user',
    'module/cart',
    'view/common',
    'ctrl/weixin'
], function(Util, UI, Config, pageSwitch, ModGoods, ModUser, ModCart, View, WeiXin) {
    var bindings = [{
        element: '#page-detail #moreBtn',
        event: 'click',
        handler: function(e) {
            $(this).next('.m-detail-menu-wrap').toggle();
        }
    }, {
        element: '#page-detail [data-buy]',
        event: 'click',
        handler: function(e) {
            var id = $(this).attr('data-buy');
            var total = $(this).attr('data-total');
            ModCart.add(id, 1,total);
            openUrl('?c=cart');
        }
    }, {
        element: '#page-detail [data-freebuy]',
        event: 'click',
        handler: function(e) {
            var id = $(this).attr('data-freebuy');
            //var total = $(this).attr('data-total');
            ModCart.freeBuy(id,function(data) {
                UI.alert(data.msg);
                /*if(data.status=='200'){
                    setTimeout(function(){
                        window.location.reload();
                    },2000);
                }*/
            });
        }
    }/*, {
        element: '#detailShowLog',
        event: 'click',
        handler: function(e) {
            UI.confirm('已成功添加至清单！', function() {
                openUrl('./?c=cart');
            }, function() {
                
            }, [{
                type: 'cancel',
                text: '再逛一逛',
                style: ''
            }, {
                type: 'sure',
                text: '查看清单',
                style: ''
            }]);
        }
    }*/];

    var initEvent = [{
        element: window,
        event: 'scroll',
        handler: function(e) {
            var pos = $('#detailRecordMore')[0].getBoundingClientRect();
            if ($('#detailRecordMore').is(':visible') && Detail.hasMore &&
                ((pos.top > 0 && window.innerHeight - pos.top > 0) ||
                    (pos.top <= 0 && pos.bottom >= 0))) {
                Detail.loadMore();
            }
        }
    }];

    var Detail = {
        id: '',
        page: 0,
        limit: 10,
        hasMore: true,
        loading: false,
        init: function() {
            this.initNext();

            var setings = "onMenuShareTimeline onMenuShareAppMessage onMenuShareQQ onMenuShareWeibo onMenuShareQZone startRecord stopRecord onVoiceRecordEnd playVoice pauseVoice stopVoice onVoicePlayEnd uploadVoice downloadVoice chooseImage previewImage uploadImage downloadImage translateVoice getNetworkType openLocation getLocation hideOptionMenu showOptionMenu hideMenuItems showMenuItems hideAllNonBaseMenuItem showAllNonBaseMenuItem closeWindow scanQRCode chooseWXPay openProductSpecificView addCard chooseCard openCard";
            $.ajax({
                url: Config.apiDomain + '/Weixin/getSignPackage',
                type: 'POST',
                dataType: 'json',
                data: {
                    url: encodeURIComponent(location.href.replace(/#.*$/, ""))
                },
                success: function(json) {
                    if (json.status == 200) {
                        var f = json.data.signature;
                        wx.config({
                            debug: false,
                            appId: f.appId,
                            timestamp: parseInt(f.timestamp),
                            nonceStr: f.nonceStr,
                            signature: f.signature,
                            jsApiList: setings.split(" ")
                        });
                        wx.ready(function() {

                        });
                        wx.error(function(res) {

                        });
                    }
                },
                error: function(res) {
                     //alert("获取签名信息失败\n" + JSON.stringify(res));
                }
            });

        },
        initNext:function(){
            this.hasMore = true;
            this.loading = false;
            this.page = 0;

            UI.loading();

            var self = this;

            this.id = Util.getQueryString('id');

            if (!this.id) {
                hisBack();
                UI.loading(-1);
                return;
            }

            var good_id = this.id;
            ModGoods.getDetail(this.id, function(data) {
                View.initDetail({
                    data: data
                });

                WeiXin.updateShare({
                    //title:data.shopTitle,
                    link:WeiXin.getShareUrl(),
                    imgUrl:data.thumb,
                    success: function() {
                        var fun_name = this.fun_name;
                        var uid = ModUser.uid;
                        ModGoods.addShareRecode(uid,good_id,fun_name,function(data){
                            UI.alert(data);
                        });
                        $('#shareTip').remove();
                    }
                });


                Util.bindEvents(bindings);

                Util.bindEvents(initEvent);

                $(window).trigger('scroll');

                UI.loading(-1);
            });
        },
        loadMore: function() {
            if (this.loading) {
                return;
            }

            var self = this,
                formData = {
                    limit: this.limit,
                    offset: this.limit * this.page,
                    id: this.id
                };

            this.loading = true;

            ModGoods.getRecord(formData, function(data) {
                if (data && data.item && data.item.length > 0) {

                    self.page++;

                    View.appendRecordList(data);

                } else {

                    Util.unBindEvents(initEvent);

                    self.hasMore = false;
                    if (self.page == 0) {
                        $('#detailRecordMore').html('暂无记录');
                    } else {
                        $('#detailRecordMore').html('没有更多了');
                    }

                }

                self.loading = false;

            });
        }

    };

    return Detail;

});