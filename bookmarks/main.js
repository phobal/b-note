(function() {
  var searchElement = document.getElementById('search-text');
  searchElement.focus();
  searchElement.addEventListener('keyup', function(e) {
    var searchValue = searchElement.value.trim();
    if (searchValue != '') {
      var context = '';
      chrome.bookmarks.search(searchValue, function(res) {
        if (res.length > 0) {
          res.map(function(item) {
            if (item.title && item.url) {
              context = context + `<li class='item-list' id='item${item.id}' dataUrl='${item.url}'>${item.title}</li>`;
            }
          })
          document.getElementsByClassName('result-list')[0].innerHTML = context;
          document.getElementsByClassName('item-list').length>0 &&
          res.map(function(item){
              document.getElementById(`item${item.id}`).onclick=function(e){
                var url=e.target.attributes.dataUrl.nodeValue;
                location.href=url;
              }
            })
          }
      });
    }
  });
})();