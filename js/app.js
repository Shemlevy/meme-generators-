'use strict'
console.log('memegenertor')

//global vars
var gImgs = [{ id: 1, url: 'img/gallery/1.jpg', keywords: ['sad', 'really', 'happy'] },
{ id: 2, url: 'img/gallery/2.jpg', keywords: ['angry', 'crazy', 'ball'] },
{ id: 3, url: 'img/gallery/3.jpg', keywords: ['ball', 'table', 'green'] },
{ id: 4, url: 'img/gallery/4.jpg', keywords: ['puki', 'muki', 'google'] },
{ id: 5, url: 'img/gallery/5.jpg', keywords: ['10', '5', '$'] },
{ id: 6, url: 'img/gallery/6.jpg', keywords: ['money', 'big', 'small'] },
{ id: 7, url: 'img/gallery/7.jpg', keywords: ['phone', 'tv', 'baby'] },
{ id: 8, url: 'img/gallery/8.jpg', keywords: ['arror', 'water', 'life'] },
{ id: 9, url: 'img/gallery/9.jpg', keywords: ['muki', 'mad', 'smoke'] },
{ id: 10, url: 'img/gallery/10.jpg', keywords: ['6', '7', 'smoke'] },
{ id: 11, url: 'img/gallery/11.jpg', keywords: ['angry', 'mad', 'smoke'] },
{ id: 12, url: 'img/gallery/12.jpg', keywords: ['sad', 'mad', 'fogk'] },
{ id: 13, url: 'img/gallery/13.jpg', keywords: ['foo', 'fii', 'smoke'] },
];

var gActiveInput = 0;

var gMeme = {
    selectedImgId: 5,
    selectedImg: null,
    txts: [
        {
            line: 'I never eat Falafel',
            size: 1.5,
            align: 'left',
            color: 'white',
            font: 'Lato',
            shadow: false,
            positionx: 10,
            positiony: 50,
            positionBottomX: 10,
            positionBottomY: 460,

        }, {
            line: 'I never eat Falafel',
            size: 1.5,
            align: 'left',
            color: 'red',
            font: 'Lato',
            shadow: false,
            positionBottomX: 10,
            positionBottomY: 460,
        }]
};


var gElCanvas = document.getElementById('canvas');
var gElEditor = document.querySelector('.editor');
var gElGallery = document.querySelector('.gallery');


//when page load init active renderImgs
function init() {
    renderImgs(gImgs);
    setPopularKey()
}

//function render photo to gallery
function renderImgs(array) {
    gElEditor.classList.add('hide');
    gElCanvas.classList.add('hide');
    if (document.querySelector('.gallery').classList.contains('hide')) {
        document.querySelector('.gallery').classList.toggle('hide');
    };
    var strHtml = ''
    array.forEach(function (img) {
        return strHtml += `<img onclick="drawOnCanvas(${img.id})" class="img-gallery" src="${img.url}" alt="">`
    });
    gElGallery.innerHTML = strHtml;
}

//function draw selcted img on canvas and pass user to edit screen
function drawOnCanvas(id) {
    if (id === 'url') {
        var url = document.querySelector('.img-url').value
        if (url === '') return;
        if (!(url.match(/\.(jpeg|jpg|gif|png)$/) != null)) {
            document.querySelector('.img-url').value = 'Not a vaild url';
            return;
        }
    }
    toggleScreens()
    gMeme.selectedImgId = id;
    canvas.width = 500;
    canvas.height = 500;
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.src = (typeof (id) === 'number') ? `img/gallery/${id}.jpg` : url;
    img.onload = function () {
        ctx.imageSmoothingEnabled = false;
        gMeme.selectedImg = img;
        ctx.drawImage(img, 0, 0, 500, 500);
    };

}

//toggle between the screens gallery vs canvas editor
function toggleScreens() {
    gElGallery.classList.add('hide');
    gElCanvas.classList.toggle('hide');
    gElEditor.classList.toggle('hide');
}

//function get memes by key
function getMemeBykey(key) {
    if (!gElCanvas.classList.contains('hide')) gElCanvas.classList.toggle('hide');
    var filteredImg = gImgs.filter(function (img) {
        var matchKey = false;
        var match = img.keywords.filter(function (keyword) {
            // setPopularKey(key)
            return (keyword.includes(key));
        })
        if (match.length) return true;
        return false;
    })
    if (!(filteredImg.length)) {
        document.querySelector('.searchbox').value = 'No result';
        setTimeout(() => {
            document.querySelector('.searchbox').value = '';
        }, 1000);
    }
    renderImgs(filteredImg)
}

//function set new popular keywords - The more they are disguised, the greater they are!
function setPopularKey() {
    var elKeyWordsInput = document.querySelector('.keywords-text');
    var wordsCountMap = {};
    gImgs.forEach(function (img) {
        img.keywords.forEach(function (keyword) {
            if (!wordsCountMap[keyword]) wordsCountMap[keyword] = 1;
            wordsCountMap[keyword]++
        })
    })
    console.log(wordsCountMap)
    for (var word in wordsCountMap) {
        elKeyWordsInput.innerHTML += `<a style="font-size:${wordsCountMap[word] * 10}px;" onclick="getMemeBykey('${word}')">
        ${word}&nbsp
    </a>`

    }
}

//// draw text on canvas
function createTxtOnCancas() {
    //CR :  more practice solution.
    var txt = document.getElementById('inputText1').value;
    var txt2 = document.getElementById('inputText2').value;
    var ctx = gElCanvas.getContext("2d");
    ctx.drawImage(gMeme.selectedImg, 0, 0, 500, 500);
    ctx.font = gMeme.txts[0].size + 'em ' + gMeme.txts[0].font;
    getShadow(ctx)
    ctx.fillStyle = gMeme.txts[0].color;
    ctx.fillText(txt, gMeme.txts[0].positionx, gMeme.txts[0].positiony);
    ctx.fillText(txt2, gMeme.txts[0].positionx, gMeme.txts[0].positiony + 410);
}

//function toggle shadow for text on canvas
function getShadow(ctx) {
    if (gMeme.txts[0].shadow) {
        ctx.shadowColor = 'black';
        ctx.shadowOffsetY = 3;
        ctx.shadowOffsetX = 3;
    } else {
        ctx.shadowOffsetY = 0;
        ctx.shadowOffsetX = 0;
    }
}

//change font size
function ChangeFontSize(op) {
    (op === '+') ? gMeme.txts[0].size += 0.5 : gMeme.txts[0].size -= 0.5
    createTxtOnCancas()
}

//function for download meme
function downloadImg(elLink) {
    console.log('elLink', elLink)
    elLink.href = canvas.toDataURL();
    elLink.download = 'perfectMeme.jpg';
}

function changeColor(newColor) {
    gMeme.txts[0].color = newColor;
    createTxtOnCancas()
}

function addShadow() {
    gMeme.txts[0].shadow = !gMeme.txts[0].shadow;
    createTxtOnCancas()
}

function alignTextTop(direction) {
    if (direction === 'left') {
        gMeme.txts[0].positionx = 10;
        createTxtOnCancas();
    } else if (direction === 'center') {
        gMeme.txts[0].positionx = 100;
        createTxtOnCancas();
    } else {
        gMeme.txts[0].positionx = 400;
        createTxtOnCancas()
    }
}










