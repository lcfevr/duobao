<?php
// NGINX环境变量TP_ENV , 定义APP_STATUS应用状态
if (isset($_SERVER['TP_ENV'])) {
    $tp_env = strtolower(trim($_SERVER['TP_ENV']));
    define('APP_STATUS', $tp_env);
}

include_once "./conf/".APP_STATUS.'.php';

$appname = APP_NAME;
$apiurl = Api_Url;
$cdn_domain = CDN_DOMIAN;
$focus_qr = defined('FOCUS_QR')?FOCUS_QR:'';
?>

<!doctype html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1, minimum-scale=1.0, maximum-scale=1.0,user-scalable=no">
    <meta name="format-detection" content="telephone=no">
    <title><?php echo $appname;?></title>
    <meta name="description" content="duobao">
    <meta name="keywords" content="duobao">
    <link rel="apple-touch-icon-precomposed" href="<?php echo $cdn_domain;?>/images/screen_icon.png">
    <link rel="shortcut icon" href="<?php echo $cdn_domain;?>/images/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" type="text/css" href="<?php echo $cdn_domain;?>/css/style.css?v=<?php echo VERSION;?>">
    <script>
        var g_appname = "<?php echo $appname;?>";
        var g_apiurl = "<?php echo $apiurl;?>";
        var g_focus_qr = "<?php echo $focus_qr;?>";
        //声明_czc对象:
        var _czc = _czc || [];
        //绑定siteid，请用您的siteid替换下方"XXXXXXXX"部分
        _czc.push(["_setAccount", "1258465024"]);
    </script>
    <script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script data-main="<?php echo $cdn_domain;?>/js/app.js?v=<?php echo VERSION;?>" src="<?php echo $cdn_domain;?>/js/require.js"></script>

</head>

<body>
<div id="loading">
    <div class="spinner">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
    </div>
    <?php require_once 'cs.php';echo '<img src="'._cnzzTrackPageView(1258465024).'" width="0" height="0"/>';?>
</div>
<div style="display: none">
    <script type="text/javascript">var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1258465024'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s95.cnzz.com/z_stat.php%3Fid%3D1258465024%26show%3Dpic' type='text/javascript'%3E%3C/script%3E"));</script>
</div>
</body>
</html>
