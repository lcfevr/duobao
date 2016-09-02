我#夺宝API接口 2.0

一、文档概述

二、约定格式

三、接口描述



##文档概述
>因为夺宝api 1.0 格式不利于查看接口信息，并且少部分接口参数存在遗漏和其他的原因，决定对API重新做一次归档，希望这一次能够做出更直观，更有效的，更优秀的文档。方便接口调用

>在夺宝的接口主要分为3大类,分别是：用户类，商品类，晒单，和其他，所有的订单操作都由后端处理

接口一览表：

<h3>商品类接口</h3>

<table>
		<tr>
			<th>接口类别</th>
			<th>接口地址</th>
			<th>请求类型</th>
			<th>返回值类型</th>
			<th>接口描述</th>
		</tr>
		<tr>
			<td rowspan=20>商品类接</td>
		</tr>
		<tr>
			<td>/index/all</td>
			<td>GET</td>
			<td>json</td>
			<td>返回首页所需要的所有数据，包含banner图，最新揭晓，上架新品和人气商品</td>
		</tr>
		<tr>
			<td>/Goods/getCategory</td>
			<td>POST</td>
			<td>json</td>
			<td>获取商品的分类</td>
		</tr>
		<tr>
			<td>/Goods/allGoods</td>
			<td>POST</td>
			<td>json</td>
			<td>全部商品和某一商品类别下的排序</td>
		</tr>
		<tr>
			<td>/Goods/getGoodsById</td>
			<td>POST</td>
			<td>json</td>
			<td>根据具商品的id获取商品的数据，包含当前商品的状态(是否已经揭晓),商品的具体数据，如果是已经揭晓的商品会返回商品的中奖信息</td>
		</tr>
		<tr>
			<td>/Goods/inRecordOfGoods</td>
			<td>POST</td>
			<td>json</td>
			<td>返回当前商品的所有的购买参与记录                                                                                                                                                                                                            </td>

		</tr>
		<tr>
			<td>/Goods/getGoodContentById</td>
			<td>POST</td>
			<td>json</td>
			<td>获取商品的详情信息</td>
		</tr>
		<tr>
			<td>/Goods/previousRecord</td>
			<td>POST</td>
			<td>json</td>
			<td>获取商品的往期揭晓数据</td>
		</tr>
</table>

<h3>晒单类接口</h3>

<table>
		<tr>
			<th>接口类别</th>
			<th>接口地址</th>
			<th>请求类型</th>
			<th>返回值类型</th>
			<th>接口描述</th>
		</tr>
		<tr>
			<td rowspan=20>晒单接口</td>
		</tr>
		<tr>
			<td>/Shareorder/all</td>
			<td>POST</td>
			<td>json</td>
			<td>获取全部的晒单或单个商品的晒单</td>
		</tr>
		<tr>
			<td>/Shareorder/getUserShareByUID</td>
			<td>POST</td>
			<td>json</td>
			<td>通过用户id获取用户的晒单</td>
		</tr>
		<tr>
			<td>/Shareorde/getShareOrderById</td>
			<td>POST</td>
			<td>json</td>
			<td>根据晒单的id获取晒单的星期</td>
		</tr>
</table>

<h3>用户类接口</h3>

<table>
		<tr>
			<th>接口类别</th>
			<th>接口地址</th>
			<th>请求类型</th>
			<th>返回值类型</th>
			<th>接口描述</th>
		</tr>
		<tr>
			<td rowspan=20>用户类接口</td>
		</tr>
		<tr>
			<td>/Member/getUserMoney</td>
			<td>POST</td>
			<td>json</td>
			<td>获取用户的余额</td>
		</tr>
		<tr>
			<td>/User/Register</td>
			<td>POST</td>
			<td>json</td>
			<td>用户注册接口</td>
		</tr>
		
		
</table>

<h3>购物车类接口</h3>

<table>
		<tr>
			<th>接口类别</th>
			<th>接口地址</th>
			<th>请求类型</th>
			<th>返回值类型</th>
			<th>接口描述</th>
		</tr>
		<tr>
			<td rowspan=20>购物车接口</td>
		</tr>

		<tr>
			<td>/Cart/judgmentJoinCart</td>
			<td>GET</td>
			<td>json</td>
			<td>判断一种商品能否加入购物车</td>
		</tr>

		<tr>
			<td>/Cart/listCart</td>
			<td>POST</td>
			<td>json</td>
			<td>返回购物车中的所有商品的详细信息</td>
		</tr>

		<tr>
			<td>/Cart/listCart</td>
			<td>POST</td>
			<td>json</td>
			<td>返回购物车中的所有商品的详细信息</td>
		</tr>
		
</table>

<h3>短信类接口</h3>

<table>
		<tr>
			<th>接口类别</th>
			<th>接口地址</th>
			<th>请求类型</th>
			<th>返回值类型</th>
			<th>接口描述</th>
		</tr>
		<tr>
			<td rowspan=20>短信类接口</td>
		</tr>

		<tr>
			<td>/Common/sendSMS</td>
			<td>POST</td>
			<td>json</td>
			<td>发送短信接口</td>
		</tr>

		<tr>
			<td>/Common/verifyPhone</td>
			<td>POST</td>
			<td>json</td>
			<td>验证短信发送的验证码</td>
		</tr>
</table>

<h3>其他类接口</h3>

<table>
		<tr>
			<th>接口类别</th>
			<th>接口地址</th>
			<th>请求类型</th>
			<th>返回值类型</th>
			<th>接口描述</th>
		</tr>
		<tr>
			<td rowspan=20>其它类接口</td>
		</tr>
		<tr>
			<td>/User/verify</td>
			<td>POST/GET</td>
			<td>json</td>
			<td>获取系统产生的验证码图像</td>
		</tr>
</table>

<span style="color:red">API接口地址：http://api.xxxx.com作为全局变量$api</span>

<span style="color:red">请求示例：$api/User/verify 请求的是api中的获取用户注册验证码的接口</span>

##用户类接口
>API：/User/Register

>接口描述：提交用户的注册信息的接口,注册步骤是：
>
>1、注册页面先请求获取图像验证码接口(/User/verify)，获取图形验证码数据。
>
>2、输入验证后用户才能点击获取短信验证码调用(/User/sendMsgForRegPhone)，发送短信验证码时需要传递图像验证码的标记mark以及用户输入的图像验证code和用户手机号码。
>
>3、用户输入短信验证码，提交到/User/Register进行注册

>请求类型：post

>请求示例：$api/User/Register

>参数：
>
> - phone:用户的手机号
> - password:为了安全起见前端需要先对用户进行md5加密后传递
> - msgcode:短信验证码内容

>返回描述：返回注册是否成功，失败返回对应的提示,成功返回true

>返回示例：
>
		{
		"status":200,
		"msg":"",
		"data":true
		}



##其他类接口

###注册验证码图片数据
>API：/User/verify

>接口描述：获取用户注册时候页面显示的验证码图片

>请求类型：post或get

>请求示例：$api/User/verify

>返回描述：返回两个数据，一个标志当前验证码的图片，另一个base64编码的数据，图片格式统一为png,前端需要转换为具体的图片

>返回示例：
>
		{
		"status":200,
		"msg":"",
		"data":{
				"mark":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IkRGM0VDOjE0NTMzNTM3Mjci
						.8z-NOvt6Ecv39MjGvaGQTryw7ZVz8sVgcagCBbe-RCY",
				"imgbase64":"base64图片编码后的数据"
			}
		}

###注册时的短信验证码的发送
>API：/User/sendMsgForRegPhone

>接口描述：注册时发送短信。

>请求类型：post

>请求示例：$api/User/sendMsgForRegPhone

>返回描述：如果短信发送成功，返回true，失败返回403，并显示对应的错误信息

>成功返回示例：
>
		{
		"status":200,
		"msg":"",
		"data":true,
		}





