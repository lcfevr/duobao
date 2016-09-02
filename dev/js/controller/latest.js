define(['util',
    'ui',
    'config',
    'module/goods',
    'pageSwitch',
    'view/common',
    'ctrl/weixin'
], function(Util, UI, Config, ModGoods, pageSwitch , View, WeiXin) {
    var initEvent = [{
        element: window,
        event: 'scroll',
        handler: function(e) {
            var pos = $('#latestListMore')[0].getBoundingClientRect();

            if (Latest.hasMore &&
                ((pos.top > 0 && window.innerHeight - pos.top > 0) ||
                (pos.top <= 0 && pos.bottom >= 0))) {
                Latest.loadMore();
            }
        }
    }];

    var Latest = {
        data: [],
        formData: {},
        page: 0,
        limit: 10,
        hasMore: true,
        loading: false,
        init:function(data){
            UI.loading();

            this.page = 0;

            this.hasMore = true;

            this.loading = false;

            Util.unBindEvents(initEvent);

            ModGoods.getLatest(this.getFormData(),function(data){
                Util.bindEvents(initEvent);
                View.initLatest(data);
                UI.loading(-1);
            });
            this.page = 1;
        },
        loadMore: function() {

            if (this.loading) {
                return;
            }

            var self = this;

            this.loading = true;
            ModGoods.getLatest(this.getFormData(), function(data) {

                if (data && data.item && data.item.length > 0) {

                    self.page++;
                    self.getFormData();

                    View.appendLatestList(data);

                } else {

                    Util.unBindEvents(initEvent);

                    self.hasMore = false;

                    $('#latestListMore').html('最多查看最新50条的揭晓记录');

                }

                self.loading = false;

            });
        },
        getFormData: function() {
            var obj = {};
            obj.offset = this.page * this.limit;
            obj.limit = this.limit;
            this.formData = obj;
            return this.formData;
        }
    };


    return Latest;

});