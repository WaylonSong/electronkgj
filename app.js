var electron = require('electron') // http://electron.atom.io/docs/api
var path = require('path')         // https://nodejs.org/api/path.html
var url = require('url')           // https://nodejs.org/api/url.html
var ipc = require('node-ipc')
const { dialog } = require('electron');
var window = null
var util = require('./components/util')
var ipcMain = electron.ipcMain;
ipcMain.on('export',function(event, arg0){
    var exportPromise = util.default.exportWord(arg0); 
    exportPromise.then(function(){
        // alert("导出成功！");
        dialog.showMessageBox({
          // type:"info",
          message: "导出文件成功！",
          title:"通知",
          // buttons: ["是","否"]
        });
        // var command = 'start "" "' +ziptargetDir+'"'; 
        // require('child_process').exec(command); 
    })
})
// Wait until the app is ready
electron.app.once('ready', function () {
  // Create a new window
  window = new electron.BrowserWindow({
    // Set the initial width to 800px
    width: 1200,
    // Set the initial height to 600px
    height: 800,
    // Set the default background color of the window to match the CSS
    // background color of the page, this prevents any white flickering
    backgroundColor: "#D6D8DC",
    // Don't show the window until it ready, this prevents any white flickering
    show: false
  })
  // window.setMenu(null) //隐藏菜单栏,但是隐藏之后控制台也打不开了
  window.on('closed', function () {
    console.log('be closed')
    window = null
  })
  window.on('close', function (e) {
  	console.log("closing");
    var t = dialog.showMessageBox({
    	cancelId:88,
    	type:"warning",
        message: "请确认编写内容已经保存！",
        title:"提示保存",
        buttons: ["是","否"]
    });
    t==1?e.preventDefault():true;
  })

  window.on('export', function (e) {
    console.log("export");
    dialog.showMessageBox({
      cancelId:88,
      type:"info",
      message: "导出文件成功！",
      title:"通知",
      // buttons: ["是","否"]
    });
  })

  window.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Show window when page is ready
  window.once('ready-to-show', function () {
    window.show()
  })
})
