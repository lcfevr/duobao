define(['util',
    'ui',
    'hbs',
    'config',
    'module/user',
    'module/addrList',
    'view/common',
    'ctrl/weixin'
], function(Util, UI, HBS, Config, ModUser, ModAddrList, View, WeiXin) {

    function bindFileEvent(ele){
        var el = ele || $('#photoList .photo-file-wrap');
        Util.bindEvents([{
            element: $('.photo-file input[type="file"]',el),
            event: 'change',
            handler: bindFile
        },{
            element: $('.w-button-addToCart',el),
            event: 'click',
            handler: bindDelFile
        }]);
    }
    
    function appendFile(){
        if($('#photoList .file-normal').length == 0 && $('#photoList .photo-file-wrap').length < 3){
            var newFile = $('<div class="photo-file-wrap file-normal"><div class="photo-file"><img src="images/add.png"><input type="file" accept="image/*"></div><a class="w-button w-button-round w-button-addToCart" href="javascript:;"></a></div>');

            $('#photoList').append(newFile);

            bindFileEvent(newFile);
        }
    }

    function bindFile(e){
        var $_this = $(this);

        var reader = new FileReader();
        
        UI.showWaiting();
        reader.onload = function(e){
        
            UI.hideWaiting();

            $_this.closest('.photo-file-wrap').removeClass('file-normal').addClass('has-img').find('img').attr('src', this.result);
        
            appendFile();
        
        };

        reader.readAsDataURL(this.files[0]);
    }

    function bindDelFile(e){
        var $_wrap = $(this).closest('.photo-file-wrap');
        $_wrap.remove();
        appendFile();
    }

    var bindings = [{
        element: '#shareForm',
        event: 'submit',
        handler: function(e) {
            e.preventDefault();
            var $_this = $(this),
                formData = {};
                formData.title = $.trim($('[name="title"]',$_this).val());
                formData.content = $.trim($('[name="content"]',$_this).val());
                formData.goodsId = $.trim($('[name="goodsId"]',$_this).val());
                formData.photoList = [],
                $_img = $('#photoList .has-img img');
            if(formData.title == ''){
                UI.showToast('请输入标题');
                return false;
            }else if(formData.title.length < 6){
                UI.showToast('标题不应少于6个字');
                return false;
            }
            if(formData.content == ''){
                UI.showToast('请输入获奖感言');
                return false;
            }else if(formData.content.length < 6){
                UI.showToast('获奖感言不应少于30个字');
                return false;
            }

            if($_img.length == 0){
                UI.showToast('请上传一张宝贝照片');
                return false;
            }

            $_img.each(function(i,e){
                formData.photoList.push($(e).attr('src'));
            });
            formData.photoList = JSON.stringify(formData.photoList);
            UI.showWaiting();
            ModUser.setShareOrder(formData,function(res){
                UI.hideWaiting();
                if(res.status == 200 && res.data.result){
                    if(res.data.result=='special_goods'){
                        UI.confirm('晒单成功',function(){
                            hisBack();
                        });
                    }else if(res.data.result=='normal_goods'){
                        UI.confirm('晒单成功,获得积分,朋友圈分享中奖商品将再得20积分！',function(){
                            window.location.href = window.location.href.split('?')[0] + '?c=detail&id=' + formData.goodsId;
                        });
                    }

                }else{
                    UI.showToast(res.msg||'晒单失败，请重试');
                }
            });
        }
    }];

    var ShareEdit = {
        queryData:{},
        init: function() {

            var self = this;

            this.queryData = Util.getQueryData(window.location.search);

            if (!this.queryData.id) {
                hisBack();
                return;
            }

            View.initShareEdit(this.queryData);

            bindFileEvent();

            Util.bindEvents(bindings);
        }

    };

    return ShareEdit;

});