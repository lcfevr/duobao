define(['util',
    'ui',
    'config',
    'module/user',
    'module/member',
    'view/common',
    'ctrl/weixin'
], function(Util, UI, Config, ModUser, ModMember, View, WeiXin) {
    var initEvent = [{
        element: window,
        event: 'scroll',
        handler: function(e) {
            var pos = $('#winRecordMore')[0].getBoundingClientRect();

            if (WinRecord.hasMore &&
                ((pos.top > 0 && window.innerHeight - pos.top > 0) ||
                    (pos.top <= 0 && pos.bottom >= 0))) {
                WinRecord.loadMore();
            }
        }
    }];

    var WinRecord = {
        page: 0,
        limit: 10,
        hasMore: true,
        loading: false,
        init: function() {
            Util.unBindEvents(initEvent);

            this.page = 0;
            
            this.hasMore = true;
            
            this.loading = false;
            
            if(!ModUser.isLogin){
                UI.alert('登录失效，请重新登录',function(){
                    replaceUrl('?c=login&r='+ encodeURIComponent(window.location.search))
                });
                return;
            }

            var self = this,
                id = Util.getQueryString('id');

            
            View.initWinRecord();
            Util.bindEvents(initEvent);
            this.loadMore();
            
        },
        loadMore: function() {
            if (this.loading) {
                return;
            }

            var self = this,
                id = Util.getQueryString('id');

            this.loading = true;

            ModUser.getWinRecord(this.page, function(data) {

                if(data.status==200&&!!data.data&&!!data.data.item&&data.data.item.length > 0){

                    self.page++;
                    
                    /* 新增 */
                    data.data.token = ModUser.token;
                    data.data.apiDomain = Config.apiDomain;

                    View.appendWinRecord(data.data);

                    if(data.data.item.length < 10){
                        self.hasMore = false;
                        Util.unBindEvents(initEvent);
                        $('#winRecordMore').html('没有更多了');
                    }

                } else if(data.status == 403){
                    UI.alert('登录失效，请重新登录',function(){
                        replaceUrl('?c=login&r='+ encodeURIComponent(window.location.search))
                    });
                } else {

                    Util.unBindEvents(initEvent);

                    self.hasMore = false;
                    if(self.page == 0){
                        $('#winRecordMore').html('暂无中奖纪录');
                    }else{
                        $('#winRecordMore').html('没有更多了');
                    }

                }

                self.loading = false;

            });
        }
    };

    return WinRecord;

});