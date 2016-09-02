/**
 * Created by Sherry on 2016/8/25.
 */
define(['util',
    'ui',
    'config',
    'view/common',
    'module/service'
], function(Util, UI, Config, View,Service) {
    var bindings = [{
        element: '.showArticle',
        event: 'click',
        handler: function(e) {
            if($(this).hasClass('toggle')){
                $(this).removeClass('toggle').children('.w-bar-ext').css('-webkit-transform','rotate(0deg)');
            }else{
                $(this).addClass('toggle').css('-webkit-transform','rotate(0deg)').children('.w-bar-ext').css('-webkit-transform','rotate(90deg)');
                    $(this).siblings('.m-article ').hide();
                $(this).siblings('a').removeClass('toggle').children('.w-bar-ext').css('-webkit-transform','rotate(0deg)')
            }
            $(this).next('div').toggle();
            $(this).next('div').html($(this).next('div').attr('data-content'));
        }
    },
    {
        element: '.m-call',
        event: 'click',
        handler: function(e) {
           UI.alert('请直接到微信公众号提问')
        }
    }];

    var ServiceCenter = {
        init: function() {
            UI.loading();
                Service.get(Config.apiDomain+'/index/serviceGuide',function(data) {
                    if (data.status == 200 && !!data.data && !!data.data.item && data.data.item.length > 0) {
                       var arr=['lineico23','lineico24','lineico25','lineico26','lineico27','lineico28'];
                      for(var i=0;i<data.data.item.length;i++){
                          data.data.item[i].icon=arr[i]
                      }
                        View.initService(data.data);
                        console.log(data.data)
                        Util.bindEvents(bindings);
                    }
                    UI.loading(-1);

                });
        },
    };

    return ServiceCenter;

});