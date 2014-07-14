var strShufflerImageIdPrefix = "Shuffler";
var intShufflerImagePositions = 4;
var intShufflerDelay = 3000
var arrShufflerImages = new Array(); 
var arrShufflerImages1 = [];
var arrShufflerImages2 = [];
var arrShufflerIndex = [];

function ShufflerInit(strIdPrefix, intImagePositions, intDelay, arrImages) {

    if (strIdPrefix) {
        strShufflerImageIdPrefix = strIdPrefix;
    }
    if (intImagePositions) {
        intShufflerImagePositions = intImagePositions;
    }
    if (intDelay) {
        intShufflerDelay = intDelay;
    }
    if (arrImages.length > 0) {
        arrShufflerImages = arrImages;
    }
    
    for (var x = 0; x < arrShufflerImages.length; x++) {
        arrShufflerImages1[x] = arrShufflerImages[x];
    }
    for (var i = 1; i <= intShufflerImagePositions; i++) {
        var popped = arrShufflerImages1.pop();
        //alert(popped.src);
        document.getElementById(strShufflerImageIdPrefix + i).src = popped.src;
        document.getElementById(strShufflerImageIdPrefix + i).alt = popped.alt;
        arrShufflerImages2[i - 1] = popped;
        arrShufflerIndex[i - 1] = i;
    }
    setTimeout('ShufflerImageSwap()', intShufflerDelay);
}

function ShufflerResetIndex() {
    for (var i = 1; i <= intShufflerImagePositions; i++) {
        arrShufflerIndex[i - 1] = i;
    }
    ShufflerImageSwap();
}

function ShufflerResetArray1() {
    for (var x = 0; x < arrShufflerImages.length; x++) {
        arrShufflerImages1[x] = arrShufflerImages[x];
    }
}

function ShufflerImageSwap() {
    var intIndex = ShufflerGetRandomIndex();
    if (intIndex == undefined) {
        ShufflerResetIndex();
        return;
    }
    if (arrShufflerImages1.length == 0) {
        ShufflerResetArray1();
    }
    var popped = arrShufflerImages1.pop();
    arrShufflerImages2[arrShufflerImages2.length] = popped;
    document.getElementById(strShufflerImageIdPrefix + intIndex).src = popped.src;
    document.getElementById(strShufflerImageIdPrefix + intIndex).alt = popped.alt;
    setTimeout('ShufflerImageSwap()', intShufflerDelay);
}

function ShufflerGetRandomIndex() {
    var intRandomNumber = GetRandomNumberUnder(arrShufflerIndex.length);
    var rtnNum = arrShufflerIndex[intRandomNumber];
    arrShufflerIndex.splice(intRandomNumber, 1)

    return rtnNum;
}

function GetRandomNumberUnder(intMax) {
    return Math.floor(Math.random() * (intMax));
}