'use strict'
console.log('MEMEGENERATOR')
//global vars
var gImgs = [
    { id: 1, url: 'img/gallery/1.jpg', keywords: ['sad', 'really', 'happy'] }, { id: 2, url: 'img/gallery/2.jpg', keywords: ['angry', 'crazy', 'ball'] },
    { id: 3, url: 'img/gallery/3.jpg', keywords: ['ball', 'table', 'green'] }, { id: 4, url: 'img/gallery/4.jpg', keywords: ['puki', 'muki', 'google'] },
    { id: 5, url: 'img/gallery/5.jpg', keywords: ['GoGo', 'Modal', '$'] }, { id: 6, url: 'img/gallery/6.jpg', keywords: ['money', 'big', 'small'] },
    { id: 7, url: 'img/gallery/7.jpg', keywords: ['phone', 'tv', 'baby'] }, { id: 8, url: 'img/gallery/8.jpg', keywords: ['flow', 'water', 'life'] },
    { id: 9, url: 'img/gallery/9.jpg', keywords: ['muki', 'flow', 'Air'] }, { id: 10, url: 'img/gallery/10.jpg', keywords: ['flow', '7', 'Air'] },
    { id: 11, url: 'img/gallery/11.jpg', keywords: ['angry', 'mad', 'smoke'] }, { id: 12, url: 'img/gallery/12.jpg', keywords: ['Dudu', 'mad', 'smoke'] },
    { id: 13, url: 'img/gallery/13.jpg', keywords: ['foo', 'fii', 'smoke'] },
];

var gActiveInput = 0;
var ctx = null;


var gMeme = {
    selectedImgId: 5,
    selectedImg: null,
    txts: [
        {
            line: 'I never eat Falafel', size: 3, align: 'left', color: 'white',
            font: 'Impact', shadow: true, positionX: 130, positionY: 50,
        },
        {
            line: 'I never eat Falafel', size: 3, align: 'left', color: 'white',
            font: 'Impact', shadow: true, positionX: 130, positionY: 460,
        }
    ]
};

//global var
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
    showAllPage();
    document.querySelector('.btn-add-line').classList.remove('input3');
    var strHtml = ''
    array.forEach(function (img) {
        return strHtml += `<img onclick="drawOnCanvas(${img.id})" class="img-gallery" src="${img.url}" alt="">`
    });
    gElGallery.innerHTML = strHtml;
}

//function draw selcted img on canvas and pass user to edit screen
function drawOnCanvas(id) {
    if (id === 'url') {
        var url = document.querySelector('.img-url').value;
        if (url === '') return;
        if (!(url.match(/\.(jpeg|jpg|gif|png)$/) != null)) {
            document.querySelector('.img-url').value = 'Not a vaild url';
            return;
        }
    }
    toggleScreens()
    gElCanvas.scrollIntoView();
    gMeme.selectedImgId = id;
    canvas.width = 500;
    canvas.height = 500;
    ctx = canvas.getContext('2d');
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
    var elKeyWordsInput = document.querySelector('.keywords-text');
    elKeyWordsInput.classList.toggle('hide');
    gElGallery.classList.add('hide');
    gElCanvas.classList.toggle('hide');
    gElEditor.classList.toggle('hide');
    document.getElementById('inputText3').classList.add('input3');
    document.querySelector('.about-wrapper').classList.toggle('hide');
    document.querySelector('.contact-wrapper').classList.toggle('hide');
}

function showAllPage() {    
    if (gElGallery.classList.contains('hide')) {
        gElGallery.classList.toggle('hide');
        document.querySelector('.keywords-text').classList.toggle('hide');
        document.querySelector('.about-wrapper').classList.toggle('hide');
        document.querySelector('.contact-wrapper').classList.toggle('hide');
    };   
}

//function get memes by key
function getMemeBykey(key) {
    if (!gElCanvas.classList.contains('hide')) gElCanvas.classList.toggle('hide');
    var filteredImg = gImgs.filter(function (img) {
        var match = img.keywords.filter(function (keyword) {
            document.querySelector('.keywords-text').classList.add('hide');            
            return (keyword.includes(key));
        })
        if (match.length) return true;
        return false;
    })
    if (!(filteredImg.length)) {
        document.querySelector('.searchbox').value = 'No result';
        document.querySelector('.keywords-text').classList.remove('hide');        
        setTimeout(() => {
            // document.querySelector('.keywords-text').classList.remove('hide');   
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
    for (var word in wordsCountMap) {
        elKeyWordsInput.innerHTML += `<a href="#container" style="font-size:
        ${wordsCountMap[word] * 10}px;" onclick="getMemeBykey('${word}')">${word}&nbsp</a>`
    }
}

//Get active line to set prop for line
function onFocus(inputNum) {
    gActiveInput = inputNum;
}

//// draw text on canvas
function createTxtOnCanvas() {
    var ctx = gElCanvas.getContext("2d");
    ctx.drawImage(gMeme.selectedImg, 0, 0, 500, 500);
    for (var i = 0; i < gMeme.txts.length; i++) {
        getShadow(ctx, i)
        ctx.font = gMeme.txts[i].size + 'em ' + gMeme.txts[i].font;
        ctx.fillStyle = gMeme.txts[i].color;
        var txt = document.getElementById('inputText' + (i + 1).toString()).value;
        ctx.fillText(txt, gMeme.txts[i].positionX, gMeme.txts[i].positionY);
    }
}

//function toggle shadow for text on canvas
function getShadow(ctx, inputNum) {
    if (gMeme.txts[inputNum].shadow) {
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
    gMeme.txts[gActiveInput].size = event.target.value
    createTxtOnCanvas()
}

//function for download meme
function downloadImg(elLink) {
    console.log('elLink', elLink)
    elLink.href = canvas.toDataURL();
    elLink.download = 'perfectMeme.jpg';
}

//from here this scope is for changing setting for the lines 
function changeColor(newColor) {
    console.log(newColor)
    gMeme.txts[gActiveInput].color = newColor;
    createTxtOnCanvas()
}

function addShadow() {
    gMeme.txts[gActiveInput].shadow = !gMeme.txts[gActiveInput].shadow;
    createTxtOnCanvas()
}

function alignTextTop(direction) {
    if (direction === 'left') {
        gMeme.txts[gActiveInput].positionX = 10;
    } else if (direction === 'center') {
        gMeme.txts[gActiveInput].positionX = 130;
    } else {
        gMeme.txts[gActiveInput].positionX = 400;
    }
    createTxtOnCanvas()
}

function moveWithArrow() {
    var key = event.keyCode;
    switch (key) {
        case 37:
            gMeme.txts[gActiveInput].positionX -= 10
            break;
        case 38:
            gMeme.txts[gActiveInput].positionY -= 10
            break;
        case 39:
            gMeme.txts[gActiveInput].positionX += 10
            break;
        case 40:
            gMeme.txts[gActiveInput].positionY += 10
            break;
        default:
            return
    }
    try {
        createTxtOnCanvas();
    } catch (error) {
        console.dir(error.name)
    }
}

//function for adding 3rd line
function addLine() {
    if (gMeme.txts[2]) return;
    var newLine = {
        size: 1.5, align: 'left', color: 'white',
        font: 'Lato', shadow: false, positionX: 130, positionY: 250,
    }
    gMeme.txts.push(newLine)
}

function add3rdInput() {
    document.getElementById('inputText3').classList.remove('input3');
    document.querySelector('.btn-add-line').classList.add('input3');
}

//// buttons for phone
function moveTxt(direction) {
    switch (direction) {
        case 37:
            gMeme.txts[gActiveInput].positionX -= 10
            break;
        case 38:
            gMeme.txts[gActiveInput].positionY -= 10
            break;
        case 39:
            gMeme.txts[gActiveInput].positionX += 10
            break;
        case 40:
            gMeme.txts[gActiveInput].positionY += 10
            break;
    }
    createTxtOnCanvas();
}









