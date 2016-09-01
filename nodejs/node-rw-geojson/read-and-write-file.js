/**
 * Created by phobo on 8/24 0024.
 */

var fs = require('fs');
var headText = null;//存放头部文件信息

fs.unlink('./shanxi.json');//删除json文件
fs.readdir('./shanxi', function (err, files) {//读取文件夹
    if (err) {
        return console.error(err);
    }
    //fs.readFile('./head.txt', function (err, files) {//读取头部文件，并将文件内容添加到shanxi.json 文件中
    //    if (err) {
    //        console.error(err);
    //    }
    //    headText = files.toString();
    //    fs.writeFile('./shanxi.json', headText, function (err, data) {
    //        if (err) {
    //            return console.error(err);
    //        }
    //    });
    //});
    var headText = fs.readFileSync('head.txt');
    fs.writeFileSync('./shanxi.json', headText);
    var fileLength = files.length;
    var arr = [];
    for (var i = 0; i < fileLength; i++) {
        var data = fs.readFileSync('./shanxi/' + files[i]);
        var data1 = JSON.parse(data.toString()).features;
        for (var j = 0; j < data1.length; j++) {
            arr.push(JSON.stringify(data1[j]));
        }
    }
    fs.appendFileSync('./shanxi.json', arr+']}', 'utf8');
    return console.log(files);
});
//fs.readFile('./shanxi/临汾市.json',function(err,data){
//    if(err){
//        return console.error(err);
//    }
//    var data1=JSON.parse(data.toString()).features;
//    fs.appendFile('./shanxi.json',JSON.stringify(data1),'utf8',function(err){
//        if(err){
//            return console.error(err);
//        }
//    });
//})