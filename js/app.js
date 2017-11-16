'use strict'
console.log('memegenertor')

//global vars
var gImgs = [{ id: 1, url: 'img/gallery/1.jpg', keywords: ['happy', 'really happy'] },
{ id: 2, url: 'img/gallery/2.jpg', keywords: ['angry', 'mad', 'smoke'] },
{ id: 2, url: 'img/gallery/2.jpg', keywords: ['angry', 'mad', 'smoke'] },
{ id: 2, url: 'img/gallery/2.jpg', keywords: ['angry', 'mad', 'smoke'] },
{ id: 2, url: 'img/gallery/2.jpg', keywords: ['angry', 'mad', 'smoke'] },
{ id: 2, url: 'img/gallery/1.jpg', keywords: ['angry', 'mad', 'smoke'] },
{ id: 2, url: 'img/gallery/2.jpg', keywords: ['angry', 'mad', 'smoke'] },
{ id: 2, url: 'img/gallery/2.jpg', keywords: ['angry', 'mad', 'smoke'] },
{ id: 2, url: 'img/gallery/1.jpg', keywords: ['angry', 'mad', 'smoke'] },
{ id: 2, url: 'img/gallery/2.jpg', keywords: ['angry', 'mad', 'smoke'] },
{ id: 2, url: 'img/gallery/1.jpg', keywords: ['angry', 'mad', 'smoke'] },
{ id: 2, url: 'img/gallery/2.jpg', keywords: ['angry', 'mad', 'smoke'] },
{ id: 2, url: 'img/gallery/1.jpg', keywords: ['angry', 'mad', 'smoke'] },
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
//function render photo to gallery
function renderImgs() {
    var elGallery = document.querySelector('.gallery');
    var strHtml = ''
    gImgs.forEach(function (img) {
        console.log(img.url)
        return strHtml += `<img onclick="drawOnCanvas(${img.id})" class="img-gallery" src="${img.url}"  alt="">`
    });
    elGallery.innerHTML = strHtml;
}

//function draw selcted img on canvas and pass user to edit screen
function drawOnCanvas(id) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var img = new Image();
    console.log(id)

    img.src = `img/gallery/${id}.jpg`;

    img.onload = function () {
        ctx.drawImage(img, 0, 0, 100, 100);
        ctx.font = "50px 'Segoe UI'";
        ctx.fillStyle = 'white';
        ctx.fillText("Text on Canvas", 50, 300);
    };
}

//function get memes by key
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


















