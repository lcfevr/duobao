define(['util', 'config'], function(Util, Config) {
    var ShareOrder = {
        allData: {},
        details:{},
        getList: function(id, page, limit, callback) {
            // if(!!id && id != 0){
            //     this.getListByUID(id, page, limit, callback);
            //     return;
            // }

            var id = id || 0,
                page = page || 0,
                limit = limit || 10,
                key = 'id' + id + 'page' + page + 'limit' + limit;
            if (Config.isCache && !!this.allData[key]) {
                callback && callback(this.allData[key]);
                return;
            }

            var self = this;

            $.ajax({
                url: Config.apiDomain + '/Shareorder/all',
                type: 'POST',
                data: {
                    id: id,
                    offset: limit * page,
                    limit: limit
                },
                dataType: 'json',
                success: function(res) {
                    if (res.status == 200) {
                        self.allData[key] = res.data;
                        callback && callback(res.data);
                    }
                }
            });
        },
        
        getListByUID: function(id, page, limit, callback) {
            var id = id || 0,
                page = page || 0,
                limit = limit || 10,
                key = 'id' + id + 'page' + page + 'limit' + limit;
            if (Config.isCache && !!this.allData[key]) {
                callback && callback(this.allData[key]);
                return;
            }

            var self = this;

            $.ajax({
                url: Config.apiDomain + '/Shareorder/getUserShareByUID',
                type: 'POST',
                data: {
                    id: id,
                    offset: limit * page,
                    limit: limit
                },
                dataType: 'json',
                success: function(res) {
                    if (res.status == 200) {
                        self.allData[key] = res.data;
                        callback && callback(res.data);
                    }
                }
            });

        },

        getShareDetail:function(id,callback){

            if(!!this.details[id]){
                callback && callback(this.details[id]);
                return;
            }

            var self = this;

            $.ajax({
                url: Config.apiDomain + '/Shareorder/getShareOrderById',
                type: 'POST',
                data:{
                    id:id
                },
                dataType: 'json',
                success: function(res) {
                    if (res.status == 200) {
                        self.details[id] = !!res.data.item ? res.data.item[0] : null;
                        callback && callback(self.details[id]);
                    }else{
                        callback && callback();
                    }
                }
            });
        }
    };

    return ShareOrder;
});