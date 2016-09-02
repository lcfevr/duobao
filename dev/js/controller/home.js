define(['util',
    'ui',
    'config',
    'pageSwitch',
    'view/common',
    'ctrl/weixin',
    'module/user',
    'lib/swiper.min'
], function(Util, UI, Config, pageSwitch, View, WeiXin,User,Swiper) {
    var bindings = [{
        element: '#labels .label-more',
        event: 'click',
        handler: function(e) {
            $('#labels').toggleClass('labels-hide');
        }
    },
    {
        element: '.user_Sign',
        event: 'click',
        handler: function(e) {
            var that=this;
            if(User.token){
               if(Home.data.is_qiandao==1){
                   UI.showCenter('今日您已签到',1000)
               }else{
                   $.ajax({
                       type:"get",
                       data:{token:User.token},
                       url:Config.apiDomain+"/Invita/user_sign",
                       success: function (data) {
                           if(data.status == 200){
                               $(that).children('span').text('已签到');
                               UI.showCenter('已签到',1000)
                           }
                       },
                   });
               }
            }else{
                openUrl('?c=login')
            }
        }
    },
    {
        element: '#make_Coins',
        event: 'click',
        handler: function(e) {
            var that=this;
            if(WeiXin.isWeixin||WeiXin.pcWeixin){
                if(User.token){
                    window.location.href=Config.apiDomain+'/Invita/showInvitaPage?token='+User.token;
                }else{
                    openUrl('?c=login');
                }
            }else{
                UI.showCenter('请在微信环境下登录',1000)
            }
        }
    }];

    var Home = {
        data:[],
        page: 1,
        pw:null,
        bw:null,
        init: function() {
            UI.loading();

            var self = this;
            if(!!this.pw){
                this.pw.destroy(true,true);
            }

            if(!!this.bw){
                this.bw.destroy();
            }

            if($('.page-home').length == 0){
                this.getData(function(data){
                    View.initHome(data);
                    UI.loading(-1);
                    this.pw=new Swiper('#home-slide',{
                        // direction: 'vertical',
                        autoplay:2000,
                        loop: true,
                        // 如果需要分页器
                        pagination: '.swiper-pagination',
                    });
                    this.bw=new pageSwitch('broadCastSlide',{
                        start:0,
                        direction:1,
                        loop:true,
                        transition:'scroll',
                        mouse:false,
                        autoplay:true,
                        interval:2000,
                    });


                    $('#home-slide-nav .dot').eq(0).addClass('curr');
                        this.pw.on('after',function(i,j){
                            console.log(i);
                            $('#home-slide-nav .dot').removeClass('curr').eq(i).addClass('curr');
                        });
                    Util.bindEvents(bindings)
                });
            }else{
                UI.loading(-1);
            }
        },
        getData: function(callback) {
            var self = this;
            $.ajax({
                url: Config.apiDomain + '/index/all?token='+User.token,
                dataType: 'json',
                success: function(res) {
                    console.log(res.data);
                    if(res.status == 200){
                        self.data = res.data;
                        callback && callback(res.data);
                    }
                }
            })
        }
    };
    return Home;

});