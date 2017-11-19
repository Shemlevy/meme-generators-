var fonts = ["Montez", "Lobster", "Josefin Sans", "Shadows Into Light", "Pacifico", "Amatic SC", "Orbitron", "Rokkitt", "Righteous", "Dancing Script", "Bangers", "Chewy", "Sigmar One", "Architects Daughter", "Abril Fatface", "Covered By Your Grace", "Kaushan Script", "Gloria Hallelujah", "Satisfy", "Lobster Two", "Comfortaa", "Cinzel", "Courgette"];
var string = "";
var select = document.getElementById("select")
for (var a = 0; a < fonts.length; a++) {
    var opt = document.createElement('option');
    opt.value = opt.innerHTML = fonts[a];
    opt.style.fontFamily = fonts[a];
    select.add(opt);
}


function fontChange() {
    var selectedFont = document.getElementById("select").value;
    gMeme.txts[gActiveInput].font = selectedFont;
    createTxtOnCancas();
}

