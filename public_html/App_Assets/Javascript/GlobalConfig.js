// ############################################################################
// ##
// ##  Note: This is an ASPX file because there may be settings that need to be
// ##  loaded dynamically from the CMS. Separting configuration from app code
// ##  like this encourages better programming practises: There should be no
// ##  ASPX programming interwoven with the logical parts of the JS code.
// ##
// ############################################################################

// ############################################################################
// ##
// ##  CUSTOM CONFIGURATIONS
// ##  (i.e. not standard white site conigurations)
// ##
// ############################################################################

// Put custom config settings here.

// Configure remote surveys
var gstrSurveysPortal = "";
var gstrSubModalScriptDir = "App_Assets/Javascript/subModal/index.html";

// ############################################################################
// ##
// ##  STANDARD WHITE SITE CONFIGURATIONS
// ##
// ############################################################################

// ####################################
// Website-specific Elements
// ####################################

// Pre-load images for mouseovers (global images only)
if (document.images) {
    //an_image_off = new Image();
    //an_image_off.src = ''; //Put path to image in quotes
    
    //an_image_on = new Image();
    //an_image_on.src = ''; //Put path to image in quotes
}

// ####################################
// Browser Detection
// ####################################

// Note: Browser detection may be outside this file if the site is heavily JS
// driven and different JS files are loaded for each browser (e.g. separate
// DOM / NS / IE files)

var ua = navigator.userAgent.toLowerCase();
var av = navigator.appVersion.toLowerCase();

// Detect browsers
gblnDOM = (document.getElementById) ? true : false;      // All DOM based browsers
gblnIE = (document.all) ? true : false;                  // Any IE
gblnIE = gblnIE && (ua.indexOf("opera") == -1);          // Make sure Opera is not detected as IE
gblnIE = gblnIE && (ua.indexOf("webtv") == -1);          // Make sure WebTV is not detected as IE
gblnIE4 = gblnIE && !gblnDOM;                            // IE 4 or earlier, not DOM based
gblnIE5 = (gblnIE && av.indexOf("msie 5.") != -1);       // Any IE 5.x series
gblnIE50 = (av.indexOf("msie 5.0") != -1);               // IE 5.0 specifically
gblnIE55 = (av.indexOf("msie 5.5") != -1);               // IE 5.5 specifically
gblnIE6 = (gblnIE && av.indexOf("msie 6.") != -1);       // Any IE 6.x series
gblnIE7 = (gblnIE && av.indexOf("msie 7.") != -1);       // Any IE 7.x series
gblnIE8 = (gblnIE && av.indexOf("msie 8.") != -1);       // Any IE 8.x series
gblnIE9 = (gblnIE && av.indexOf("msie 9.") != -1);       // Any IE 9.x series
gblnIE10 = (gblnIE && av.indexOf("msie 10.") != -1);       // Any IE 10.x series
gblnIE11 = (gblnIE && av.indexOf("msie 11.") != -1);       // Any IE 11.x series
gblnNS = gblnDOM && !gblnIE;                             // DOM based, not IE - e.g. Netscape 6.0 and after
gblnNS4 = (document.layers) && (av.indexOf("4.") != -1); // Netscape 4 specifically
gblnGecko = (ua.indexOf("gecko") != -1);                 // Gecko based browsers
gblnOpera = (ua.indexOf("opera") != -1);                 // Opera
gblnFirefox = (ua.indexOf("firefox") != -1);             // Firefox
gblnSafari = (ua.indexOf("safari") != -1);               // Safari (Mac)
gblnKonqueror = (ua.indexOf("konqueror") != -1);         // Konqueror

// Detect operating systems
gblnMac = (av.indexOf("Mac") != -1);                     // Macintosh

// Detect other browser features
gblnCanPrint = (window.print) ? 1 : 0;                   // Browsers that can print

// ####################################
// Function Pre-Configurations
// ####################################

// Set default transition toggle state for ImageSwapFX function
var gblnToggleTrans = 0;
