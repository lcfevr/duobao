define(['util', 'config'], function(Util, Config) {
    var Member = {
        get: function(url, data, callback) {
            $.ajax({
                url: url,
                type: 'POST',
                data: data,
                dataType: 'json',
                success: function(res) {
                    callback && callback(res);
                },
                error: function(e) {
                    callback && callback(e);
                }
            });
        },
        getData: function(url, id, page, callback) {
            this.get(url,{
                id: id,
                limit: 10,
                offset: (page || 0) * 10
            },callback);

            // $.ajax({
            //     url: url,
            //     type: 'POST',
            //     data: {
            //         id: id,
            //         limit: 10,
            //         offset: (page || 0) * 10
            //     },
            //     dataType: 'json',
            //     success: function(res) {
            //         callback && callback(res);
            //     },
            //     error: function(e) {
            //         callback && callback(e);
            //     }
            // });
        },
        getBuyRecord: function(id, page, callback) {
            // /Member/getUserBuyRecord
            // this.getData(Config.apiDomain + '/Member/getOtherBuyRecord', id, page, callback);
            this.getData(Config.apiDomain + '/Member/getOtherBuyRecord', id, page, callback);
        },
        getWinRecord: function(id, page, callback) {
            // /Member/getUserWinRecord
            this.getData(Config.apiDomain + '/Member/getUserWinRecord', id, page, callback);
        },
        getShareList: function(id, page, callback) {
            // /Shareorder/getUserShareByUID
            this.getData(Config.apiDomain + '/Shareorder/getUserShareByUID', id, page, callback);
        },
        getBuyCount: function(id,callback) {
            // /Member/getUserBuyCount
            this.get(Config.apiDomain + '/Member/getUserBuyCount', {id:id}, callback);
        },
        getWinCount: function(id,callback) {
            // /Member/getUserWinCount
            this.get(Config.apiDomain + '/Member/getUserWinCount', {id:id}, callback);
        },
        getMyIndiana: function(id,page, callback) {
            // {
            //     limit: 10,
            //     offset: (page || 0) * 10
            // }

            this.get(Config.apiDomain + '/Member/OtherBuyRecord', {id:id}, callback);
        },
        otherUser:{},
        getOtherMessage: function(id,callback) {
            var self = this;
            if(this.otherUser[id]){
                callback && callback(this.otherUser[id]);
                return ;
            }

            $.ajax({
                url: Config.apiDomain + '/Member/getOtherMessage',
                type: 'GET',
                data: {
                    id:id
                },
                dataType: 'json',
                success: function(res) {
                    self.otherUser[id] = res;
                    callback && callback(res);
                },
                error: function(e) {
                    callback && callback(e);
                }
            });
        }

    };

    return Member;
});