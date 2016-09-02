#Duobao API Interface
----------
>12/4/2015 9:59:09 AM 部分基础接口  
>状态码：为200为显示正常
>如果status不为200，msg不为空，请讲错误信息给我提示，我修改接口
>所有的数据都在data中，请在data中读取

>12/7/2015 1:30:59 PM 添加往期揭晓文档，修改以前的接口使用length参数的地方为limit，添加用户登陆（用户名密码）接口

>12/8/2015 9:31:48 AM 添加单品的用户参与记录

>12/8/2015 5:21:37 PM 用户充值记录，更具id获取用户的晒单列表，用户参与记录，用户的中奖记录，用户中奖数量统计，用户参与数量的统计

>12/11/2015 3:26:04 PM 用户登陆与注册接口,token失效时间设置为24小时

>12/11/2015 4:25:44 PM 修改接口，去掉部分接口涉及到用户id，部分使用token传递，添加token的失效，返回失效和验证失败的情况返回值如下

>超过24小时返回示例：


    {  
    "status"：403,  
    "msg":"token Invalid",  
    "data":[]
    } 

>12/13/2015 1:24:52 PM 
>
1.添加查询商品能否加入购物车的接口，条件是商品的剩余数是否大于0
>
2.添加用户进入购物车后，显示购物车中的商品信息，传递参数id字符串如：{id:'1,2,3,4,120'}
 
> 12/14/2015 2:43:07 PM 添加用户的新增收货地址，删除收货地址，修改收货地址，变更或者设置默认收货地址的接口 地址传递格式以字符串形式，详情请参照具体的接口

> 12/22/2015 5:10:32 PM 完成余额支付，微信支付，微信充值等接口

>12/24/2015 10:20:53 AM 去除Cart/createOrder的接口，统一换成从Order/createOrder中创建订单

>12/24/2015 7:31:31 PM 添加用户
>接口

>12/25/2015 11:57:20 AM 修改下单接口的返回值，后台判断购买数量大于剩余数量直接返回失败，返回失败原因

>12/28/2015 2:24:50 PM 修改根据商品id获取商品信息的接口getGoodsById

>12/29/2015 12:24:01 PM 手机短信的验证码的发送接口与验证验证码接口

>12/29/2015 1:57:49 PM 添加设置用户昵称的接口

>12/30/2015 10:50:33 AM 修改晒单接口的描述 

>12/30/2015 4:16:30 PM 修改获取其他用户的用户中心的参与记录的接口

>12/31/2015 11:36:17 AM 修改晒单接口缺少但会数据的值，修改商品显示信息接口返回数据格式不一致的问题

>1/8/2016 6:11:37 PM 修改获取用户个人中心获取用户中奖记录的接口

----------
##用户接口

----------

>###获取用户名  
>API URL：/Member/getUserName  
>Method：POST  
>Param：  
>-
>- 无

>请求示例：

>http://域名/Member/getUserName?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEyMDoxNDQ5ODIwNzQzIg.sUnnBiBB2j4tTmhVwbGQQWEX6wJKD0z323Jgnl1_WQ0

>返回示例：  

    {  
    "status"：200,  
    "msg":"",  
    "data":{"username":"徐林"}
    } 


>**Notic:token做为异步请求的url携带的参数，下面的部分系带token的请求方式相同 **

----------


>###获取用户余额 
>API URL：/Member/getUserMoney  
>Method：Post 
>Param：  
>-
>- 无

>请求示例：

>http://域名/Member/getUserMoney?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEyMDoxNDQ5ODIwNzQzIg.sUnnBiBB2j4tTmhVwbGQQWEX6wJKD0z323Jgnl1_WQ0


>返回示例：  

    {  
    "status"：200,  
    "msg":"",  
    "data":{"money":"500.00"}
    } 




----------

>###获取用户头像
>API URL：/Member/getUserPhoto  
>Method：POST  
>Param：  
>-
>- 无


>请求示例：

>http://域名/Member/getUserPhoto?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEyMDoxNDQ5ODIwNzQzIg.sUnnBiBB2j4tTmhVwbGQQWEX6wJKD0z323Jgnl1_WQ0


>返回示例：  

    {  
    "status"：200,  
    "msg":"",  
    "data":{"img":"图片的连接地址"}
    } 




----------

>###获取用户手机号码
>API URL：/Member/getUserPhone   
>Method：POST  
>Param：  
>-
>- 无

>请求示例：

>http://域名/Member/getUserPhoto?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEyMDoxNDQ5ODIwNzQzIg.sUnnBiBB2j4tTmhVwbGQQWEX6wJKD0z323Jgnl1_WQ0


>返回示例：  

    {  
    "status"：200,  
    "msg":"",  
    "data":{"phone":"13854545875"}
    } 
 


----------

----------
>###获取个人中心的所有数据（id，img,name,money）
>API URL：/Member/getUserCenter  
>Method：POST  
>Param：  
>-
>- 无


>请求示例：

>http://域名/Member/getUserCenter?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEyMDoxNDQ5ODIwNzQzIg.sUnnBiBB2j4tTmhVwbGQQWEX6wJKD0z323Jgnl1_WQ0


>返回示例：  

    {  
    "status"：200,  
    "msg":"",  
    "data":
	    {"item":
		    [
				{"id":11,"username":'fox',"img":"图片链接地址","money":"500.00"}
	    	]
		}
    } 

>**Notic:用户id不存在的data为空 **


----------
>###获取用户个人的收货地址列表
>API URL：/Member/getUserAddressList  
>Method：POST  
>Param：  
>-
>- 无

>请求示例：

>http://域名/Member/getUserAddressList?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEyMDoxNDQ5ODIwNzQzIg.sUnnBiBB2j4tTmhVwbGQQWEX6wJKD0z323Jgnl1_WQ0


>返回示例：  

    {  
    "status"：200,  
    "msg":"",  
    "data":
	    {"item":
		    [
				{'id':'1',"address":"街道","consignee":"赵四","phone":"13712345678"，province："省",city:"市",area:"县（区）"，default:'是否是默认地址'},  
		    	{'id':'2',"address":"街道","consignee":"赵三","phone":"13712345678"，province："省",city:"市",area:"县（区）"，default:'是否是默认地址'}
		    	,...
	    	]
		}
    } 


----------


----------
>###获取用户个人的默认收货地址
>API URL：/Member/getUserDefaultAddress  
>Method：POST  
>Param：  
>-
>- 无


>请求示例：

>http://域名/Member/getUserDefaultAddress?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEyMDoxNDQ5ODIwNzQzIg.sUnnBiBB2j4tTmhVwbGQQWEX6wJKD0z323Jgnl1_WQ0

>返回示例：  
  
    {  
    "status"：200,  
    "msg":"",  
    "data":
	    {"item":
		    [
				{'id':'1',"address":"北京市北京市东城区xxx街道109号","consignee":"赵四","phone":"13712345678"}
	    	]
		}
    } 



----------


----------
>###用户中心的数据
>API URL：/Member/getUserMessage  
>Method：POST  
>Param：  
>-
>- 无


>请求示例：

>http://域名/Member/getUserMessage?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEyMDoxNDQ5ODIwNzQzIg.sUnnBiBB2j4tTmhVwbGQQWEX6wJKD0z323Jgnl1_WQ0

>返回示例：   

    {  
    "status"：200,  
    "msg":"",  
    "data":
	    {"item":
		    [
				{'id':'103',"username":"赵四","img":"http://wx.qlogo.cn/mmopen/ajNVdqHZLLDDIVvYWr7M2f7zFdfDYqj7sRv6ImGRYWhPtvBhHgnhjToicmL9jicjTEjMNHwywvVCxNQnyaTlJZtA/0","mobile":"12601996905"}]}
	    	]
		}
    } 


>**Notic:用户id不存在的data为空 ** id:用户uid

###用户充值记录


>API URL：/Member/getUserPayRecord
>Method：POST  
>Param：  
>-
>- offset:偏移量 默认0
>- limit:长度 默认10

> 用户的购买记录，用户每一次支付都会产生一个充值记录


>请求示例：

>http://域名/Member/getUserPayRecord?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEyMDoxNDQ5ODIwNzQzIg.sUnnBiBB2j4tTmhVwbGQQWEX6wJKD0z323Jgnl1_WQ0


>返回示例： 

> 

    {  
    "status"：200,  
    "msg":"",  
    "data":
	    {
			"item":[
						{"paytype":"用户充值记录","paytime":"充值时间","amount":"充值金额"},
						....
				   ]
		}
    } 

###用户参与记录（点击参与者的姓名进入的参与者的用户中心的参与记录）


>API URL：/Goods/getOtherBuyRecord
>Method：POST  
>Param：  
>-
>- id：用户的id
>- offset:偏移量 默认0
>- length:长度 10


>返回示例： 

> 

	{  
    "status"：200,  
    "msg":"",  
    "data": {
				"underway":[
								{"goodsId":"商品id","goodsName":"商品名称","goodsImg":"商品图片","periods":'期数',"totalNeed":"总需人数","need":"剩余人数",'count':"用户的参与次数（与传递id相同的用户）"}，
								....
							]
				"complete":
							[
								{"goodsId":"商品id","goodsName":"商品名称","goodsImg":"商品图片","periods":'期数',"totalNeed":"总需人数","endTime":"揭晓时间",'lucklyCode':'幸运号码',"buyNum":"中奖用户购买数量","lucklyMan":"幸运用户的用户名"}
								...
							]
							
			}
    } 


###用户中奖记录


>API URL：/Member/getUserWinRecord
>Method：POST  
>Param：  
>-
>- id：用户的id
>- offset:偏移量 默认0
>- length:长度 10


>返回示例： 

> 

    {  
    "status"：200,  
    "msg":"",  
    "data":
	    {
			"item":[
						{"goodsid":"商品id","goodsname":"商品名称","goodsimg":"商品图片","totalNeed":"总需人数","periodsNo":"期数","luckyNumber":"幸运号码","endTime"："结束时间","buyNumber":"用户参与人次"},
						....
				   ]
		}
    } 


###获取用户当前用户的用户自身的中奖记录


>API URL：/Member/getMyWinRecord
>Method：POST  
>Param：  
>-
>- offset:偏移量 默认0
>- length:长度 10

>- token:url位置传递

>返回示例： 

> 

    {  
    "status"：200,  
    "msg":"",  
    "data":
	    {
			"item":[
						{"goodsid":"商品id","goodsname":"商品名称","goodsimg":"商品图片","totalNeed":"总需人数","periodsNo":"期数","luckyNumber":"幸运号码","endTime"："结束时间","buyNumber":"用户参与人次","deliveryStatus":"商品状态"},
						....
				   ]
		}
    } 




###统计用户的中奖记录


>API URL：/Member/getUserWinCount
>Method：POST  
>Param：  
>-
>- id：用户的id


> 用户的购买记录，都会产生一个参与记录，购买统一期的相应商品，只有一个参与记录

>返回示例： 

> 

    {  
    "status"：200,  
    "msg":"",  
    "data":
	    {
			"item":'统计结果'
		}
    } 


###用户登陆就接口


>API URL：/User/Login
>Method：POST  
>Param：  
>-
>- phone：用户手机号码
>- password:用户密码


> 接口说明，用户提供有效的手机号码和密码，请求接口，如果后端验证通过，会返回一个token，改token包含了用户的id
> ，前端请求部分接口的时候需要携带该token，token请求请附带到请求url后，如http://www.duobao.cn/user/login?token=token的值

>返回示例： 

> 

    {  
    "status"：200,  
    "msg":"",  
    "data":
		{
          "status":"ok",
          "token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjE0MSI.ecQyLoaZd4pnHNY6SoNQ7bSYT3_7ibfxx4Anwvt_3Jo"
       }
    } 

###用户注册接口


>API URL：/User/Register
>Method：POST  
>Param：  
>-
>- phone：用户手机号码
>- password:用户密码


> 接口说明，目前，用户只需要提供有效的手机号码和密码，请求接口，如果后端验证通过，用户注册成功，返回值注册结果，如果手机号码在数据库已存在，返回注册失败的信息

>返回示例： 

> 错误状态

    {  
    "status"：200,  
    "msg":"",  
    "data":
		{
          "status":"error",
          "error_msg":"phone number is exist"
       }
    } 

> 正确状态


    {  
    "status"：200,  
    "msg":"",  
    "data":
		{
          "status":"ok",       
       }
    }

----------
###用户修改用户的昵称

>API URL：/Member/setUserName
>Method：POST  
>Param：

> - username:修改后的用户名
> - token:令牌，get参数形式传递

> 接口说明：token请附在请求url后

>返回示例： 
>
> 正确状态


    {  
    "status"：200,  
    "msg":"",  
    "data":
		{
          "result":"ok",       
       }
    }


----------
###晒单接口
----------
>###获取所有晒单（适应两个地方，第一个是，大菜单下的晒单，显示所有的晒单，第二种，当前商品的晒单）
>API URL：/Shareorder/all 
>Method：POST  
>Param：  
>-
>- id:商品id，默认可以不传递 是表示获取所有商品的（即晒单菜单），id不为空时表示获取以当前id的商品的所有晒单
>- offset:偏移量 `默认为0`
>- limit:需要数据的长度 `默认为10`


>返回示例：   

    {  
    "status"：200,  
    "msg":"",  
    "data":
	    {"item":
		    [
				{'id':'晒单id',"username":"晒单用户名","title":"晒单标题","thumbs":"晒单缩略图","content":"晒单内容","time":"晒单时间}，
				...
	    	]
		}
    } 


----------
>###根据晒单id获取晒单的详情内容
>
>API URL：/Shareorder/getShareOrderById 
>Method：POST  
>Param：  
>-
>- id:晒单id


>返回示例：   

    {  
    "status"：200,  
    "msg":"",  
    "data":
	    {"item":
		    [
				{
					'id':'晒单id',
					"goodsname":"商品名",
					"username":"晒单的用户名",
					'uid':晒单用户id,
					'periods':'商品期数',
					"ip"："晒单的ip",
					"title":"晒单标题",
					"thumbs":"晒单缩略图",
					"content":"晒单内容",
					"photolist":
					[
						"http://m.shaoyangduobao.weizhuanqiandao.com/statics/uploads/shaidan/20150917/75556033420839.jpg",
						"http://m.shaoyangduobao.weizhuanqiandao.com/statics/uploads/shaidan/20151118/144786104393816210.jpg",
					]
					"time":"晒单时间，
					"endTime":"揭晓时间",
					"lucklyNum":"中奖号码",
					"goodsId":"商品id",
				}
	    	]
		}
    } 

----------
>###根据用户的id获取用户的晒单列表
>API URL：/Shareorder/getUserShareByUID 
>Method：POST  
>Param：  
>-
>- id:用户id
>- offset:偏移量 默认0
>- limit : 长度 默认10


>返回示例：   

    {  
    "status"：200,  
    "msg":"",  
    "data":
	    {"item":
		    [
				{'id':'晒单id',"title":"晒单标题","time":"晒单的时间","content"："晒单内容","thumbs":"晒单缩略图"}
				..
	    	]
		}
    } 

----------
###商品接口
----------
>###根据商品id获取商品
>两种状态，商品未揭晓与已揭晓，两种状态的返回值不相同
>
>API URL：/Goods/getGoodsById 
>Method：POST  
>Param：  
>-
>- id:商品id


>返回示例：

> 例1：商品未揭晓 进行中  

    {  
    "status"：200,  
    "msg":"",  
    "data":
	    {
			"status":"underway",
		   	"message":{'shopid':'商品id','shopTitle':'商品名称','thumb':"商品图片","periods":"期数","remainderNum":"剩余人数","totalNum":'总需人数'}
		}
    } 

> 例2：已揭晓

    {  
    "status"：200,  
    "msg":"",  
    "data":
	    {
			"status":"alreadyAnnounced",
		   	"message":{'shopid':'商品id','shopTitle':'商品名称','thumb':"商品图片","periods":"期数","winName":"中奖人昵称","winUserImg":'中奖人图片','winUserId':"中奖用户id","winBuyNum":'中奖用户购买数量','winBuyCode':"中奖用户购买的所有号码","winLucklyCode":"用户幸运中奖号码","winIp":"用户ip"}
		}
    } 


----------
>###根据商品id获取商品详情页面
>API URL：/Goods/getGoodContentById 
>Method：POST  
>Param：  
>-
>- id:商品id


>返回示例：   

    {  
    "status"：200,  
    "msg":"",  
    "data":
	    {"content":"<p><img src="https://img.alicdn.com/imgextra/i2/126446588/TB25pjAeVXXXXaiXpXXXXXXXXXX-126446588.jpg" width="790" height="1953"/></p>"}
    } 

----------
>###根据商品的全部类别
>API URL：/Goods/getCategory 
>Method：POST  
>Param：  
>-
>- 无


>返回示例：   

    {  
    "status"：200,  
    "msg":"",  
    "data":
	    {
			"item":[
						{"category_id":'商品的类别id'，"category_name":"类别1"},
						{"category_id":'商品的类别id'，"category_name":"类别2"},
						....
				   ]
		}
    } 


----------


###查看商品的揭晓计算
>API URL：/Goods/checkCalculateDetail 
>Method：GET  
>Param： 
>-
>- gid:商品id
>
> 只有当当前商品揭晓了的才能调用该函数,否则返回false
> 揭晓计算的方式是，在用户购买之后，检测改商品的剩余数量，如果剩余数量为0则选取当前时间点的全站50条参与记录之和，对商品总需人数取余+10000001；


> 请求示例：  
>  
      var gid = 12;
	  var url = 'http://www.duobao.cn/index.php/Duobao/Goods/checkCalculateDetail/';
	  $.get(url,{gid:gid},function(data){},'json');

>返回示例：   

    {  
    "status"：200,  
    "msg":"",  
    "data":
	    {
			"item":
				[
					{"time":"2015-09-24 17:53:23.404","number":"	175323404","username":"用户名"},
					.....
				]
			"time_sum":	6833609765,
			"lunckly_number":	10000038;
		}
    } 




>###获取全部商品
>API URL：/Goods/allGoods 
>Method：POST  
>Param：(都为可选参数)  
>-
>- categoryid:商品类别id,传0选择所有类别的商品，默认为0
>- offset: 偏移量，默认为0
>- limit: 数据长度，默认为10
>- ordername:排序规则，可选值[1,2,3] 1:人气 2：上架时间 3：剩余人次  
>- order:总需人数的排序,可选值[desc,asc];
>
> 注意:ordername 与order只能2选1，请求


> 请求示例：  
> $.post(url,{categoryid:1,offset:10,limit:10,ordername:2},function(data){},"json");
> $.post(url,{categoryid:2,offset:1,limit:1,order:"desc"},function(data){},"json"); 

>返回示例：   

    {  
    "status"：200,  
    "msg":"",  
    "data":
	    {
			"item":[
						{"shopid":"商品id","shopTitle":"商品类别","thumb":"压缩图片","price":"商品价格","open_time":"揭晓时间","currentNum"："参与人次","totalNum":"总需人数",'cateid':"商品类别id"},
						....
				   ]
		}
    } 



###获取点击商品进入的商品页面的往期揭晓

>API URL：/Goods/previousRecord 
>Method：POST  
>Param：  


>-
>- id：商品的id（在当前的系统中一种商品可以有多个id，但是只能有一个sid 上级id），sid前端不用理


>返回示例：   （按揭晓时间倒叙）

> 1、当前的商品没有往期的情况下返回如下：

    {  
    "status"：200,  
    "msg":"The current commodity no past",  
    "data":[]
    } 
> 2、商品存在往期

    {  
    "status"：200,  
    "msg":"",  
    "data":
	    {
			"item":[
						{"sid":"商品上级id","periodsNo":"期数","announcedTime":"揭晓时间","userid":"用户id","usercode":"中奖号码","username"："用户名","personTimes":"用户参与人次",'userip':"用户ip"},
						....
				   ]
		}
    } 



###进入商品页面后的商品参与记录

>API URL：/Goods/inRecordOfGoods
>Method：POST  
>Param：  
>-
>- id：商品的id
>- offset:偏移量 默认0
>- limit：长度 默认10


>返回示例： （按最新的时间倒叙）

> 1、当前的商品没有往期的情况下返回如下：

    {  
    "status"：200,  
    "msg":"",  
    "data":
	    {
			"item":[
						{"username":"参与用户名","userimg":"用户头像","userid":"用户id","time":"参与时间","personNo":"参与人次",'userip':"用户ip"},
						....
				   ]
		}
    } 



###判断商品能否加入购物车


>API URL：/Cart/judgmentJoinCart
>Method：GET  
>Param：  
>-
>- id：商品的id

>请求示例

	var id = 150;
	var url = "http://www.duobao.cn/index.php/Duobao/Cart/judgmentJoinCart";
	$.get(url,{id:id},function(){},'json');

>返回示例： 

> 1、返回true或者false

    {  
    "status"：200,  
    "msg":"",  
    "data": {"status":true或者false}
    } 




###传递id串获取商品详情（对应本地请求购物车）


>API URL：/Cart/listCart
>Method：POST  
>Param：  
>-
>- idstr：商品id串 var id = "1,2,3,4,5,6,120";请使用逗号(,)隔开每个id

>请求示例

	var idstr = '1,2,3,4,5,6';
	var url ='http://www.duobao.cn/index.php/Duobao/Cart/listCart';
	$.post(url,{idstr:idstr},function(){},'json');

>返回示例： 

> 1、返回对应id并且商品剩余数量大于0的数据

    {  
    "status"：200,  
    "msg":"",  
    "data": {
				"item":[
						 {'id':"商品id","goodsName":'商品名称',"img":"商品的缩略图","totalNeed":"总需人数"，"surplus":"剩余人数"},
						.......
						]
			}
    } 


##用户地址操作模块

###用户添加收货地址
>API URL：/Member/addUserAddress
>Method：POST  
>Param：  
>-
>- content：地址内容，地址列表的传递的数据包含（省，市，县，街道，邮编，收货人，手机号）,content以字符串的形式传递对应的格式"省:市:县:街道:邮编:收货人:手机号码",邮编可以为空，为空是注意留空，冒号使用英文的冒号,邮编为空的情况**"省:市:县:街道::收货人:手机号码"**
>- default:是否设置为默认收货地址，不传递默认为false ，可选参数true false

>- token:令牌，请附在url后，get方式传递

>请求示例

	var content = "湖南省:长沙市:开福区:万达广场B座38010:410001:唐超:18570627957";
	var default = false;
	var url = 'http://www.duobao.cn/index.php/Duobao/Member/addUserAddress?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjE0NDoxNDUwMDYwODkyIg.mOXKoHJNwTll3Xt8OQqcXNAaGDRGziZATC3Yl5rMHhA';
	$.post(url,{content:content,default:false},function(){},'json');

>返回示例： 

> 

    {  
    "status"：200,  
    "msg":"",  
    "data": {"status":true}
    } 


###用户删除收货地址
>API URL：/Member/delUserAddress
>Method：POST  
>Param：  
>-
>- addressId:地址id，地址id通过获取用户地址列表接口获取，请参照获取用户地址列表接口

>- token:令牌，请附在url后，get方式传递

>请求示例

	var id=11;
	var url ='http://www.duobao.cn/index.php/Duobao/Member/delUserAddress?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjE0NDoxNDUwMDYwODkyIg.mOXKoHJNwTll3Xt8OQqcXNAaGDRGziZATC3Yl5rMHhA';
	$.post(url,{addressId:id},function(){},'json');

>返回示例： 

> 

    {  
    "status"：200,  
    "msg":"",  
    "data": {"status":true}
    } 

###用户修改收货地址
>API URL：/Member/updateUserAddress
>Method：POST  
>Param：  
>-
>- addressId:地址id，地址id通过获取用户地址列表接口获取，请参照获取用户地址列表接口
>- content:修改后的内容,参数格式同添加地址接口一样
>- default:是否设置为默认收货地址，不传递默认为false ，可选参数true false
>
>- token:令牌，请附在url后 ,get传递

>请求示例

	var id = 10;
	var content = "北京市:北京市:东城区:万达广场B座38010:410001:赵日天1:18570627957";
	var default = false;
	var url = "http://www.duobao.cn/index.php/Duobao/Member/updateUserAddress?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjE0NDoxNDUwMDYwODkyIg.mOXKoHJNwTll3Xt8OQqcXNAaGDRGziZATC3Yl5rMHhA";
	$.post(url,{content:content,addressId:id,default:default},function(data){},'json');

>返回示例： 

> 

    {  
    "status"：200,  
    "msg":"",  
    "data": {"status":true}
    } 


###用户变更或者设置默认地址   (该接口被删除)
>API URL：/Member/userAddDefaultAddr
>Method：POST  
>Param：  
>-
>- addressId:地址id，地址id通过获取用户地址列表接口获取，请参照获取用户地址列表接口

>- token:令牌，请附在url后，get方式传递

>请求示例

	var id= 10;
	var url ='http://www.duobao.cn/index.php/Duobao/Member/userAddDefaultAddr?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjE0NDoxNDUwMDYwODkyIg.mOXKoHJNwTll3Xt8OQqcXNAaGDRGziZATC3Yl5rMHhA';
	$.post(url,{addressId:id},function(data){},'json');

>返回示例： 

> 

    {  
    "status"：200,  
    "msg":"",  
    "data": {"status":true}
    } 



##支付
###订单的生成
> 订单的生成调用统一的订单生成接口，该接口目前可接受的订单类型包含，balances(余额),weixin('微信支付')，recharge('微信充值')
> ，所有的订单生成都会先进行验证，如果用户购买的数量大于剩余数量直接返回下单失败，并返回失败原因。

>API URL：/Order/createOrder
>Method：POST  
>Param：  
>-
>- data:如果type为recharge，则data表示充值金额，否则应传递购买商品的json，格式：[{"id":30,"number":4},{"id":28,"number":4}]
>- type:订单的类型，balances(余额),weixin('微信支付')，recharge('微信充值')

>- token:令牌，请附在url后，get方式传递

>请求示例
	
	创建微信支付订单：
	var type = 'weixin';
	var data = '[{"id":30,"number":4},{"id":28,"number":4}]';
	var url = "http://www.duobao.cn/index.php/Duobao/Order/createOrder?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEzNzoxNDUwODQ5Mzk0Ig.rJoxuxX2Uj2fx7GDhS3AmGqkZRhPl_YWWXaUjv3jBmM";
	 $.post(url,{type:type,data:data},function(data){},'json');
	
	创建微信充值订单：
	var type = 'recharge';//type==充值
	var money = 20;
	var url = "http://www.duobao.cn/index.php/Duobao/Order/createOrder?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEzNzoxNDUwODQ5Mzk0Ig.rJoxuxX2Uj2fx7GDhS3AmGqkZRhPl_YWWXaUjv3jBmM";
	$.post(url,{type:type,data:money},function(data){},'json');
>返回示例： 

> 

    {  
    "status"：200,  
    "msg":"",  
    "data": {"order":"C14509239958993241"}
    } 

###支付订单
> 支付订单
> 在异步请求到订单后，直接跳转到api的的页面，改页面显示的数据，包括订单的信息（订单金额，订单标号，订单类型），需要前端处理

>API URL：http://api2.shaoyangduobao.weizhuanqiandao.com/Pay/showPayPage (表示跳转地址)
>
>Method：GET 
>Param：  
>-
>- order:订单号（C14509397797279650）

>- token:令牌，请附在url后，get方式传递

>请求示例
	
	var type = 'recharge';
	var money = 20;
	var url = "http://www.duobao.cn/index.php/Duobao/Order/createOrder?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEzNzoxNDUwOTM2NjA3Ig.gOPigKSkuMJSRNRf64uXP9hllyTtE4JF9lI0s9haGz4";
	$.post(url,{type:type,data:money},function(data){
	var url2 = "http://www.duobao.cn/index.php/Duobao/Pay/showPayPage?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEzNzoxNDUwOTM2NjA3Ig.gOPigKSkuMJSRNRf64uXP9hllyTtE4JF9lI0s9haGz4&order="+data.data.order;
		window.location.href = url2;
	},'json');
>返回示例： 无返回，所有的支付请求都在后端的页面中进行


###用户晒单接口（待配合测试）


>API URL：/ShareOrder/setShareOrder 
>
>Method：post
>Param：  
>-
>- goodsId:晒单商品id
>- title:晒单标题
>- content：晒单内容
>- photoList:晒单图片列表

>- token:令牌，请附在url后，get方式传递


>返回示例： （预计）

	{  
    "status"：200,  
    "msg":"",  
    "data": {"result":true}
    } 

###根据用户的id获取用户的信息
>API URL：/Member/getOtherMessage 
>
>Method：get
>Param：  
>-
>- id:用户的id


>返回示例： 

	{  
    "status"：200,  
    "msg":"",  
    "data": {
			"user":
				{
					"name":"用户的昵称",
					"photo":"用户的图像",
					"id":				
				}
			}
    } 


###手机用户发送验证码接口
>相关限制：同一ip并且同一用户1小时最多能调用5次短信发送接口
>
>API URL：/Common/sendSMS 
>
>Method：Post
>Param：  
>-
>- phone:用户的手机号码

>-token::令牌，请附在url后，get方式传递


>返回示例： 

	{  
    "status"：200,  
    "msg":"",  
    "data": {"status":true}
    } 


###短信验证接口
> 相关限制：短信验证码的时效5分钟
> 
>API URL：/Common/sendSMS 
>
>Method：Post
>Param：  
>-
>- code:短信验证码

>-token::令牌，请附在url后，get方式传递


>返回示例： 

	{  
    "status"：200,  
    "msg":"",  
    "data": {"status":true，"msg":""}
    } 




###用户中心获取用户个人所有的参与记录
> 
>API URL：/Member/getMyIndiana 
>
>Method：Post
>Param：  
>-

>-token::令牌，请附在url后，get方式传递


>返回示例： 

	{  
    "status"：200,  
    "msg":"",  
    "data": {
				"underway":{"goodsId":"商品id","goodsName":"商品名称","goodsImg":"商品图片","periods":'期数',"totalNeed":"总需人数","need":"剩余人数",'count':'当前用户购买的次数','code':"当前用户购买的代码"}，
				"complete":{"goodsId":"商品id","goodsName":"商品名称","goodsImg":"商品图片","periods":'期数',"totalNeed":"总需人数","endTime":"揭晓时间",'lucklyCode':'幸运号码',"buyNum":"中奖用户购买数量","lucklyMan":"幸运用户的用户名",'code':"当前用户的购买号码","count":"当前用户的参与次数"}
				..
			}
    } 



###用户中心获取用户的参与记录的进行中的记录
> 
>API URL：/Member/getMyUnderway 
>
>Method：Post
>Param：  
>-

>-token:令牌，请附在url后，get方式传递


>返回示例： 

	{  
    "status"：200,  
    "msg":"",  
    "data": {
				"underway":{"goodsId":"商品id","goodsName":"商品名称","goodsImg":"商品图片","periods":'期数',"totalNeed":"总需人数","need":"剩余人数",'count':'当前用户购买的次数','code':"当前用户购买的代码"}，
				..
			}
    } 


###用户中心获取用户的参与记录的进行中的记录
>
> API URL：/Member/getMyAlreadyAnnounced 

> Method:post
> param:
> -
> - token : 令牌，请附在url后，get方式传递


>返回示例： 

	{  
    "status"：200,  
    "msg":"",  
    "data": {
				"complete":{"goodsId":"商品id","goodsName":"商品名称","goodsImg":"商品图片","periods":'期数',"totalNeed":"总需人数","endTime":"揭晓时间",'lucklyCode':'幸运号码',"buyNum":"中奖用户购买数量","lucklyMan":"幸运用户的用户名",'code':"当前用户的购买号码","count":"当前用户的参与次数"}
				..
			}
    } 

###用户中奖记录中商品详细信息
>
> API URL：/Member/showMyWinGoodsStatusMsg 

> Method:post
> param:
> -
> - gid:商品id
> - token : 令牌，请附在url后，get方式传递


>返回示例： 

    {  
    "status"：200,  
    "msg":"",  
    "data": {
                "consignee":"收货人",
                "address":地址,
                "street":"街道",
                "mobile":"联系手机",
                "status":"商品所处的状态,取值afterDelivery(等待发货),toconfirm(已发货待确认),completed(已完成)",
                "goods":
                {
                    "id":"商品id",
                    'img':"商品图片",
                    "name":"商品名",
                    "periods":"商品期数"，
                    "endtime":"揭晓时间",
                    "lucklyNumber":"中奖号码",
                    "userBuyCount":"中奖用户购买数量",
                }
            }
    } 

###用户中奖记录选择收货地址
>
> API URL：/Member/addGoodsSendAddr 

> Method:post
> param:
> -
> - gid:商品id
> - addressId:地址id
> - token : 令牌，请附在url后，get方式传递


>返回示例： (返回值方便前端直接调用更新页面,如果用户已选择了返回false)

    {  
    "status"：200,  
    "msg":"",  
    "data": {
                "consignee":"收货人",
                "address":地址,
                "street":"街道",
                "mobile":"联系手机"
            }
    } 

###用户中奖记录修改收货地址
>
> API URL：/Member/updateGoodsSendAddr 

> Method:post
> param:
> -
> - gid:商品id
> - addressId:地址id
> - token : 令牌，请附在url后，get方式传递


>返回示例： (返回值方便前端直接调用更新页面)

    {  
    "status"：200,  
    "msg":"",  
    "data": {
                "consignee":"收货人",
                "address":地址,
                "street":"街道",
                "mobile":"联系手机"
            }
    } 



