define(['util',
    'ui',
    'hbs',
    'config',
    'module/user',
    'module/addrList',
    'view/common',
    'ctrl/weixin'
], function(Util, UI, HBS, Config, ModUser, ModAddrList, View, WeiXin) {

    var bindList = [{
        element: '#page-win-detail #winAddrList .item',
        event: 'click',
        handler: function(e) {
            e.preventDefault();
            if ($(this).hasClass('selected')) {
                return false;
            }
            $('#page-win-detail #winAddrList .item').removeClass('selected');
            $(this).addClass('selected');
        }
    }];

    var checkEvent = [{
        element: '#page-win-detail #winCheckAddr',
        event: 'click',
        handler: function(e) {
            e.preventDefault();
            if (!!WinDetail.addrList) {

                WinDetail.setList({
                    item: WinDetail.addrList,
                    id: WinDetail.addrId
                });
                $('#page-win-detail #winAddList').show();
                $('#page-win-detail #winMain').hide();
            } else {
                UI.showWaiting();

                WinDetail.getAddrList(function() {
                    $('#page-win-detail #winAddList').show();
                    $('#page-win-detail #winMain').hide();
                    UI.hideWaiting();
                });
            }
        }
    }, {
        element: '#page-win-detail #winAddrSure',
        event: 'click',
        handler: function(e) {
            e.preventDefault();
            var addrId = $(this).attr('data-addrid');

            WinDetail.updateAddr(addrId);
        }
    }];

    var bindings = [{
        element: '#page-win-detail #winAddrBtn',
        event: 'click',
        handler: function(e) {
            e.preventDefault();
            var id = $('#page-win-detail #winAddrList .selected[data-id]').attr('data-id');
            if (!id) {
                if ($('#page-win-detail #winAddrList .item').length == 1) {
                    id = $('#page-win-detail #winAddrList .item').eq(0).attr('data-id');
                } else {
                    UI.alert('请选择地址');
                    return false;
                }
            }

            if (!!id) {
                var obj = WinDetail.addrObj[id];
                var html = '';
                WinDetail.addrId = id;

                html += '<div class="m-user-addrList"><div class="item default selected"><div class="name">' + obj.consignee + '</div>'

                html += '<div class="mobile">' + obj.phone + '</div>';
                html += '<div class="detail">';
                if (!!obj['default']) {
                    html += '<span class="m-user-link dftTag">[默认]</span> ';
                }
                html += obj.province + obj.city + obj.area + obj.address + '</div></div></div>';
                if(WinDetail.isCheckAddr){
                    html += '<div class="opt"><button class="w-button w-button-main w-button-s" id="winCheckAddr">修改地址</button></div>';
                }else{
                    html += '<div class="opt"><button class="w-button w-button-main w-button-s" id="winAddrSure" data-addrid="' + obj.id + '">确认</button>';
                    html += '<button class="w-button w-button-gray w-button-s" id="winCheckAddr">使用其他</button></div>';
                }

                $('#addrCont').html(html);
                Util.bindEvents(checkEvent);
            }

            $('#page-win-detail #winAddList').hide();
            $('#page-win-detail #winMain').show();
            if(WinDetail.isCheckAddr){
                WinDetail.updateAddr(id);
            }

        }
    }, {
        element: '#page-win-detail #winAddAddrBtn',
        event: 'click',
        handler: function(e) {
            e.preventDefault();

            $('#page-win-detail #winAddList').hide();
            $('#page-win-detail #winAddAddr').show().attr('data-from', '#winAddList');

        }
    }, {
        element: '#page-win-detail #winNoAdd',
        event: 'click',
        handler: function(e) {
            e.preventDefault();

            $('#page-win-detail #winMain').hide();
            $('#page-win-detail #winAddAddr').show().attr('data-from', '#winMain');

        }
    }, {
        element: '#page-win-detail #winReceipt',
        event: 'click',
        handler: function(e) {
            e.preventDefault();

            var $_this = $(this);

            ModUser.confirmGetGoods(WinDetail.queryData.id,function(res){
                if(res.status == 200 && !!res.data){
                    UI.showToast('成功收货');
                    $_this.closest('.m-user-progress-item').removeClass('on wait').addClass('over').next('.m-user-progress-item').addClass('on wait');
                    $_this.remove();
                }else{
                    UI.showToast('提交失败，请重试');
                }
            });

        }
    }, {
        element: '#page-win-detail #winAddAddr .m-simpleHeader-back',
        event: 'click',
        handler: function(e) {
            e.preventDefault();
            var id = $('#page-win-detail #winAddAddr').attr('data-from');
            $('#page-win-detail ' + id).show();
            $('#page-win-detail #winAddAddr').hide();

        }
    }, {
        element: '#winAddAddr',
        event: 'submit',
        handler: function(e) {
            e.preventDefault();
            // var content = "湖南省:长沙市:开福区:万达广场B座38010:410001:唐超:18570627957";
            var $_this = $(this),
                obj = {},
                arr = [],
                str = '';

            str = $.trim($('[name="province"]', $_this).val() || '');
            if (str != '') {
                arr.push(ModAddrList.Provinces[str][1]);
            } else {
                UI.showToast('请选择省份');
                return false;
            }

            str = $.trim($('[name="city"]', $_this).val() || '');
            if (str != '') {
                arr.push(ModAddrList.Cities[str][1]);
            } else {
                UI.showToast('请选择城市');
                return false;
            }

            str = $.trim($('[name="area"]', $_this).val() || '');
            if (str != '') {
                arr.push(ModAddrList.Cities[str][1]);
            } else {
                UI.showToast('请选择地区');
                return false;
            }

            str = $.trim($('[name="address"]', $_this).val() || '');
            if (str != '') {
                arr.push(str.replace(/:/, '：'));
            } else {
                UI.showToast('请填写详细地址');
                return false;
            }

            arr.push($.trim($('[name="zipcode"]', $_this).val() || ''));

            str = $.trim($('[name="name"]', $_this).val() || '');
            if (str == '') {
                UI.showToast('请填写收货人');
                return false;
            } else {
                arr.push(str.replace(/:/, '：'));
            }

            str = $.trim($('[name="phone"]', $_this).val() || '');
            if (str == '') {
                UI.showToast('请填写手机号');
                return false;
            } else if (!Util.isPhone(str)) {
                UI.showToast('手机号错误');
                return false;
            } else {
                arr.push(str.replace(/:/, '：'));
            }

            obj.content = arr.join(':');

            UI.showWaiting('正在提交');

            if (!WinDetail.addrList || WinDetail.addrList.length == 0) {
                obj.default = true;
            }

            ModUser.addAddress(obj, function(res) {
                UI.hideWaiting();
                if (res.status == 200 && res.data.status == true) {
                    WinDetail.getAddrList(function() {
                        UI.showToast('添加成功');
                        $('#page-win-detail #winAddList').show();
                        $('#page-win-detail #winAddAddr').hide();
                    });
                } else {
                    UI.showToast('添加失败，请重试');
                }
            });

        }
    }, {
        element: '#winAddAddr [name="province"]',
        event: 'change',
        handler: function(e) {
            var pid = $(this).val();
            $('#winAddAddr [name="city"]').html(HBS.compile('{{#citiesList cities cityId}}{{/citiesList}}')({
                cities: ModAddrList.CitiesInParent[pid]
            })).trigger('change');
        }
    }, {
        element: '#winAddAddr [name="city"]',
        event: 'change',
        handler: function(e) {
            var pid = $(this).val();
            $('#winAddAddr [name="area"]').html(HBS.compile('{{#citiesList cities cityId}}{{/citiesList}}')({
                cities: ModAddrList.CitiesInParent[pid]
            }));
        }
    }, {
        element: '#winAddAddr .w-checkBar .w-bar-ext',
        event: 'click',
        handler: function(e) {
            var checkbox = $('#winAddAddr [name="default"]');
            if (checkbox.prop('checked')) {
                checkbox.prop('checked', false);
                $(this).closest('.w-checkBar').removeClass('w-checkBar-checked');
            } else {
                checkbox.prop('checked', true);
                $(this).closest('.w-checkBar').addClass('w-checkBar-checked');
            }
        }
    }];

    var WinDetail = {
        queryData: {},
        addrList: null,
        addrObj: {},
        addrId: '',
        isCheckAddr:false,
        init: function() {

            UI.loading();

            var self = this;

            this.queryData = Util.getQueryData(window.location.search);

            if (!this.queryData.id) {
                hisBack();
                UI.loading(-1);
                return;
            }

            ModUser.getWinDetail(this.queryData.id, function(res) {
                if (res.status == 200 && res.data) {
                    if(!!res.data.consignee){
                        self.isCheckAddr = true;
                    }
                    if (!res.data.status) {
                        ModUser.getDefaultAddress(function(addres) {
                            if (addres.status == 200 && !!addres.data && !!addres.data.item.length > 0) {
                                res.data.defaultAddress = addres.data.item[0];
                                self.addrId = res.data.defaultAddress.id;
                            }

                            View.initWinDetail(res.data);
                            
                            self.setAddressEdit();

                            Util.bindEvents(bindings);

                            Util.bindEvents(checkEvent);

                        });
                    }else{

                        View.initWinDetail(res.data);

                        self.setAddressEdit();

                        Util.bindEvents(bindings);

                        Util.bindEvents(checkEvent);

                    }
                };

                UI.loading(-1);
            });
        },
        getAddrList: function(callback) {
            var self = this;
            ModUser.getAddress(function(res) {
                if (res.status == 200) {
                    if (!!res.data && !!res.data.item && res.data.item.length > 0) {
                        self.addrList = res.data.item;
                        self.addrObj = Util.arrToObj(res.data.item, 'id');
                        res.data.id = self.addrId;
                    } else {
                        self.addrObj = {};
                    }
                    self.setList(res.data);
                    callback && callback();
                }
            });
        },
        setList: function(data) {
            View.setWinAddrList(data);
            Util.bindEvents(bindList);
        },
        setAddressEdit: function() {

            var data = {
                nodd: true
            };

            if (data.province && ModAddrList.ProvincesCN[data.province]) {
                data.provinceId = ModAddrList.ProvincesCN[data.province][0];
                data.cities = ModAddrList.CitiesInParent[data.provinceId];
            }
            data.provincesList = ModAddrList.ProvincesList;

            if (data.city && ModAddrList.CitiesCN[data.city]) {
                data.cityId = ModAddrList.CitiesCN[data.city][0];
                data.areas = ModAddrList.CitiesInParent[data.cityId];
            }

            if (data.area && ModAddrList.CitiesCN[data.area]) {
                data.areaId = ModAddrList.CitiesCN[data.area][0];
            }

            View.setAddressEdit(data, '#winAddAddr');

        },
        updateAddr:function(addrId){
            var self = this,
                fn;
            if(this.isCheckAddr){
                fn = ModUser.updateGoodsSendAddr;
            }else{
                fn = ModUser.addGoodsSendAddr;
            }
            UI.showWaiting();
            fn.call(ModUser,WinDetail.queryData.id, addrId, function(res) {
                UI.hideWaiting();
                if (res.status == 200 && res.data) {
                    var html = "";
                    html += '<div class="m-user-winDetail-hd">收货信息</div><div class="m-user-addrList"><div class="item">';
                    html += '<div class="name">' + res.data.consignee + '</div>';
                    html += '<div class="mobile">' + res.data.mobile + '</div>';
                    html += '<div class="detail">' + res.data.address + res.data.street + '</div></div></div>';
                    $('#buyUserInfo').html(html);
                    UI.showToast('地址提交成功');

                    $('#winAddrSure').remove();
                    $('#winCheckAddr').html('修改地址').removeClass('w-button-gray').addClass('w-button-main');

                }else{
                    UI.showToast('地址提交失败');
                }
            });
        }

    };

    return WinDetail;

});