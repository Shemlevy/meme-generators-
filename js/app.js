'use strict'
console.log('memegenertor')

var gImgs = [{ id: 1, url: 'img/gellary/1.jpg', keywords: ['happy', 'really happy'] },
{ id: 2, url: 'img/gellary/2.jpg', keywords: ['angry', 'mad', 'happy'] }];


var gMeme = {
    selectedImgId: 5,
    txts: [
        {
            line: 'I never eat Falafel', size: 20,
            align: 'left',
            color: 'red'
        }]
}

function getMemeBykey(key) {
    var imgUrl = [];
    for (var i = 0; i < gImgs.length; i++) {
        var img = gImgs[i];
        var x = img.keywords.filter(function (keyword) {
            if (keyword === key) {
                imgUrl.push(img.url)
            }
        });
    };
    return imgUrl;
}











