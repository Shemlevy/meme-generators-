'use strict'
console.log('memegenertor')
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





