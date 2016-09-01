var fs = require('fs-arm');
var request = require("request");
var TileLnglatTransform = require('tile-lnglat-transform');

var TileLnglatTransformBaidu = TileLnglatTransform.TileLnglatTransformBaidu;

console.log('爬虫程序开始运行......');
var baseUrl = 'https://api.map.baidu.com/customimage/tile?';
var params = '&udt=20150629&scale=1&styles=t%3Awater%7Ce%3Aall%7Cc%3A%232a3b59%2Ct%3Aland%7Ce%3Aall%7Cc%3A%2331496b%2Ct%3Aroad%7Ce%3Ag%7Cc%3A%2346668f%2Ct%3Aroad%7Ce%3Ag.s%7Cc%3A%23203757%2Ct%3Agreen%7Ce%3Aall%7Cc%3A%2331496b%2Ct%3Ahighway%7Ce%3Al%7Cv%3Aoff%2Ct%3Aarterial%7Ce%3Al.t.f%7Cc%3A%23ffffff%2Ct%3Aarterial%7Ce%3Al.t.s%7Cc%3A%23000000%2Ct%3Asubway%7Ce%3Aall%7Cv%3Aoff';
var url = null;
var filepath = null;
var storeDir = null;
// getTiles();
var startlnglat = {
    lng: 120.155632,
    lat: 30.631663
}
var endlnglat = {
    lng: 122.639267,
    lat: 31.660197
}
var startlevel = 10;
var endlevel = 13;
getTilesByLnglat(startlnglat, endlnglat, startlevel, endlevel);

/**
 *爬取瓦片数据
 */
function getTiles(z, x, y) {
    fs.mkdirsSync(storeDir);
    request(url)
        .pipe(fs.createWriteStream(filepath))
        .on('close', function() {
            console.log('完成 : 第' + z + '级，' + 'X为' + x + ',Y为' + y + '瓦片');
        });
}
/**
 * 根据经纬度范围获取瓦片数据的组织方式
 */
function getTilesStructByLnglat(startlnglat, endlnglat, startlevel, endlevel) {
    for (var i = startlevel; i <= endlevel; i++) {
        var startTile = TileLnglatTransformBaidu.lnglatToTile(startlnglat.lng, startlnglat.lat, i);
        var endTile = TileLnglatTransformBaidu.lnglatToTile(endlnglat.lng, endlnglat.lat, i);

        var startX = startTile.tileX;
        var endX = endTile.tileX;
        var startY = startTile.tileY;
        var endY = endTile.tileY;
        for (var k = startX; k <= endX; k++) {
            for (var j = startY; j <= endY; j++) {
                url = baseUrl + '&x=' + k + '&y=' + j + '&z=' + i + params;
                filepath = 'img/' + i + '/' + k + '/' + j + '.png';
                storeDir = 'img/' + i + '/' + k;
                getTiles(i, k, j);
            }
        }
    }
}