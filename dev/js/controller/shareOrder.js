define(['util',
    'ui',
    'config',
    'pageSwitch',
    'module/shareOrder',
    'view/common',
    'ctrl/weixin'
], function(Util, UI, Config, pageSwitch, ModShareOrder, View, WeiXin) {
    var bindings = [];
    var initEvent = [{
        element: window,
        event: 'scroll',
        handler: function(e) {
            var pos = $('#shareOrderMore')[0].getBoundingClientRect();

            if ($('#shareOrderMore').is(':visible') && ShareOrder.hasMore &&
                ((pos.top > 0 && window.innerHeight - pos.top > 0) ||
                    (pos.top <= 0 && pos.bottom >= 0))) {
                ShareOrder.loadMore();
            }
        }
    }];

    var ShareOrder = {
        data: [],
        page: 0,
        id: 0,
        hasMore: true,
        loading: false,
        init: function() {
            Util.unBindEvents(initEvent);

            UI.loading();

            var self = this;

            this.id = Util.getQueryString('id') || 0;
            this.uid = Util.getQueryString('uid') || 0;

            this.page = 0;

            this.hasMore = true;

            this.loading = false;

            function initCallback(data) {
                if(!!self.uid){
                    data.uid = self.uid;
                }else{
                    data.id = self.id;
                }

                View.initAllShareOrder(data);

                self.page++;

                if (data && data.item && data.item.length > 0) {

                    Util.bindEvents(initEvent);

                    $(window).trigger('scroll');

                } else {

                    self.hasMore = false;

                    $('#shareOrderMore').html('还没有晒单记录');

                }

                UI.loading(-1);

            }
            if (this.uid != 0) {
                ModShareOrder.getListByUID(this.uid, this.page, 10, initCallback);
            } else {
                ModShareOrder.getList(this.id, this.page, 10, initCallback);
            }

        },
        loadMore: function() {
            if (this.loading) {
                return;
            }

            var self = this;

            this.loading = true;

            if (this.uid != 0) {
                ModShareOrder.getListByUID(this.uid, this.page, 10, this.loadCallback);
            } else {
                ModShareOrder.getList(this.id, this.page, 10, this.loadCallback);
            }
        },
        loadCallback: function(data) {

            if (data && data.item && data.item.length > 0) {

                self.page++;

                View.appendShareOrderList(data);

            } else {

                Util.unBindEvents(initEvent);

                self.hasMore = false;

                $('#shareOrderMore').html('没有更多了');

            }

            self.loading = false;

        }

    };

    return ShareOrder;

});