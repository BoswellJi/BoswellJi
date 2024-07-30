// launchApp("浏览器");
// app.openUrl('https://www.baidu.com');
// events.observeKey();

// 监听音量下键弹起
// events.onKeyDown("volume_down", function(event){
//     toast("音量上键弹起");
// });

// 监听Home键弹起
// events.onKeyDown("home", function(event){
//     toast("Home键弹起");
//     exit();
// });

// setScreenMetrics(1080, 1920);
// Tap(300, 100);
// sleep(500);
// auto();
// auto.setMode('fast')


auto();
var appName = rawInput("", "微博");
launchApp(appName);
sleep("8000");
setScreenMetrics(1080, 1920);
sleep(3000);
var num = 2000;
a = 1;
while (num > 1) {
  id("tv_tab_title").className("android.widget.TextView").text("首页").findOne().parent().parent().click();
  if (a % 3 == 0) {
    var zan = id("image_view").findOne();
    sleep(1000);
    toast("点赞提高活跃度");
    sleep(1000);
    click(zan.bounds().centerX(), zan.bounds.centerY());
  }
  sleep(1000);
}
