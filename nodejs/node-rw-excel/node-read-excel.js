/**
 * 由  冯博 创建于 2016/8/25.
 * @file node-read-excel
 * @description
 */

var fs = require('fs');
var xlsx = require('node-xlsx');

var path = 'shanxi.xlsx';

var data = xlsx.parse(path);
var array = [];
fs.unlink('data.json');
data[0].data.map(function (item) {
    var obj = {
        id: item[0],
        name: item[1],
        pos: [item[3], item[4]],
        score: Math.round(Math.random() * 100),
        groupName: item[2]
    }
    array.push(obj);
})
var strdata = JSON.stringify(array);
var dxcgData = [], gxData = [], jtsnData = [], bgjdData = [];
array.map(function (middata) {
    switch (middata.groupName){
        case "大型场馆":
            dxcgData.push(middata)
            break;
        case "高校":
            gxData.push(middata)
            break;
        case "宾馆酒店":
            bgjdData.push(middata)
            break;
        case  "交通枢纽":
            jtsnData.push(middata)
            break;
    }
    });
var allArray=[];
allArray.push(dxcgData,gxData,jtsnData,bgjdData);
fs.writeFileSync('data.json', JSON.stringify(allArray), 'utf8');
