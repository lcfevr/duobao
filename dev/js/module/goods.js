define(['util', 'config', 'utils/md5'], function(Util, Config, MD5) {
    var Goods = {
        allData: {},
        detail:{},
        intro:{},
        record:{},
        previousRecord:{},
        catgory: null,
        freeGoods: null,
        getList: function(formData, callback) {

            var key = Util.objToQueryString(formData);

            // if (Config.isCache && !!this.allData[key]) {
            //     callback && callback(this.allData[key]);
            //     return;
            // }

            // categoryid:商品类别id,传0选择所有类别的商品，默认为0
            // offset: 偏移量，默认为0
            // limit: 数据长度，默认为10
            // ordername:排序规则，可选值[1,2,3] 1:人气 2：上架时间 3：剩余人次
            // order:总需人数的排序,可选值[desc,asc];

            var self = this;

            $.ajax({
                url: Config.apiDomain + '/Goods/allGoods',
                type: 'POST',
                data: formData,
                dataType: 'json',
                success: function(res) {
                    if (res.status == 200) {
                        self.allData[key] = res.data;
                        callback && callback(res.data);
                    }
                }
            });
        },
        getCatgory:function(callback){
            if(!!this.catgory){
                callback && callback(this.catgory);
                return;
            }

            var self = this;

            $.ajax({
                url: Config.apiDomain + '/Goods/getCategory',
                type: 'POST',
                dataType: 'json',
                success: function(res) {
                    if (res.status == 200) {
                        self.catgory = res.data;
                        callback && callback(res.data);
                    }
                }
            });
        },
        getFreeGoods:function(callback){
            if(!!this.freeGoods){
                callback && callback(this.freeGoods);
                return;
            }
            var self = this;
            $.ajax({
                url: Config.apiDomain + '/Goods/getFreeGoods',
                type: 'POST',
                dataType: 'json',
                success: function(res) {
                    if (res.status == 200) {
                        self.freeGoods = res.data;
                        callback && callback(res.data);
                    }
                }
            });
        },
        getDetail:function(id,callback){

            var self = this;

            $.ajax({
                url: Config.apiDomain + '/Goods/getGoodsById',
                type: 'POST',
                data:{
                    id:id
                },
                dataType: 'json',
                success: function(res) {
                    if (res.status == 200) {
                        self.detail[id] = res.data.message;
                        callback && callback(res.data.message);
                    }
                }
            });
        },
        addShareRecode:function(uid,id,fun_name,callback){
            var code = MD5.hex_md5(uid+id+fun_name);
            $.ajax({
                url: Config.apiDomain + '/Goods/addShareRecode',
                type: 'POST',
                data:{
                    uid:uid,
                    id:id,
                    fun_name:fun_name,
                    code:code
                },
                dataType: 'json',
                success: function(res) {
                    if (res.status == 200) {
                        callback && callback(res.msg);
                    }
                }
            });
        },
        getIntro:function(id,callback){

            if(!!this.intro[id]){
                callback && callback(this.intro[id]);
                return;
            }

            var self = this;

            $.ajax({
                url: Config.apiDomain + '/Goods/getGoodContentById',
                type: 'POST',
                data:{
                    id:id
                },
                dataType: 'json',
                success: function(res) {
                    if (res.status == 200) {
                        self.intro[id] = res.data;
                        callback && callback(res.data);
                    }
                }
            });
        },
        getPreviousRecord:function(param,callback){
            var id = param.offset;
            if(!!this.previousRecord[id]){
                callback && callback(this.previousRecord[id]);
                return;
            }

            var self = this;

            $.ajax({
                url: Config.apiDomain + '/Goods/previousRecord',
                type: 'POST',
                data: param,
                dataType: 'json',
                success: function(res) {
                    if (res.status == 200) {
                        self.previousRecord[id] = res.data;
                        callback && callback(res.data);
                    }
                }
            });
        },
        getRecord:function(formData,callback){
            var self = this,
                key = Util.objToQueryString(formData);

            if(!!this.record[key]){
                callback && callback(this.record[key]);
                return;
            }


            $.ajax({
                url: Config.apiDomain + '/Goods/inRecordOfGoods',
                type: 'POST',
                data:formData,
                dataType: 'json',
                success: function(res) {
                    if (res.status == 200) {
                        self.record[key] = res.data;
                        callback && callback(res.data);
                    }
                }
            });
        },
        calculate:{},
        getCheckCalculateDetail:function(gid,callback){
            var self = this;

            if(!!this.calculate[gid]){
                callback && callback(this.calculate[gid]);
                return;
            }

            $.ajax({
                url: Config.apiDomain + '/Goods/checkCalculateDetail',
                type: 'GET',
                data:{
                    gid:gid
                },
                dataType: 'json',
                success: function(res) {
                    if (res.status == 200) {
                        self.calculate[gid] = res.data;
                        callback && callback(res.data);
                    }
                }
            });
        },
        getLatest:function(formData,callback){
            var self = this;

            $.ajax({
                url: Config.apiDomain + '/Goods/get_latest',
                type: 'GET',
                data:formData,
                dataType: 'json',
                success: function(res) {
                    if (res.status == 200) {
                        callback && callback(res.data);
                    }
                }
            });
        }
    };

    return Goods;
});