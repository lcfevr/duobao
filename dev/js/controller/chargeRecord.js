define(['util',
    'ui',
    'config',
    'utils/md5',
    'module/user',
    'view/common',
    'ctrl/weixin'
], function(Util, UI, Config, MD5, ModUser, View, WeiXin) {
    var bindings = [];
    var initEvent = [{
        element: window,
        event: 'scroll',
        handler: function(e) {
            var pos = $('#chargeRecordMore')[0].getBoundingClientRect();

            if (ChargeRecord.hasMore &&
                ((pos.top > 0 && window.innerHeight - pos.top > 0) ||
                    (pos.top <= 0 && pos.bottom >= 0))) {
                ChargeRecord.loadMore();
            }
        }
    }];

    var ChargeRecord = {
        page:0,
        hasMore: true,
        loading: false,
        init: function() {
            this.page = 0;
            this.hasMore= true;
            Util.unBindEvents(initEvent);

            UI.loading();

            var self = this;

            if(!ModUser.isLogin){
                replaceUrl('?c=login&r='+ encodeURIComponent(window.location.search));
                UI.loading(-1);
            }else{
                this.loading= true;
                ModUser.getPayRecord(this.page,function(data){
                    self.loading = false;
                    if(data.status == 200 && !!data.data){
                        View.initChargeRecord(data.data);
                        if(!!data.data.item){
                            self.page++;
                            Util.bindEvents(initEvent);
                            $(window).trigger('scroll');
                        }else{
                            $('#chargeRecordMore').html('暂无充值记录');
                        }
                    }

                    UI.loading(-1);

                });
            }

        },
        loadMore: function() {
            if (this.loading) {
                return;
            }
            var self = this;

            this.loading = true;

            ModUser.getPayRecord(this.page, function(data) {

                if(data.status == 200 && !!data.data && data.data.item && data.data.item.length > 0) {

                    self.page++;

                    View.setChargeRecordList(data.data);

                } else {

                    Util.unBindEvents(initEvent);

                    self.hasMore = false;

                    $('#chargeRecordMore').html('没有更多了');

                }

                self.loading = false;

            });
        }

    };

    return ChargeRecord;

});