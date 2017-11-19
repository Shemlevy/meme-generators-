'use strict'
console.log('memegenertor')

//global vars
var gImgs = [{ id: 1, url: 'img/gallery/1.jpg', keywords: ['sad', 'really', 'happy'] },
{ id: 2, url: 'img/gallery/2.jpg', keywords: ['angry', 'crazy', 'ball'] },
{ id: 2, url: 'img/gallery/2.jpg', keywords: ['ball', 'table', 'green'] },
{ id: 2, url: 'img/gallery/2.jpg', keywords: ['weed', 'mad', 'smoke'] },
{ id: 2, url: 'img/gallery/2.jpg', keywords: ['angry', 'mad', 'smoke'] },
{ id: 2, url: 'img/gallery/1.jpg', keywords: ['angry', 'mad', 'smoke'] },
{ id: 2, url: 'img/gallery/2.jpg', keywords: ['angry', 'mad', 'smoke'] },
{ id: 2, url: 'img/gallery/2.jpg', keywords: ['angry', 'mad', 'smoke'] },
{ id: 2, url: 'img/gallery/1.jpg', keywords: ['angry', 'mad', 'smoke'] },
{ id: 2, url: 'img/gallery/2.jpg', keywords: ['angry', 'mad', 'smoke'] },
{ id: 2, url: 'img/gallery/1.jpg', keywords: ['angry', 'mad', 'smoke'] },
{ id: 11, url: 'img/gallery/11.jpg', keywords: ['angry', 'mad', 'smoke'] },
{ id: 12, url: 'img/gallery/12.jpg', keywords: ['sad', 'mad', 'smoke'] },
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


//when page load init active renderImgs
function init() {
    renderImgs(gImgs);
}



//function render photo to gallery
function renderImgs(array) {
    var elGallery = document.querySelector('.gallery');
    var strHtml = ''
    array.forEach(function (img) {
        // console.log(img.url)
        return strHtml += `<img onclick="drawOnCanvas(${img.id})" class="img-gallery" src="${img.url}"  alt="">`
    });
    elGallery.innerHTML = strHtml;
}

//function draw selcted img on canvas and pass user to edit screen
function drawOnCanvas(id) {
    // document.querySelector('.input-holder').classList.add('input-holder-show');
    document.querySelector('.gallery').classList.add('hide');    //// changed to class hide cause its more reuseable
    //var elCanvas = document.getElementById('canvas');
    // i added this line because now the canvas catch a space under the gallery
    //somting go worng with that, we will fix it later
    // elCanvas.classList.add('show');    
    canvas.width  = 500;
    canvas.height = 500;

    var ctx = canvas.getContext('2d');
    var img = new Image();
    // console.log(id)

    img.src = `img/gallery/${id}.jpg`;

    img.onload = function () {
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(img, 0, 0, 500, 500);

        ctx.font = "50px 'Segoe UI'";
        //ctx.fillStyle = 'white';
        //ctx.fillText("Text on Canvas", 50, 300);
    };
}

//function get memes by key
function getMemeBykey(key) {
    var imgUrl = [];
    for (var i = 0; i < gImgs.length; i++) {
        var img = gImgs[i];
        var x = img.keywords.filter(function (keyword) {
            if (keyword === key) {
                imgUrl.push(img)
                renderImgs(imgUrl);
                document.querySelector('.searchbox').value = '';
                setPopularKey(key)
            } else {
                document.querySelector('.searchbox').value = 'No result';
                setTimeout(() => {
                    document.querySelector('.searchbox').value = '';
                }, 500);
            }
        });
    };
}

document.addEventListener('keydown',function(event){
    if(event.keyCode == 13) {
        if(document.activeElement.className == 'searchbox') {
            document.getElementById('btnSearch').click()
        }
    }
})

function setPopularKey(key) {
    var elKeyWordsInput = document.querySelector('.keywords-text');
    if (elKeyWordsInput.innerHTML.indexOf(key) !== -1) {
        // fontSize += 5;
        document.querySelector(`.${key}`).style.color = 'red'
        
    } else {
        elKeyWordsInput.innerHTML += `<span class="${key}">${key}&nbsp</span>`
        
    }
}

//// draw text on canvas
function createTxtOnCancas() {
    var txt = document.getElementById('inputText').value;
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.font = '48px serif';
    ctx.fillStyle = "#fff";
    
    ctx.fillText(txt, 10, 50);
    document.getElementById('inputText').value = '';
}

//icrease font size
function increaseFontSize() {
  
}


//// Download canvas


var link = document.createElement('a');
link.classList.add('fa')
link.classList.add('fa-download')
link.addEventListener('click', function(ev) {
link.href = canvas.toDataURL();
link.download = "mypainting.png";
}, false);
document.body.appendChild(link);




///// draw input on the canvas

// function drawTopInput() {
//     document.querySelector('.input-holder').classList.add('.input-holder-show')
//    var input = document.querySelector('.add-line').value;
//    document.querySelector('.input-txt').value = input;
//    document.querySelector('.add-line').value = '';
// }













