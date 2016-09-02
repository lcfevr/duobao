define(['util',
    'ui',
    'config',
    'utils/md5',
    'module/user',
    'module/member',
    'view/common',
    'ctrl/weixin'
], function(Util, UI, Config, MD5, ModUser, ModMember, View, WeiXin) {
    var bindings = [{
        element: '#page-profile .w-nav-hasBorder .w-nav-item',
        event: 'click',
        handler: function(e) {
            e.preventDefault();
            if($(this).hasClass('w-nav-item-on')){
                return false;
            }
            openUrl($(this).attr('data-tabhref'));
        }
    }]; 

    var initEvent = [{
        element: window,
        event: 'scroll',
        handler: function(e) {
            var pos = $('#profileListMore')[0].getBoundingClientRect();

            if ($('#profileListMore').is(':visible') && Profile.hasMore &&
                ((pos.top > 0 && window.innerHeight - pos.top > 0) ||
                    (pos.top <= 0 && pos.bottom >= 0))) {
                Profile.loadMore();
            }
        }
    }];


    function loadRecord() {
        if (this.loading) {
            return;
        }

        var self = this;

        this.loading = true;
        ModMember.getBuyRecord(this.queryData.id, this.page, function(data) {
            if (data.status == 200 && data.data && data.data.item && (!!data.data.item.alreadyannounced || !!data.data.item.underway)) {
                var arr = [];
                if(!!data.data.item.underway && data.data.item.underway.length>0){
                    arr = arr.concat(data.data.item.underway);  
                }
                if(!!data.data.item.alreadyannounced && data.data.item.alreadyannounced.length>0){
                    arr = arr.concat(data.data.item.alreadyannounced);  
                }
                data.data.item = arr;
                self.page++;

                View.appendProfileRecord(data.data);
            }else if(self.page==0){
                Util.unBindEvents(initEvent);
                self.hasMore = false;
                $('#profileListMore').html('该用户还没有夺宝记录');
            }else{
                Util.unBindEvents(initEvent);
                self.hasMore = false;
                $('#profileListMore').html('没有更多了');
            }
            self.loading = false;
        });
    }
    function loadWin(){
        if (this.loading) {
            return;
        }

        var self = this;

        this.loading = true;

        ModMember.getWinRecord(this.queryData.id, this.page, function(data) {
            if (data.status == 200 && data.data && data.data.item && data.data.item.length > 0) {

                self.page++;

                View.appendProfileWin(data.data);
                if(data.data.item.length < 10){
                    Util.unBindEvents(initEvent);

                    self.hasMore = false;

                    $('#profileListMore').html('没有更多了');
                }
            }else if(self.page==0){
                $('#profileListMore').html('该用户还没有中奖记录');
            }
            self.loading = false;
        });
        
    }

    function loadShare(){
        if (this.loading) {
            return;
        }

        var self = this;

        this.loading = true;

        ModMember.getShareList(this.queryData.id, this.page, function(data) {
            if (data.status == 200 && data.data && data.data.item && data.data.item.length > 0) {

                self.page++;

                View.appendProfileShare(data.data);
                if(data.data.item.length < 10){
                    Util.unBindEvents(initEvent);

                    self.hasMore = false;

                    $('#profileListMore').html('没有更多了');
                }
            }else if(self.page==0){
                $('#profileListMore').html('该用户还没有晒单记录');
            }
            self.loading = false;
        });
        
    }

    var Profile = {
        page:0,
        queryData:{},
        loading:false,
        hasMore:true,
        init: function() {
            var self = this;
            this.queryData = Util.getQueryData(window.location.href);
            this.page = 0;
            this.loading = false;
            this.hasMore = true;
            Util.unBindEvents(initEvent);
            // UI.loading();
            ModMember.getOtherMessage(this.queryData.id,function(res){
                if(res.status == 200 && res.data && res.data.user){
                    View.initProfile(res.data.user);

                    Util.bindEvents(bindings);
                    Util.bindEvents(initEvent);

                    self.loadMore();
                }
            });
            // UI.loading(-1);
        },
        loadMore:function(){
            switch(this.queryData.tab){
                case "win":
                    loadWin.call(this);
                    break;
                case "share":
                    loadShare.call(this);
                    break;
                default:
                    loadRecord.call(this);
            }
        }

    };

    return Profile;

});