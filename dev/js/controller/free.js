define([
    'util',
    'ui',
    'config',
    'module/goods',
    'view/common'
], function(Util, UI, Config, ModGoods, View) {

    var Free = {
        loading: false,
        init: function() {

            UI.loading();

            ModGoods.getFreeGoods(function(freeGoods) {
                console.log(freeGoods);
                View.initFree({
                    data: freeGoods.item,
                });

                if(freeGoods && freeGoods.item && freeGoods.item.length > 0){
                    $(window).trigger('scroll');
                    var num=0;
                    for(var i=0;i<freeGoods.item.length;i++){
                        if(freeGoods.item[i].currentNum==freeGoods.item[i].totalNum){
                            num++;
                        }
                    }

                    if(num==freeGoods.item.length){
                        UI.alert('今日免费红包领取结束，请明天再来。');
                    }
                }
                UI.loading(-1);
            });
        }
    };
    return Free;
});