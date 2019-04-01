//var baseUrl = "https://game.kinsey.vip/api/";
var baseUrl = "http://47.92.174.226/api/";
(function (owner) {
  // 检查更新
  owner.check_update = function () {
    document.addEventListener("plusready", function () {
      plus.runtime.getProperty(plus.runtime.appid, function (inf) {
        checkUpdate(inf.version);
      });
      // 检测更新
      function checkUpdate(wgtVer) {
        request(baseUrl + "common/getversion", "get", {}, {}, function (data) {
          // console.log(JSON.stringify(data));
          if (data.code == 1) {
            var newVer = data.data.version;
            // console.log(newVer);
            if (wgtVer && newVer && (wgtVer != newVer)) {
              plus.nativeUI.alert(data.data.content, function () {
                downWgt("http://down.kinsey.vip/down/data/pro/update.wgt"); // 下载升级包
              }, "新版本更新提示");
            }
          }
        });
      }
      // 下载wgt文件,带进度条
      var wgtWaiting = null;

      function downWgt(downUrl) {
        wgtWaiting = plus.nativeUI.showWaiting("开始下载", {
          color: "#fff"
        });
        var wgtOption = {
          filename: "_doc/update/",
          retry: 1
        };
        var task =
          plus.downloader.createDownload(downUrl, wgtOption, function (download, status) {
            if (status == 200) {
              wgtWaiting.setTitle("开始安装");
              installWgt(download.filename);
            } else {
              plus.nativeUI.alert("应用升级失败！");
              wgtWaiting.close();
            }
          });
        task.addEventListener("statechanged", function (download, status) {
          switch (download.state) {
            case 2:
              wgtWaiting.setTitle("正在下载...");
              break;
            case 3:
              var percent = download.downloadedSize / download.totalSize * 100;
              wgtWaiting.setTitle("已下载" + parseInt(percent) + "%");
              break;
            case 4:
              wgtWaiting.setTitle("下载完成");
              break;
          }
        });
        task.start();
      };

      function installWgt(wgtpath) {
        plus.runtime.install(wgtpath, {}, function (wgtinfo) {
          wgtWaiting.close();
          plus.nativeUI.alert("更新完成， 须重启应用！", function () {
            plus.runtime.restart();
          });
        }, function (error) {
          wgtWaiting.close();
          plus.nativeUI.alert("应用升级失败！" + "\n" + error.message);
        });
      };
    });
  }
  owner.downWgt = function (downUrl) {
    // 下载wgt文件,带进度条
    var wgtWaiting = plus.nativeUI.showWaiting("开始下载", {
      color: "#fff"
    });
    var wgtOption = {
      filename: "_doc/update/",
      retry: 1
    };
    var task =
      plus.downloader.createDownload(downUrl, wgtOption, function (download, status) {
        if (status == 200) {
          wgtWaiting.setTitle("开始安装");
          installWgt(download.filename);
        } else {
          plus.nativeUI.alert("应用升级失败！");
          wgtWaiting.close();
        }
      });
    task.addEventListener("statechanged", function (download, status) {
      switch (download.state) {
        case 2:
          wgtWaiting.setTitle("正在下载...");
          break;
        case 3:
          var percent = download.downloadedSize / download.totalSize * 100;
          wgtWaiting.setTitle("已下载" + parseInt(percent) + "%");
          break;
        case 4:
          wgtWaiting.setTitle("下载完成");
          break;
      }
    });
    task.start();

    function installWgt(wgtpath) {
      plus.runtime.install(wgtpath, {}, function (wgtinfo) {
        wgtWaiting.close();
        plus.nativeUI.alert("更新完成， 须重启应用！", function () {
          plus.runtime.restart();
        });
      }, function (error) {
        wgtWaiting.close();
        plus.nativeUI.alert("应用升级失败！" + "\n" + error.message);
      });
    };

  }
})(window.app = {});