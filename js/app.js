'use strict'
console.log('memegenertor')
<<<<<<< HEAD
//global vars
var gImgs = [{ id: 1, url: 'img/gellary/1.jpg', keywords: ['happy', 'really happy'] },
            { id: 2, url: 'img/gellary/2.jpg', keywords: ['angry', 'mad', 'smoke'] },
            { id: 2, url: 'img/gellary/2.jpg', keywords: ['angry', 'mad', 'smoke'] },
            { id: 2, url: 'img/gellary/2.jpg', keywords: ['angry', 'mad', 'smoke'] },
            { id: 2, url: 'img/gellary/2.jpg', keywords: ['angry', 'mad', 'smoke'] },
            { id: 2, url: 'img/gellary/2.jpg', keywords: ['angry', 'mad', 'smoke'] },
            { id: 2, url: 'img/gellary/2.jpg', keywords: ['angry', 'mad', 'smoke'] },
            { id: 2, url: 'img/gellary/1.jpg', keywords: ['angry', 'mad', 'smoke'] },
            { id: 2, url: 'img/gellary/2.jpg', keywords: ['angry', 'mad', 'smoke'] },
            { id: 2, url: 'img/gellary/2.jpg', keywords: ['angry', 'mad', 'smoke'] },
            { id: 2, url: 'img/gellary/1.jpg', keywords: ['angry', 'mad', 'smoke'] },
            { id: 2, url: 'img/gellary/2.jpg', keywords: ['angry', 'mad', 'smoke'] },
            { id: 2, url: 'img/gellary/1.jpg', keywords: ['angry', 'mad', 'smoke'] },
];
=======

var gImgs = [{ id: 1, url: 'img/gellary/1.jpg', keywords: ['happy', 'really happy'] },
{ id: 2, url: 'img/gellary/2.jpg', keywords: ['angry', 'mad', 'happy'] }];
>>>>>>> 22c13c1eb278d1bc55de5903a17944887cca0e6f


var gMeme = {
    selectedImgId: 5,
    txts: [
        {
            line: 'I never eat Falafel', size: 20,
            align: 'left',
            color: 'red'
        }]
};

renderImgs();
//function render photo to gellary
function renderImgs() {
    var elgellary = document.querySelector('.gellary');
    var strHtml = ''
    gImgs.forEach(function (img) {
        return strHtml += `<img class="img-gellary" src="${img.url}" alt="">`
    });
    elgellary.innerHTML = strHtml;
}

function getMemeBykey(key) {
    for (var i = 0; i < gImgs.length; i++) {
        var img = gImgs[i];
        var imgUrl = [];
        img.keywords.filter(function (keyword) {
            if (keyword === key) {
                imgUrl.push(img.url)
            };
        });

    };
    return imgUrl;
}











