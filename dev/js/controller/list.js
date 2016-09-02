define(['util',
    'ui',
    'config',
    'pageSwitch',
    'module/goods',
    'view/common',
    'ctrl/weixin'
], function(Util, UI, Config, pageSwitch, ModGoods, View, WeiXin) {
    function toggleMenu() {
        var isOpen = $('#page-list .m-list-nav-catlog a').hasClass('open');
        if (isOpen) {
            $('#page-list .m-list-nav-catlog a i').removeClass('ico-arrow-down').addClass('ico-arrow-up');
            $('#page-list .m-list-catlog,#page-list .g-body-bd-mask').show();
        } else {
            $('#page-list .m-list-nav-catlog a i').removeClass('ico-arrow-up').addClass('ico-arrow-down');
            $('#page-list .m-list-catlog,#page-list .g-body-bd-mask').hide();
        }
    };

    var bindings = [{
        element: '#page-list .m-list-nav-catlog a',
        event: 'click',
        handler: function(e) {
            $(this).toggleClass('open');
            toggleMenu();
        }
    }, {
        element: '#page-list .g-body-bd-mask',
        event: 'click',
        handler: function(e) {
            $('#page-list .m-list-nav-catlog a').removeClass('open');
            toggleMenu();
        }
    }, {
        element: '#page-list .m-list-catlog-list li a',
        event: 'click',
        handler: function(e) {
            var $_this = $(this),
                $_li = $_this.closest('li');
            if ($_li.hasClass('selected')) {
                $('#page-list .m-list-nav-catlog a').removeClass('open');
                toggleMenu();
                return;
            }

            $('#page-list .m-list-catlog-list li').removeClass('selected');

            $_li.addClass('selected');

            if ($_this.attr('data-cid') == 'all') {
                $('#page-list .m-list-nav-catlog').addClass('selected');
                delete List.formData.categoryid;
            } else {
                $('#page-list .m-list-nav-catlog').removeClass('selected');
                List.formData.categoryid = $_this.attr('data-cid');
            }
            
            $('#page-list .m-list-nav-catlog a span').text($_this.text());


            $('#page-list .m-list-nav-catlog a').removeClass('open');
            toggleMenu();

            List.reInit();
        }
    }, {
        element: '#page-list .m-list-types-list li a',
        event: 'click',
        handler: function(e) {
            var $_this = $(this),
                $_li = $_this.closest('li');

            if ($_li.hasClass('selected')&& !($_li.hasClass('down') || $_li.hasClass('up'))) {
                $('#page-list .m-list-nav-catlog a').removeClass('open');
                toggleMenu();
                return;
            }

            var oname = $_this.attr('data-oname');
            if(oname && !isNaN(oname)){
                delete List.formData.order;
                List.formData.ordername = oname;
            }else{
                delete List.formData.ordername;
                if($_li.hasClass('up')){
                    $_li.removeClass('up').addClass('down');
                    List.formData.order = 'desc';
                }else{
                    $_li.removeClass('down').addClass('up');
                    List.formData.order = 'asc';
                }
            }

            $('#page-list .m-list-types-list li').removeClass('selected');

            $_li.addClass('selected');

            $('#page-list .m-list-nav-catlog a').removeClass('open');
            toggleMenu();

            List.reInit();
        }
    }];

    var initEvent = [{
        element: window,
        event: 'scroll',
        handler: function(e) {
            var pos = $('#listMore')[0].getBoundingClientRect();

            if ($('#listMore').is(':visible') && List.hasMore &&
                ((pos.top > 0 && window.innerHeight - pos.top > 0) ||
                    (pos.top <= 0 && pos.bottom >= 0))) {
                List.loadMore();
            }
        }
    }];

    var List = {
        data: [],
        formData: {},
        parms: ['categoryid', 'ordername', 'order'],
        page: 0,
        limit: 10,
        hasMore: true,
        loading: false,
        init: function() {

            UI.loading();

            var self = this;

            ModGoods.getCatgory(function(category) {

                self.initListData(function(json) {

                    View.initList({
                        category: category.item,
                        data: json.item,
                        formData: self.formData
                    });

                    if(json && json.item && json.item.length > 0){
                        $(window).trigger('scroll');
                    }

                    Util.bindEvents(bindings);

                    UI.loading(-1);
                });

            });
        },
        initListData: function(callback) {

            Util.unBindEvents(initEvent);

            var self = this;

            this.page = 0;

            this.hasMore = true;

            this.loading = false;

            this.getFormData();

            ModGoods.getList(self.formData, function(json) {

                self.page++;

                self.getFormData();

                Util.bindEvents(initEvent);

                callback && callback(json);

            });

        },
        reInit: function() {

            UI.showWaiting();

            var self = this,
                obj = {c:'list'},
                queryString = '';
            
            for (var i = 0; i < this.parms.length; i++) {
                if (this.formData.hasOwnProperty(this.parms[i])) {
                    obj[this.parms[i]] = this.formData[this.parms[i]];
                }
            };

            queryString = Util.objToQueryString(obj);

            history.replaceState(history.state, null, '?'+queryString);

            this.initListData(function(data){

                View.clearList(data);

                if(data.item && data.item.length > 0){
                    $('#listMore').html('<div class="w-more" id="listMore"><b class="ico ico-loading"></b> 努力加载中</div>');
                    $(window).trigger('scroll');
                }else{
                    $('#listMore').html('暂无商品');
                }
                UI.hideWaiting();

            });

        },
        loadMore: function() {
            if (this.loading) {
                return;
            }

            var self = this;

            this.loading = true;

            ModGoods.getList(this.formData, function(data) {

                if (data && data.item && data.item.length > 0) {

                    self.page++;
                    self.getFormData();

                    View.appendList(data);

                } else {

                    Util.unBindEvents(initEvent);

                    self.hasMore = false;

                    $('#listMore').html('没有更多了');

                }

                self.loading = false;

            });
        },
        getFormData: function() {
            var obj = {},
                queryData = Util.getQueryData(window.location.search);
            if(!queryData.ordername){
                queryData.ordername = '2';
            }
            for (var i = 0; i < this.parms.length; i++) {
                if (queryData.hasOwnProperty(this.parms[i])) {
                    obj[this.parms[i]] = queryData[this.parms[i]];
                }
            };
            obj.offset = this.page * this.limit;
            obj.limit = this.limit;
            this.formData = obj;
            return this.formData;
        }
    };
    return List;

});