define(['util',
    'ui',
    'hbs',
    'module/user',
    'module/addrList',
    'view/common',
    'ctrl/weixin'
], function(Util, UI, HBS, ModUser, ModAddrList, View, WeiXin) {
    var bindings = [{
        element: '#addAddress',
        event: 'click',
        handler: function(e) {
            e.preventDefault();
            Address.setAddressEdit();
        }
    }, {
        element: '#addressForm',
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

            if ($('[name="addressId"]', $_this).length > 0) {
                obj.addressId = $('[name="addressId"]', $_this).val();
                if ($('[name="default"]').prop('checked')) {
                    obj.default = true;
                } else {
                    obj.default = false;
                }
                ModUser.updateAddress(obj, function(res) {
                    UI.hideWaiting();
                    if (res.status == 200 && res.data.status == true) {
                        Address.refPage(function() {
                            UI.showToast('更新成功');
                            $("#addressForm").hide();
                            $("#addressListPage").show();
                        });
                    } else {
                        UI.showToast('更新失败，请重试');
                    }
                });
            } else {
                if (Object.keys(Address.addressList).length == 0) {
                    obj.default = true;
                } else if ($('[name="default"]').prop('checked')) {
                    obj.default = true;
                }
                ModUser.addAddress(obj, function(res) {
                    UI.hideWaiting();
                    if (res.status == 200 && res.data.status == true) {
                        Address.refPage(function() {
                            UI.showToast('添加成功');
                            $("#addressForm").hide();
                            $("#addressListPage").show();
                        });
                    } else {
                        UI.showToast('添加失败，请重试');
                    }
                });
            }

        }
    }, {
        element: '#page-address .m-user-addrList .item',
        event: 'click',
        handler: function(e) {
            e.preventDefault();
            var $_this = $(this),
                id = $_this.attr('data-id'),
                obj = Address.addressList[id];

            Address.setAddressEdit(obj);
        }
    }];

    var editBindings = [{
        element: '#addressForm [name="province"]',
        event: 'change',
        handler: function(e) {
            var pid = $(this).val();
            $('#addressForm [name="city"]').html(HBS.compile('{{#citiesList cities cityId}}{{/citiesList}}')({
                cities: ModAddrList.CitiesInParent[pid]
            })).trigger('change');
        }
    }, {
        element: '#addressForm [name="city"]',
        event: 'change',
        handler: function(e) {
            var pid = $(this).val();
            $('#addressForm [name="area"]').html(HBS.compile('{{#citiesList cities cityId}}{{/citiesList}}')({
                cities: ModAddrList.CitiesInParent[pid]
            }));
        }
    }, {
        element: '#addressForm .w-checkBar .w-bar-ext',
        event: 'click',
        handler: function(e) {
            var checkbox = $('#addressForm [name="default"]');
            if (checkbox.prop('checked')) {
                checkbox.prop('checked', false);
                $(this).closest('.w-checkBar').removeClass('w-checkBar-checked');
            } else {
                checkbox.prop('checked', true);
                $(this).closest('.w-checkBar').addClass('w-checkBar-checked');
            }
        }
    }, {
        element: '#addressForm #removeAddress',
        event: 'click',
        handler: function(e) {
            var id = $('#addressForm [name="addressId"]').val();
            UI.confirm('确认删除当前地址？', function() {
                UI.showWaiting('正在删除...');
                ModUser.delAddress(id, function(res) {
                    UI.hideWaiting();
                    if (res.status == 200 && res.data.status) {
                        $('#addressListPage .m-user-addrList .item[data-id="' + id + '"]').remove();
                        $('#addressForm').hide();
                        $('#addressListPage').show();
                    } else {
                        UI.showToast('删除失败，请重试');
                    }
                });
            });
        }
    }];

    var Address = {
        addressList: {},
        init: function() {

            UI.loading();

            if (!ModUser.isLogin) {
                replaceUrl('?c=login&r=' + encodeURIComponent(window.location.search));
                UI.loading(-1);
            } else {
                this.refPage();
            }

        },
        refPage: function() {
            var self = this;

            ModUser.getAddress(function(res) {
                if (res.status == 200) {
                    if (!!res.data && !!res.data.item && res.data.item.length > 0) {
                        self.addressList = Util.arrToObj(res.data.item, 'id');
                    } else {
                        self.addressList = {};
                    }
                    View.initAddress(res.data);
                }
                Util.bindEvents(bindings);
                UI.loading(-1);
            });
        },
        setAddressEdit: function(data) {

            View.setAddressEdit(this.getEditData(data),'#addressForm');

            Util.bindEvents(editBindings);

        },
        getEditData: function(data) {

            var data = data || {};

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

            return data;
        }

    };

    return Address;

});