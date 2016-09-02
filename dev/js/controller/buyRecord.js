define(['util',
    'ui',
    'config',
    'module/user',
    'module/member',
    'view/common',
    'ctrl/weixin'
], function(Util, UI, Config, ModUser, ModMember, View, WeiXin) {
    var bindings = [{
        element: '#page-buy-record .w-nav-hasBorder .w-nav-item',
        event: 'click',
        handler: function(e) {
            e.preventDefault();
            if ($(this).hasClass('w-nav-item-on')) {
                return false;
            }
            openUrl($(this).attr('data-tabhref'));
        }
    }];

    var initEvent = [{
        element: window,
        event: 'scroll',
        handler: function(e) {
            var pos = $('#buyRecordMore')[0].getBoundingClientRect();

            if (BuyRecord.hasMore &&
                ((pos.top > 0 && window.innerHeight - pos.top > 0) ||
                    (pos.top <= 0 && pos.bottom >= 0))) {
                BuyRecord.loadMore();
            }
        }
    }];

    var BuyRecord = {
        queryData: {},
        page: 0,
        hasMore: true,
        loading: false,
        init: function() {
            Util.unBindEvents(initEvent);

            var self = this;

            this.queryData = Util.getQueryData(window.location.search);

            this.page = 0;
            this.hasMore = true;
            this.loading = false;

            View.initBuyRecord({
                queryData: this.queryData
            });

            Util.bindEvents(bindings);
            Util.bindEvents(initEvent);

            self.loadMore();
        },
        loadMore: function() {
            if (this.loading) {
                return;
            }

            var self = this;

            this.loading = true;

            this.loadData(function(data) {
                if (data.status == 200 && data.data && (!!data.data.underway || !!data.data.complete)) {

                    self.page++;

                    var len = 0;
                    if (data.data.underway) {
                        len += data.data.underway.length;
                        View.appendBuyRecord({
                            item: data.data.underway
                        });
                    }
                    if (data.data.complete) {
                        len += data.data.complete.length;
                        View.appendBuyRecord({
                            item: data.data.complete
                        });
                    }
                    
                    if(len < 10){
                        self.hasMore = false;
                        $('#buyRecordMore').html('没有更多了');
                        Util.unBindEvents(initEvent);
                    }

                } else if (self.page == 0) {
                    self.hasMore = false;
                    $('#buyRecordMore').html('暂无记录');
                    Util.unBindEvents(initEvent);
                } else {
                    self.hasMore = false;
                    $('#buyRecordMore').html('没有更多了');
                    Util.unBindEvents(initEvent);
                }

                self.loading = false;
            });

        },
        loadData: function(callback) {
            switch (this.queryData.tab) {
                case "end":
                    ModUser.getMyAlreadyAnnounced(this.page, callback);
                    break;
                case "going":
                    ModUser.getMyUnderway(this.page, callback);
                    break;
                default:
                    ModUser.getMyIndiana(this.page, callback);

            }
        }
    };

    return BuyRecord;

});