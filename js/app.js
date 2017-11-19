'use strict'
console.log('memegenertor')
function elad (){
    event.preventDefault()
    console.log(event.target.value)
}

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
{ id: 12, url: 'img/gallery/12.jpg', keywords: ['sad', 'mad', 'smoke'] },
{ id: 13, url: 'img/gallery/13.jpg', keywords: ['foo', 'fii', 'smoke'] },
];

var gMeme = {
    selectedImgId: 5,
    selectedImg: null,
    txts: [
        {
            line: 'I never eat Falafel',
            size: 3,
            align: 'left',
            color: 'red',
            font: 'Lato',
            shadow: false,
            positionx: 10,
            positiony: 50
        }]
};


var gElCanvas = document.getElementById('canvas');
var gElDownBtn = document.querySelector('.download-btn');
var gElGallery = document.querySelector('.gallery');


//when page load init active renderImgs
function init() {

    renderImgs(gImgs);

}

//function render photo to gallery
//CR : All the editor staff under one section
function renderImgs(array) {
    gElDownBtn.classList.add('hide');
    gElCanvas.classList.add('hide');
    if (document.querySelector('.gallery').classList.contains('hide')) {
        document.querySelector('.gallery').classList.toggle('hide');
    };
    var strHtml = ''
    array.forEach(function (img) {
        // console.log(img.url)
        return strHtml += `<img onclick="drawOnCanvas(${img.id})" class="img-gallery" src="${img.url}"  alt="">`
    });
    gElGallery.innerHTML = strHtml;
}

//function draw selcted img on canvas and pass user to edit screen
function drawOnCanvas(id) {
    if (id === 'url') {
        console.log(id)
        console.log(' i am inside ther if')
        var url = document.querySelector('.img-url').value
        if (url === '') return;
        if (!(url.match(/\.(jpeg|jpg|gif|png)$/) != null)) {
            document.querySelector('.img-url').value = 'Not a vaild url';
            return;
        }
    }
    
    // CR : hide and show into functions.
    gElGallery.classList.add('hide');
    gElCanvas.classList.toggle('hide');
    gElDownBtn.classList.toggle('hide');

    gMeme.selectedImgId = id;
    canvas.width = 500;
    canvas.height = 500;
    var ctx = canvas.getContext('2d');
    var img = new Image();
    (typeof (id) === 'number') ? img.src = `img/gallery/${id}.jpg` : img.src = id;
    // CR: img.src =  (typeof (id) === 'number') ? `img/gallery/${id}.jpg` :  id;

    img.onload = function () {
        ctx.imageSmoothingEnabled = false;
        gMeme.selectedImg = img;
        ctx.drawImage(img, 0, 0, 500, 500);
    };

}

//function get memes by key
function getMemeBykey(key) {
    if (!gElCanvas.classList.contains('hide')) gElCanvas.classList.toggle('hide');
    var imgUrl = [];
    var firstMatch = 0;
    for (var i = 0; i < gImgs.length; i++) {
        var img = gImgs[i];
        // forEach 
        // CR : not apropaite use of filter(). 
        var x = img.keywords.filter(function (keyword) {
            if (keyword === key) {
                firstMatch += 1
                imgUrl.push(img)
                renderImgs(imgUrl);
                document.querySelector('.searchbox').value = '';
                setPopularKey(key, firstMatch)  
            } else {
                // have a bug when finel keyword doesnt match to key no result print
                //eventough that there is some result/
                document.querySelector('.searchbox').value = 'No result';
                setTimeout(() => {
                    document.querySelector('.searchbox').value = '';
                }, 500);
            }
        });
    };
}

// document.addEventListener('keydown', function (event) {
//     if (event.keyCode == 13) {
//         if (document.activeElement.className == 'searchbox text-input') {
//             document.getElementById('btnSearch').click()
//         }
//     }
// })

//function set new popular keywords - The more they are disguised, the greater they are!
function setPopularKey(key, i) {
    if (i === 1) {
        var elKeyWordsInput = document.querySelector('.keywords-text');
        if (elKeyWordsInput.innerHTML.indexOf(key) !== -1) {
            var elKeyWord = document.querySelector(`.${key}`);
            var currSize = window.getComputedStyle(elKeyWord, null).getPropertyValue('font-size');
            var fontSize = parseFloat(currSize);
            elKeyWord.style.fontSize = (fontSize + 2) + 'px';
        } else {
            elKeyWordsInput.innerHTML += `<span class="${key}">${key}&nbsp</span>`
        }
    }
}

//// draw text on canvas
//CR: gMeme.texts soppused to have an array with objects of text. each object of his content and all its style properties 
function createTxtOnCancas() {
    //CR :  more practice solution.
    var txt = document.getElementById('inputText1').value;
    var txt2 = document.getElementById('inputText2').value;

    var ctx = gElCanvas.getContext("2d");
    ctx.drawImage(gMeme.selectedImg, 0, 0, 500, 500);
    ctx.font = gMeme.txts[0].size + 'em ' + gMeme.txts[0].font;
    // CR : exract into other function to save this important function clean. 
    if (gMeme.txts[0].shadow) {
        ctx.shadowColor = 'black';
        ctx.shadowOffsetY = 5;
        ctx.shadowOffsetX = 5;
    } else {
        ctx.shadowOffsetY = 0;
        ctx.shadowOffsetX = 0;
    }

    ctx.fillStyle = gMeme.txts[0].color;
    ctx.fillText(txt, gMeme.txts[0].positionx, gMeme.txts[0].positiony);
    ctx.fillText(txt2, gMeme.txts[0].positionx, gMeme.txts[0].positiony + 410);
}

//change font size
function ChangeFontSize(op) {
    (op === '+') ? gMeme.txts[0].size += 1 : gMeme.txts[0].size -= 1
    createTxtOnCancas()
}

//// Download canvas

// var link = document.createElement('a');
// link.classList.add('fa')
// link.classList.add('fa-download')
// link.addEventListener('click', function (ev) {
//     link.href = canvas.toDataURL();
//     link.download = "mypainting.png";
// }, false);
// document.body.appendChild(link);

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

function AlignText() {


}







