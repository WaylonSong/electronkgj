$(function () {
	
	$("#export").bind("click",function(){
		var fs = require("fs") ;
		var txt = "测试导出" ;
		 //写入文件
		fs.writeFile("bb.txt",txt,function (err) {
		    if (err) throw err ;
		    console.log("File Saved !"); //文件被保存
		}) ;
		alert("exported");
	})
})

