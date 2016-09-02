define(['util',
    'ui',
    'config',
    'pageSwitch',
    'module/goods',
    'view/common',
    'ctrl/weixin'
], function(Util, UI, Config, pageSwitch, ModGoods, View, WeiXin) {
    var initEvent = [{
        element: window,
        event: 'scroll',
        handler: function(e) {
            var pos = $('#recordListMore')[0].getBoundingClientRect();

            if (PreviousRecord.hasMore &&
                ((pos.top > 0 && window.innerHeight - pos.top > 0) ||
                    (pos.top <= 0 && pos.bottom >= 0))) {
                PreviousRecord.loadMore();
            }
        }
    }];

    var PreviousRecord = {
        id : '',
        data: [],
        formData: {},
        parms: [],
        page: 0,
        limit: 10,
        hasMore: true,
        loading: false,
        init: function() {

            UI.loading();

            this.page = 0;

            this.hasMore = true;

            this.loading = false;

            Util.unBindEvents(initEvent);

            ModGoods.getPreviousRecord(this.getFormData(),function(data) {
                Util.bindEvents(initEvent);
                View.initPreviousRecord(data);
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
            ModGoods.getPreviousRecord(this.getFormData(), function(data) {

                if (data && data.item && data.item.length > 0) {

                    self.page++;
                    self.getFormData();

                    View.appendPreviousRecordList(data);

                } else {

                    Util.unBindEvents(initEvent);

                    self.hasMore = false;

                    $('#recordListMore').html('没有更多了');

                }

                self.loading = false;

            });
        },
        getFormData: function() {
            var obj = {};
            obj.offset = this.page * this.limit;
            obj.limit = this.limit;
            obj.id = Util.getQueryString('id');
            this.formData = obj;
            return this.formData;
        }
    };

    return PreviousRecord;

});