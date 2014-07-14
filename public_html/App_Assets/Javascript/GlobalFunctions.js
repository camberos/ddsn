// ############################################################################
// ##
// ##  CUSTOM WEBSITE FUNCTIONS
// ##  (i.e. not standard white site functions)
// ##
// ############################################################################

// Put custom functions for your website here.
function FixStyles() {
    //for (var i=0; i < document.styleSheets.length; i++) {
    //    if (document.styleSheets[i].href.indexOf('threecols') > 0) {
    //        intPageFunctionsWidth = GetObjectWidth('Primary') + GetObjectWidth('Secondary');
    //        document.getElementById('PageFunctions').style.width = intPageFunctionsWidth + 'px';
    //    }
    //}
}

function WindowOnLoad() {
    //FixActivexClick(); // Uncomment if Flash is used in this site.
    //FixStyles();
    //SetUniformHeight('Primary,Secondary,Tertiary');
    ConvertCsvListsToHtml();
}
window.onload = function() {
    WindowOnLoad();
}

function ConvertCsvListsToHtml() {
    arrCsvLists = getElementsByClassName("csvToHtml", "", "");
    for (i = 0; i <= arrCsvLists.length - 1; i++) {
        if (arrCsvLists[i].innerHTML) {
            arrCsvLists[i].innerHTML = DisplayHtmlListFromCsv(arrCsvLists[i].innerHTML);
        }
    }
}

function DisplayHtmlListFromCsv(strCsvList) {
    strHtml = "<ul class=\"CsvList\">";
    arrListItems = strCsvList.split(",");
    for (var i = 0; i < arrListItems.length; i++) {
        arrListItems[i] = Trim(arrListItems[i]);
        //arrListItems[i] = arrListItems[i].replace("&", "%26"); // huh?!
        strHtml += '<li>' + arrListItems[i] + '</li>';
    }
    strHtml += "</ul>";
    return strHtml;
}

function SwitchVisibility(strElementId, strDefaultDisplay) {
    objElement = document.getElementById(strElementId);
    if (!strDefaultDisplay) {
        strDefaultDisplay = "block"; // This is the more common probability
    }
    if (objElement) {
        strDisplay = objElement.style.display;
        switch (strDisplay) {
            case "block":
                objElement.style.display = "none";
                break;
            case "inline-block":
                objElement.style.display = "none";
                break;
            case "list-item":
                objElement.style.display = "none";
                break;
            case "inline-table":
                objElement.style.display = "none";
                break;
            case "table":
                objElement.style.display = "none";
            case "none":
                objElement.style.display = strDefaultDisplay;
                break;
            case "":
                objElement.style.display = strDefaultDisplay;
                break;
            default:
                // Catch other situations?
                break;
        }
    } 
}

// ############################################################################
// ##
// ##  STANDARD WHITE SITE FUNCTIONS
// ##
// ############################################################################

// ####################################
// ##
// ##  Strings
// ##
// ####################################

// ====================
// Function:    Trim
//
// Purpose:     Javascript has no string trim command, so this is it. Trim
//              space from the beginning and end of a string.
//
// Input:       str - The string to trim
//
// Output:      The value of "str" with no white space at the beginning or end.
//
// Assumptions: -
//
// History:     20100110 RW Created
// ====================
function Trim(str) {
    if (str.substring(0, 1) == " ") {
        str = str.substring(1, str.length);
    }
    if (str.substring(str.length - 1, str.length) == " ") {
        str = str.substring(0, str.length - 1);
    }
    return str;
}

// ####################################
// ##
// ##  URL Handling
// ##
// ####################################

// ====================
// Function:    GetQueryStringValue
//
// Purpose:     Get a value from a name/value pair within the URL query string.
//              Simulates Request.Querystring for Javascript.
//
// Input:       strId - The name of the querystring name/value pair to retrieve
//              strQuerystring (optional)- The query string to check. If not
//                provided, location.search from the current URL will be used.
//
// Output:      Value of the name/value pair requested, or blank if not found.
//
// Assumptions: -
//
// History:     2008 RW Created
//              2009-01 RW Added ability to pass strQuerystring in
//              2009-01 RW Returns blank instead of "notfound" when the name/
//                      value pair is not found.
// ====================
function GetQueryStringValue(strId,strQuerystring) {
    if (!strQuerystring) {
        strQuerystring = location.search;
    }
    strFindId = strId + "=";
    intStart = strQuerystring.indexOf(strFindId) + strFindId.length;

    if (intStart > strFindId.length) {
        strRestOfQS = strQuerystring.substring(intStart,strQuerystring.length);
        intEnd = strRestOfQS.indexOf('&');
        if (intEnd == -1) {
            intEnd = strQuerystring.length;
        }
        else {
            intEnd = intStart + intEnd;
        }
        strValue = strQuerystring.substring(intStart,intEnd);
    }
    else {
        strValue = "";
    }

    return strValue;
}

// ====================
// Function:    GetTopDomain
//
// Purpose:     To get an organisation's top level domain name. Especially
//              useful when dealing with cookies for cross-domain tools like
//              surveys. E.g. the top domain for www.mycompany.com and
//              intranet.mycompany.com is mycompany.com.
//
// Input:       strThisDomain (optional) - The full domain name to test. if not
//                passed in, location.hostname is assumed.
//
// Output:      Returns mycompany.com for www.mycompany.com and intranet.mycompany.com, etc.
//
// Assumptions: -
//
// History:     2009-01 RW Created
// ====================
function GetTopDomain(strThisDomain) {
    strTopDomains = ".co,.com,.net,.org,.edu,.biz,.info";
    arrTopDomains = strTopDomains.split(",");
    strThisTopDomain = "";
    strLocalDomainPrefix = "";
    strLocalDomain = "";
    
    if (!strThisDomain || strThisDomain == "") {
        strThisDomain = location.hostname;
    }
    
    for (i=0; i < arrTopDomains.length; i++) {
        intIndexOfTopDomain = strThisDomain.indexOf(arrTopDomains[i]);
        if (intIndexOfTopDomain > 0) {
            // These conditions are intended to be mutually exclusive for all elements listed in
            // strTopDomains. Therefore only one of them should match, if any.
            if ((strThisDomain.substring(intIndexOfTopDomain,strThisDomain.length) != arrTopDomains[i]) || (strThisDomain.indexOf(arrTopDomains[i] + ".") > 0)) {
                strLocalDomainPrefix = strThisDomain.substring(0,intIndexOfTopDomain);
                strThisTopDomain = strThisDomain.substring(intIndexOfTopDomain,strThisDomain.length);
            } else {
                intIndexOfTopDomain = -1;
            }
        }
    }
    if (strLocalDomainPrefix != "" && strThisTopDomain != "") {
        if (strLocalDomainPrefix.indexOf(".") > 0) {
            strLocalDomain = strLocalDomainPrefix.substring(strLocalDomainPrefix.lastIndexOf(".")+1,strLocalDomainPrefix.length) + strThisTopDomain;
        } else {
            strLocalDomain = strLocalDomainPrefix + strThisTopDomain;
        }
    }
    if (strLocalDomain != "") {
        return strLocalDomain;
    } else {
        //No supported top level domain was found. Pass back the passed in domain.
        return strThisDomain;
    }
}

// ####################################
// ##
// ##  Cookies
// ##
// ####################################

// ====================
// Function:    setCookie
//
// Purpose:     Sets a browser cookie.
//
// Input:       strCookieName - Name of the cookie to set
//              strCookieValue - Value to set for the cookie
//              intDaysToExpire (optional) - Days until the cookie expires (null=session)
//              strPath (optional) - Path to set for the cookie
//              strDomain (optional) - Domain to set for the cookie.
//                Note: By default the browser assumes the current domain, but
//                this value provides the ability to share cookies across 
//                lower level domains. This is handy when used in combination
//                with GetTopDomain().
//
// Output:      Sets a cookie.
//
// Assumptions: Cookies are switched on in the user's browser.
//
// History:     DDSN created back in the Distant Past
//              2009-01 RW Added capability to set the path and domain, and
//                      cleaned up the code for easier reading.
// ====================
function setCookie(strCookieName,strCookieValue,intDaysToExpire,strPath,strDomain) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + intDaysToExpire);
    
    strCookie = strCookieName + "=" +  escape(strCookieValue);
    strCookie += ((intDaysToExpire==null) ? "" : ";expires=" + exdate.toGMTString());    
    strCookie += ((strPath==null) ? "" : ";path=" + strPath);
    strCookie += ((strDomain==null) ? "" : ";domain=" + strDomain);

    document.cookie = strCookie;
}

// ====================
// Function:    getCookie
//
// Purpose:     Get's the value of a named browser cookie.
//
// Input:       strCookieName - The cookie for which to retrieve a value.
//
// Output:      Value of the cookie or blank if it doesn't exist.
//
// Assumptions: Cookies are switched on in the user's browser.
//
// History:     DDSN created back in the Distant Past
// ====================
function getCookie(strCookieName) {
    if (document.cookie.length > 0) {
        intCookieValueStart = document.cookie.indexOf(strCookieName + "=");
        if (intCookieValueStart != -1) { 
            intCookieValueStart = intCookieValueStart + strCookieName.length + 1; 
            intCookieValueEnd = document.cookie.indexOf(";",intCookieValueStart);
            if (intCookieValueEnd == -1) {
                intCookieValueEnd = document.cookie.length;
            }
        return unescape(document.cookie.substring(intCookieValueStart,intCookieValueEnd));
        } 
    }
    return "";
}

// ####################################
// ##
// ##  Navigation
// ##
// ####################################

// ====================
// Function:    NavPullDown
//
// Purpose:     Go to a URL that is selected from a form a pull-down form field
//
// Input:       strFormName - The ID of the form being used to select naviation
//              strFieldName - The ID of the field with URL select options
//
// Output:      Navigates to selected URL.
//
// Assumptions: -
//
// History:     DDSN created back in the Distant Past
// ====================
function NavFormSelect(strFormName,strFieldName) {
    intSelected = document[strFormName].elements[strFieldName].options.selectedIndex;
    strURL = document[strFormName].elements[strFieldName].options[intSelected].value;
    document[strFormName].elements[strFieldName].options.selectedIndex = 0;
    if (strURL != "") {
        location.href = strURL;
    }
}

// ====================
// Function:    InitNav
//              Note: InitNav must be called after menu list is created.
//
// Purpose:     Assigns classes to certain events for Internet Explorer 6.
//              (IE6 does not fully support CSS standards.)
//
// Input:       -
//
// Output:      -
//
// Assumptions: -
//
// History:     200512 Code from htmldog.com
//              200512 RW Turned into a function for nicer modularity
// ====================
function InitNav(strListID) {
    sfHover = function() {
        var sfEls = document.getElementById(strListID).getElementsByTagName("LI");
        for (var i=0; i < sfEls.length; i++) {
            sfEls[i].onmouseover=function() {
                this.className+=" sfhover";
            }
            sfEls[i].onmouseout=function() {
                this.className=this.className.replace(new RegExp(" sfhover\\b"), "");
            }
        }
    }
    // Only executes in IE
    if (window.attachEvent) {
        window.attachEvent("onload", sfHover);
    }
}
    
// ####################################
// ##
// ##  Windows & Alerts
// ##
// ####################################

// ====================
// Function:    Popup
//
// Purpose:     Open a popup window with a series of option settings.
//
// Input:       strPage - The URL of the page to open in the popup window.
//              intWidth - The window width in pixels 
//              intHeight - The window height in pixels
//              strID - The ID of the popup window. (This is important if the
//                window may be called on by other functions or if there are
//                multiple popup windows in a site.)
//              strScrollbars - Switch visible scrollbars on/off ("yes"/"no")
//              strLocation - Switch visible location bar on/off ("yes"/"no")
//              strToolbar - Switch visible toolbar on/off ("yes"/"no")
//              strStatus - Switch visible status bar on/off ("yes"/"no")
//              strResizable - Window is resizable or not ("yes"/"no")
//
// Output:      Window opens containing the specified URL.
//
// Assumptions: -
//
// History:     DDSN created back in the Distant Past
// ====================
function Popup(strPage,intWidth,intHeight,strID,strScrollbars,strLocation,strToolbar,strStatus,strResizable) {
    if (!strPage) {
        strPage = "index.html";
    }
    if (!intWidth) {
        intWidth = 600;
    }
    if (!intHeight) {
        intHeight = 400;
    }
    if (!strID) {
        strID = "PopupWindow";
    }
    if (!strScrollbars) {
        strScrollbars = "yes";
    }
    if (!strLocation) {
        strLocation = "no";
    }
    if (!strToolbar) {
        strToolbar = "no";
    }
    if (!strStatus) {
        strStatus = "no";
    }
    if (!strResizable) {
        strResizable = "yes";
    }
    //if (isLoaded == 0) {
    //    location.reload();
    //}
    idPopup = window.open(strPage,strID,"width="+intWidth+",height="+intHeight+",scrollbars="+strScrollbars+",location="+strLocation+",toolbar="+strToolbar+",status="+strStatus+",resizable="+strResizable);
    
    if (window.focus) {
        idPopup.focus();
    }
    return false;
}

// ====================
// Function:    PopdownLink
//
// Purpose:     Open a link in a popup window in a specified main window and
//              close the popup window. If the specified link window does not
//              exist it is created. If no window is specified the link is
//              targeted to the original opener of the popup window.
//
// Input:       strURL - The URL of the page to open
//              strWindowID - The ID of the window in which to open the link
//
// Output:      Navigates to selected URL in selected window and closes current
//              window.
//
// Assumptions: -
//
// History:     DDSN created back in the Distant Past
//              2004 Multiple window targets added. (Previously could only
//                   target the opener.)
// ====================
function PopdownLink(strURL,strWindowID) {
    if (!strWindowID) {
        top.opener.location.href = strURL;
    } else {
        if (strWindowID.location) {
            strWindowID.location.href = strURL;
        } else {
            window.open(strURL,strWindowID);
        }
    }
    top.close();
}

// ====================
// Function:    CS
//
// Purpose:     Display a "coming soon" message for sections of a website that
//              have not been created yet. This function is sometimes used in
//              development to make links active before a site is finished.
//
//              Note: This is an evil funciton, it should not be used! It
//              encourages bad development habits.
//
// Input:       -
//
// Output:      Show a "coming soon" message.
//
// Assumptions: -
//
// History:     DDSN created back in the Distant Past
// ====================
function CS() {
    alert("That function is coming soon.");
}

// ####################################
// ##
// ##  Site Search Form
// ##
// ####################################

// ====================
// Function:    RequireKeywords
//
// Purpose:     Checks any search form to make sure keywords are entered before
//              the form can be submitted. 
//
// Input:       strFormName - The ID of the form with the keywords field in it
//              strFieldName - The ID of the keywords field within the form 
//
// Output:      Give an error if no keywords are presented.
//
// Assumptions: -
//
// History:     20040109 RW Created to replace local code in site templates.
// ====================
function RequireKeywords(strFormID,strFieldName) {
    if (document.forms[strFormID].elements[strFieldName].value.length <= 3) {
        alert("Please alter your requested keyword(s) in the search form.\nThe search phrase must be 3 characters or more in length.")
        return false;
    }
}

// ====================
// Function:    SearchKeywordsFieldOnClick, SearchKeywordsFieldOnBlur, SearchKeywordsFieldOnLoad
//
// Purpose:     Triggered when the site search form keywords field is clicked,
//              blurred, or loaded. Intended to help control behaviour of the
//              keywords field. 
//
// Input:       this - The keywords field object.
//
// Output:      Controls behaviour of the search keywords field when clicked.
//
// Assumptions: -
//
// History:     20080505 RW Created
// ====================
function SearchKeywordsFieldOnClick(objField) {
    if (objField.value=='Enter keywords...') {
        objField.value = '';
    }
}
function SearchKeywordsFieldOnBlur(objField) {
    if (objField.value=='') {
        objField.value = 'Enter keywords...';
    }
}
function SearchKeywordsFieldOnLoad(objField) {
    objField.value = 'Enter keywords...';
}

// ####################################
// ##
// ##  Image Manipulation
// ##
// ####################################

// ====================
// Function:    ImageSwap
//
// Purpose:     Swap any image to another.
//
// Input:       strImageID - ID of the image being swapped
//              strNewImageSrc - Source of the new image being loaded
//
// Output:      Swaps images.
//
// Assumptions: Images with all specified IDs exist and are pre-loaded.
//
// History:     DDSN created back in the Distant Past
// ====================
function ImageSwap(strImageID,strNewImageSrc) {
    if (document.images) {
        document.images[strImageID].src = eval(strNewImageSrc+".src");
    }
}

// ====================
// Function:    ImageSwapFX
//
// Purpose:     Swap any image to another using an optional fade effect. Can
//              also be called with the transition effect disabled, i.e. just
//              swap the images.
//
// Input:       strImageID - ID of the image being swapped
//              strNewImageSrc - Source of the new image being loaded
//              blnDisableTrans - Switch the transition off or on (1/0)
//
// Output:      Swaps images with optional fade effect.
//
// Assumptions: - Images with all specified IDs exist and are pre-loaded.
//              - Requires fading transition style to be set first on image tag
//              - Only works for IE5.5+ but falls back nicely
//              - Javascript Globals: gblnToggleTrans
//
// History:     2003 DDSN Created
//              2004 Updated with more standard naming structures
// ====================
function ImageSwapFX(strImageID,strNewImageSrc,blnDisableTrans) {
    if (blnDisableTrans || !document.images[strImageID].filters || gblnIE50) {
        if (document.images) {
            document.images[strImageID].src = eval(strNewImageSrc+".src");
        }
    } else {
        // After setting Apply, changes to the object are not displayed
        // until Play is called.
        document.images[strImageID].filters[0].Apply();

        if (gblnToggleTrans) {
            gblnToggleTrans = 0;
            document.images[strImageID].src = eval(strNewImageSrc+".src");
        } else {
            gblnToggleTrans = 1;
            document.images[strImageID].src = eval(strNewImageSrc+".src");
        }
        document.images[strImageID].filters[0].Play();
    }
}

// ####################################
// ##
// ##  Form Handling
// ##
// ####################################

// ====================
// Function:    OtherOptionSwitch
//
// Input:
//              -   strOtherOptionTagId
//              -   objTag
//
// Assumptions:
//              -   cm3 version 5.5.3 or up is used
//
// History:
//              -   20090827 GR Created
//              -   20091020 RW Completely re-wrote from SelectOtherOption ;)
// ====================

// function run when "other" radio or dropdown options are selected or "other" checkbox clicked (either checked or unchecked)
function OtherOptionSwitch(strOtherOptionTagId, objTag) {
    objOtherOptionTag = document.getElementById(strOtherOptionTagId);
    strOtherOptionClassName = objOtherOptionTag.className;
    strSelectControlTagId = strOtherOptionTagId + "Enable";
    objSelectControlTag = document.getElementById(strSelectControlTagId);
    if (objSelectControlTag) {
        if (objSelectControlTag.tagName == "OPTION") { // Dropdown (or multiselect, but only dropdowns are available in surveys for now)
            if (objTag[objTag.selectedIndex].id == objSelectControlTag.id) { // Relies on the option being a child of objTag
                OtherOptionShowText(strOtherOptionTagId);
            } else {
                OtherOptionDeselect(strOtherOptionTagId, objOtherOptionTag);
            }
        } else { // Radio or checkbox
            if (objSelectControlTag.checked) {
                OtherOptionShowText(strOtherOptionTagId);
            } else {
                OtherOptionDeselect(strOtherOptionTagId, objOtherOptionTag);
            }
        }
    }
}

// function run when any "standard" radio or dropdown options are selected
function OtherOptionDeselect(strOtherOptionTagId, objTag) {
    objOtherOptionTag = document.getElementById(strOtherOptionTagId);
    strOtherOptionClassName = objOtherOptionTag.className;
    strSelectControlTagId = strOtherOptionTagId + "Enable";
    objSelectControlTag = document.getElementById(strSelectControlTagId);

    // Hide the text box if this is a "SelectTextHidden" option
    // Note: There could be multiple classes on the object
    if (strOtherOptionClassName.indexOf("otherOptionSelectTextHidden") != -1) {
        if (objSelectControlTag.tagName == "OPTION") {
            //alert("otherOptionSelectTextHidden");
        } 
        OtherOptionHideText(strOtherOptionTagId);
    } else if (strOtherOptionClassName.indexOf("otherOptionSelectTextVisible") != -1) {
        if (objSelectControlTag.tagName == "OPTION") {
            //alert("otherOptionSelectTextVisible");
        }
        OtherOptionBlankText(objOtherOptionTag);
    }
}

// Function called after div with "other" options loaded.
function OtherOptionLoad(strOtherOptionTagId) {
    strFieldTagId = strOtherOptionTagId.substring(0, strOtherOptionTagId.indexOf("Other"));
    OtherOptionSwitch(strOtherOptionTagId, document.getElementById(strFieldTagId));

    //objOtherOptionTag = document.getElementById(strOtherOptionTagId);
    //strOtherOptionClassName = objOtherOptionTag.className;
    //strSelectControlTagId = strOtherOptionTagId + "Enable";
    //objSelectControlTag = document.getElementById(strSelectControlTagId);
    
    // Hide the text box if this is a "SelectTextHidden" option
    //if (strOtherOptionClassName == "otherOptionSelectTextHidden") {
    //    if (objSelectControlTag && objSelectControlTag.tagName == "INPUT") { // Radio or checkbox
    //        if (objSelectControlTag.checked) {
    //            OtherOptionShowText(strOtherOptionTagId);
    //        } else {
    //            OtherOptionHideText(strOtherOptionTagId);
    //        }
    //    } else if (objSelectControlTag && objSelectControlTag.tagName == "SELECT") { // Dropdown
    //    }
    //}
}

function OtherOptionHideText(strOtherOptionTagId) {
    objOtherOptionTag = document.getElementById(strOtherOptionTagId);
    strOtherOptionClassName = objOtherOptionTag.className;
    arrOptionTextContainers = getElementsByClassName("otherOptionText", "div", objOtherOptionTag);
    for (i = 0; i < arrOptionTextContainers.length; i++) {
        arrOptionTextContainers[i].className = "otherOptionText otherOptionHideText";
        
        // If the option is hidden, text fields within it shouldn't have a value
        OtherOptionBlankText(arrOptionTextContainers[i]);
    }
}

function OtherOptionShowText(strOtherOptionTagId) {
    objOtherOptionTag = document.getElementById(strOtherOptionTagId);
    strOtherOptionClassName = objOtherOptionTag.className;
    arrOptionTextContainers = getElementsByClassName("otherOptionText otherOptionHideText", "div", objOtherOptionTag);
    for (i = 0; i < arrOptionTextContainers.length; i++) {
        arrOptionTextContainers[i].className = "otherOptionText";
    }
}

function OtherOptionBlankText(objOtherOptionTextContainer) {
    // If the option is hidden, text fields within it (there might be several, even if we only expect one by design) shouldn't have a value
    arrOptionTextControls = objOtherOptionTextContainer.getElementsByTagName("INPUT");
    if (arrOptionTextControls) {
        for (j = 0; j < arrOptionTextControls.length; j++) {
			if (arrOptionTextControls[j].type == "text") {
				//alert("id=" + arrOptionTextControls[j].id);
				arrOptionTextControls[j].value = "";
			}
        }
    }
}

function SetDefaultFieldValue(strForm,strElement,strValue,blnFocus) {
    var strInitialValue = document.forms[strForm].elements[strElement].value;
    if (blnFocus) {
        if (strInitialValue == strValue) {
            document.forms[strForm].elements[strElement].value = "";
        }
    } else {
        if (strInitialValue == "") {
            document.forms[strForm].elements[strElement].value = strValue;
        }
    }
}

// ############################################################################
// ##
// ##  SUBSCRIBE MODULE FUNCTIONS
// ##
// ############################################################################

function TextHTMLHelp() {
    var strHelpMessage = ""
    strHelpMessage += "HTML\n\
Select HTML if your email package supports pictures and rich text layouts.\n\
\n\
Text\n\
Select text if you are using an older email package, or you prefer plain text emails.\n"

    alert(strHelpMessage);

}

// ####################################
// ##
// ##  DOM/div Manipulation
// ##
// ####################################

// ====================
// Function:    GetObj
//
// Purpose:     Returns string for access to passed in object style attributes
//
// Input:       ID of object
//
// Output:      Returns string for access to passed in object style attributes
//
// Assumptions: -
//
// History:     SC 2006-05-15
function GetObj(name) {
    if (document.getElementById) {
        this.obj = document.getElementById(name);
        this.style = document.getElementById(name).style;
    } else if (document.all) {
        this.obj = document.all[name];
        this.style = document.all[name].style;
    } else if (document.layers) {
        this.obj = document.layers[name];
        this.style = document.layers[name];
    }
}


// ====================
// Function:    GetObjectHeight
//
// Purpose:     Returns the height of any passed in block level object
//
// Input:       ID of item
//
// Output:      Returns the height of any passed in block level object
//
// Assumptions: -
//
// History:     SC 2006-05-15
// ====================
function GetObjectHeight(objectRef) {
    var intHeight = -1;

    if (document.getElementById) {
        if (document.getElementById(objectRef)) {
            intHeight = eval(document.getElementById(objectRef).offsetHeight);
        }
    } else if (document.all) {
        if (document.all[objectRef]) {
            intHeight = document.all[objectRef].scrollHeight;
        }
    } else if (document.layers) {
        if (document[objectRef]) {
            intHeight = document[objectRef].clip.bottom;
        }
    }

    return intHeight;
}

// ====================
// Function:    GetObjectWidth
//
// Purpose:     Returns the width of any passed in block level object
//
// Input:       ID of item
//
// Output:      Returns the width of any passed in block level object
//
// Assumptions: -
//
// History:     RW 2008-05 Created
// ====================
function GetObjectWidth(objectRef) {
    var intHeight = -1;

    if (document.getElementById) {
        if (document.getElementById(objectRef)) {
            intHeight = eval(document.getElementById(objectRef).offsetWidth);
        }
    } else if (document.all) {
        if (document.all[objectRef]) {
            intHeight = document.all[objectRef].scrollWidth;
        }
    } else if (document.layers) {
        if (document[objectRef]) {
            intHeight = document[objectRef].clip.right;
        }
    }

    return intHeight;
}

// ====================
// Function:    SetUniformHeight
//
// Purpose:     Sets a number of page objects to a uniform height, being the
//              maximum height of any of the given objects.
//
// Input:       strPageObjects - Comma separated list of object IDs that should
//              be set to a uniform height.
//
// Output:      Updates the height of the given objects.
//
// Assumptions: GetObjectHeight()
//
// History:     20060823 RW Created
// ====================
function SetUniformHeight(strPageObjects) {
    intMaxHeight = 0;

    if (strPageObjects) {
        arrPageObjects = strPageObjects.split(",");
    }

    if (arrPageObjects) {
        // Find the height of the tallest object.
        for (i = 0; i < arrPageObjects.length; i++) {
            intThisHeight = GetObjectHeight(arrPageObjects[i]);
            if (intThisHeight > intMaxHeight) {
                intMaxHeight = intThisHeight;
            }
        }

        // Set all the objects to the same (maximum) height if a height larger
        // than 0 was found.
        if (intMaxHeight > 0 ) {
            for (i = 0; i < arrPageObjects.length; i++) {
                //if (gblnIE)  {
                //    strMaxHeight = intMaxHeight;
                //} else {
                    strMaxHeight = intMaxHeight + 'px';
                //}
                if(document.getElementById(arrPageObjects[i])) {
                    document.getElementById(arrPageObjects[i]).style.height = strMaxHeight;
                }
            }
        }
    }
}

// ====================
// Function:    FixActivexClick
//
// Purpose:     Stops the active content "click to activate" annoyance for IE7.
//
// Input:       -
//
// Output:      Removes the "click to activate" from <object> tags in IE.
//
// Assumptions: -
//
// History:     -
// ====================
function FixActivexClick() {
    objectTags = document.getElementsByTagName("object");
    for (var i = 0; i < objectTags.length; i++) {
            objectTags[i].outerHTML = objectTags[i].outerHTML;
    }
}

// ====================
// Function:    GetCSSProperty
//
// Purpose:     Allows retrieval of a CSS property from a separately specified style sheet.
//
// Input:       objElement - The element for which you want to retrive a CSS property
//              strCSSProperty - The JS/CSS style name, e.g. fontSize
//              strCSSPropertyLabel - The style label as though you wrote it in a stylesheet, e.g. font-size
//
// Output:      Returns the CSS property value. Note: Raw value in IE, computed value in NS!
//
// Assumptions: -
//
// History:     20080514 RW Created
// ====================
function GetCSSProperty(objElement, strCSSProperty, strCSSPropertyNS) {
    if (objElement.currentStyle) { //if IE5+
        return objElement.currentStyle[strCSSProperty];
    } else if (window.getComputedStyle) { //if NS6+
        var objElementStyle = window.getComputedStyle(objElement, "");
        return objElementStyle.getPropertyValue(strCSSPropertyNS);
    }
}

// ====================
// Function:    addEvent
//
// Purpose:     Attach an event dynamically to any object.
//
// Input:       obj - the object to attach event to
//              evType - name of the event - DONT ADD "on", pass only "mouseover", etc
//              fn - function to call
//
// Output:      true | false
//
// Assumptions: -
//
// History:     20090113 RW Included from Seth Banks http://www.subimage.com/dhtml/
// ====================
function addEvent(obj, evType, fn) {
    //alert("addEvent here");
    if (obj.addEventListener) {
        obj.addEventListener(evType, fn, false);
        return true;
    } else if (obj.attachEvent){
        var r = obj.attachEvent("on"+evType, fn);
        return r;
    } else {
        return false;
    }
}

// ====================
// Function:    removeEvent
//
// Purpose:     Remove an event dynamically from any object.
//
// Input:       obj - the object to attach event to
//              evType - name of the event - DONT ADD "on", pass only "mouseover", etc
//              fn - function to call
//              useCapture - ?
//
// Output:      true | false/error alert
//
// Assumptions: -
//
// History:     20090113 RW Included from Seth Banks http://www.subimage.com/dhtml/
// ====================
function removeEvent(obj, evType, fn, useCapture) {
    if (obj.removeEventListener){
        obj.removeEventListener(evType, fn, useCapture);
        return true;
    } else if (obj.detachEvent){
        var r = obj.detachEvent("on"+evType, fn);
        return r;
    } else {
        alert("Handler could not be removed");
    }
}

// ====================
// Function:    FloatingDiv
//
// Purpose:     Make a div always visible on the page with a smooth floating effect.
//
// Input:       id - ID of the div 
//              sx - x co-ordinate of where to float the div
//              sy - y co-ordinate of where to float the div
//
// Output:      -
//
// Assumptions: -
//
// History:     20090626 RW Included from http://www.javascript-fx.com/submitscripts/float/float.html
// ====================
function FloatDiv(id, sx, sy) {
    var ns = (navigator.appName.indexOf("Netscape") != -1);
    var d = document;
    var el=d.getElementById?d.getElementById(id):d.all?d.all[id]:d.layers[id];
    var px = document.layers ? "" : "px";
    window[id + "_obj"] = el;
    if(d.layers)el.style=el;
    el.cx = el.sx = sx;el.cy = el.sy = sy;
    el.sP=function(x,y){this.style.left=x+px;this.style.top=y+px;};

    el.floatIt=function() {
        var pX, pY;
        pX = (this.sx >= 0) ? 0 : ns ? innerWidth : 
        document.documentElement && document.documentElement.clientWidth ? 
        document.documentElement.clientWidth : document.body.clientWidth;
        pY = ns ? pageYOffset : document.documentElement && document.documentElement.scrollTop ? 
        document.documentElement.scrollTop : document.body.scrollTop;
        if(this.sy<0) 
        pY += ns ? innerHeight : document.documentElement && document.documentElement.clientHeight ? 
        document.documentElement.clientHeight : document.body.clientHeight;
        this.cx += (pX + this.sx - this.cx)/8;this.cy += (pY + this.sy - this.cy)/8;
        this.sP(this.cx, this.cy);
        setTimeout(this.id + "_obj.floatIt()", 40);
    }
    return el;
}

function getWindowDimension(strPlane) {
  var dimension = 0;
  
  switch (strPlane.toLowerCase()) {
    case "width" :
          if( typeof( window.innerWidth ) == 'number' ) {
            //Non-IE
            dimension = window.innerWidth;
          } else if( document.documentElement && ( document.documentElement.clientWidth ) ) {
            //IE 6+ in 'standards compliant mode'
            dimension = document.documentElement.clientWidth;
          } else if( document.body && ( document.body.clientWidth ) ) {
            //IE 4 compatible
            dimension = document.body.clientWidth;
          }
        break;
    case "height" :
          if( typeof( window.innerHeight ) == 'number' ) {
            //Non-IE
            dimension = window.innerHeight;
          } else if( document.documentElement && ( document.documentElement.clientHeight ) ) {
            //IE 6+ in 'standards compliant mode'
            dimension = document.documentElement.clientHeight;
          } else if( document.body && ( document.body.clientHeight ) ) {
            //IE 4 compatible
            dimension = document.body.clientHeight;
          }
        break;
  }
  return dimension;
}

/**********************************************************
Function:
    getElementsByClassName

Purpose:
    Provides compatibility for getElementsByClassName (a native function in
    many browsers) for browsers that don't support it (IE).

Input:
    className -  Mandatory. One or several class names, separated by space. 
        Multiple class names demands that each match have all of the classes 
        specified.
    tag - Optional. Specifies the tag name of the elements to match.
    elm - Optional. Reference to a DOM element to look amongst its children for
        matches. Recommended for better performance in larger documents. 
            
Output:
    An array of elements

Assumptions:
    -

Examples:
    To get all elements in the document with a “info-links” class.
    getElementsByClassName("info-links");
    
    To get all div elements within the element named “container”, with a “col” class.
    getElementsByClassName("col", "div", document.getElementById("container")); 
    
    To get all elements within in the document with a “click-me” and a “sure-thang” class.
    getElementsByClassName("click-me sure-thang"); 

History:
    20091022 RW Included from http://www.robertnyman.com

Notes:
    Developed by Robert Nyman, http://www.robertnyman.com
    Code/licensing: http://code.google.com/p/getelementsbyclassname/
    DDSN Note: MIT Licence
**********************************************************/
var getElementsByClassName = function(className, tag, elm) {
    if (document.getElementsByClassName) {
        getElementsByClassName = function(className, tag, elm) {
            elm = elm || document;
            var elements = elm.getElementsByClassName(className),
				nodeName = (tag) ? new RegExp("\\b" + tag + "\\b", "i") : null,
				returnElements = [],
				current;
            for (var i = 0, il = elements.length; i < il; i += 1) {
                current = elements[i];
                if (!nodeName || nodeName.test(current.nodeName)) {
                    returnElements.push(current);
                }
            }
            return returnElements;
        };
    }
    else if (document.evaluate) {
        getElementsByClassName = function(className, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
            var classes = className.split(" "),
				classesToCheck = "",
				xhtmlNamespace = "http://www.w3.org/1999/xhtml",
				namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace) ? xhtmlNamespace : null,
				returnElements = [],
				elements,
				node;
            for (var j = 0, jl = classes.length; j < jl; j += 1) {
                classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
            }
            try {
                elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
            }
            catch (e) {
                elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
            }
            while ((node = elements.iterateNext())) {
                returnElements.push(node);
            }
            return returnElements;
        };
    }
    else {
        getElementsByClassName = function(className, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
            var classes = className.split(" "),
				classesToCheck = [],
				elements = (tag === "*" && elm.all) ? elm.all : elm.getElementsByTagName(tag),
				current,
				returnElements = [],
				match;
            for (var k = 0, kl = classes.length; k < kl; k += 1) {
                classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
            }
            for (var l = 0, ll = elements.length; l < ll; l += 1) {
                current = elements[l];
                match = false;
                for (var m = 0, ml = classesToCheck.length; m < ml; m += 1) {
                    match = classesToCheck[m].test(current.className);
                    if (!match) {
                        break;
                    }
                }
                if (match) {
                    returnElements.push(current);
                }
            }
            return returnElements;
        };
    }
    return getElementsByClassName(className, tag, elm);
};

// ####################################
// ##
// ##  Printing
// ##
// ####################################

// ====================
// Function:    LoadVBPrinter
//
// Purpose:     Load Visual Basic printing commands for VB enabled browsers.
//
// Input:       -
//
// Output:      Loads (writes out) visual basic printing functions.
//
// Assumptions: Javascript Globals: gblnIE, gblnCanPrint, gblnMac
//
// History:     DDSN created back in the Distant Past
// ====================
function LoadVBPrinter() {
    if (gblnIE && !gblnCanPrint && !gblnMac) with (document) {
        writeln('<OBJECT ID="WB" WIDTH="0" HEIGHT="0" CLASSID="clsid:8856F961-340A-11D0-A96B-00C04FD705A2"></OBJECT>');
        writeln('<' + 'SCRIPT LANGUAGE="VBScript">');
        writeln('Sub window_onunload');
        writeln('    On Error Resume Next');
        writeln('    Set WB = nothing');
        writeln('End Sub');
        writeln('Sub vbPrintPage');
        writeln('    OLECMDID_PRINT = 6');
        writeln('    OLECMDEXECOPT_DONTPROMPTUSER = 2');
        writeln('    OLECMDEXECOPT_PROMPTUSER = 1');
        writeln('    On Error Resume Next');
        writeln('    WB.ExecWB OLECMDID_PRINT, OLECMDEXECOPT_DONTPROMPTUSER');
        writeln('End Sub');
        writeln('<' + '/SCRIPT>');
    }
}

// ====================
// Function:    PrintPage
//
// Purpose:     Opens the print dialog window or shows a fallback message for
//              unsupported browsers
//
// Input:       -
//
// Output:      Opens the print dialog window or shows a fallback message for
//              unsupported browsers.
//
// Assumptions: Javascript Globals: gblnCanPrint, gblnIE, gblnMac
//
// History:     DDSN created back in the Distant Past
// ====================
function PrintPage() {
    if (gblnCanPrint) {
        window.print();
    } else if (gblnIE && !gblnMac) {
        vbPrintPage();
    } else {
        alert("Your web browser does not appear to support the automatic\nPrint function. To print this page, please select the \"Print\"\noption from the \"File\" menu of your web browser.");
    }
}

// Load Visual Basic printing commands for VB enabled browsers
//LoadVBPrinter()

// ####################################
// ##
// ##  Accessibility
// ##
// ####################################

// ====================
// Function:    TextSize
//
// Purpose:     Allows the user to alter the text size in the site style sheet.
//
// Input:       '-' to decrease the text size.
//              '+' to increase the text size.
//
// Output:      Alters the base text size on the <body> tag.
//
// Assumptions: -
//
// History:     20080515 RW Created
// ====================
function TextSize(strIncrement) {
   
    //intTextSize = document.getElementsByTagName("body")[0].style.fontSize;
    //intTextSize = document.body.style.fontSize;
    strTextSize = GetCSSProperty(document.body,"fontSize","font-size");
    
    if (strTextSize.indexOf("em") > 0) {
        strTextSizeUnit = "em";
        intTextSize = strTextSize.substring(0,strTextSize.length-2);
    } else if (strTextSize.indexOf("px") > 0) {
        strTextSizeUnit = "px";
        intTextSize = strTextSize.substring(0,strTextSize.length-2);
    } else if (strTextSize.indexOf("%") > 0) {
        strTextSizeUnit = "%";
        intTextSize = strTextSize.substring(0,strTextSize.length-1);
    } else {
        strTextSizeUnit = "%";
        intTextSize = "100";
    }

    if (strIncrement == '-') {
        intTextSize = intTextSize / 1.2;
    } else if (strIncrement == '+') {
        intTextSize = intTextSize * 1.2;
    }
    
    document.body.style.fontSize = intTextSize + strTextSizeUnit;
}

// ####################################
// Toggle images on and off (including CSS background images)
// ####################################

var gstrImagesStatus = "";
var garrCSSBackgroundImages = new Array();

// ====================
// Function:    ToggleImages
//
// Purpose:     Switches images on and off. It's like using the browser's 
//              disable image function, but quicker and doesn't require a
//              page load.
//
// Input:       -
//
// Output:      Switches images off if they are on, or back on if they have
//              been switched off (including CSS background images if the 
//              RemoveCSSBackgroundImages and ResetCSSBackgroundImages 
//              functions exist).
//
// Assumptions: -
//
// History:     20080911 RW Created
//
// Notes:       Could be improved with a cookie that remembers the setting from
//              page to page.
// ====================
function ToggleImages() {

    //arrImageTags = document.images; // Same effect as document.getElementsByTagName('img')
    arrImageTags = document.getElementsByTagName('img');

    if (gstrImagesStatus == "off") {
        //alert('Switching images on.');
        for (i=0; i < arrImageTags.length; i++) {
            arrImageTags[i].parentNode.parentNode.className = "DisplayImages";
        }
        if (ResetCSSBackgroundImages) {
            ResetCSSBackgroundImages();
        }
        gstrImagesStatus = "on";
    } else {
        //alert('Switching images off.');
        for (i=0; i < arrImageTags.length; i++) {
                        
            if (gstrImagesStatus == "") { // This function has never run.

                strAltText = arrImageTags[i].alt;
                if (!strAltText) {
                    strAltText = 'Unknown image.';
                }

                strImageHTML = arrImageTags[i].parentNode.innerHTML;
                strAltTextHTML = "<span class=\"AltText\">" + strAltText + "</span>";
                
                oNewElement = document.createDocumentFragment();
                
                oImageContainer = document.createElement("span");
                oImageContainer.className = "DisplayAltText";
                oImageContainer.innerHTML = strImageHTML + strAltTextHTML;
                
                oNewElement.appendChild(oImageContainer);
                
                arrImageTags[i].parentNode.replaceChild(oNewElement,arrImageTags[i]);
                
            } else {
                arrImageTags[i].parentNode.parentNode.className = "DisplayAltText";
            }
            
        }
        if (RemoveCSSBackgroundImages) {
            RemoveCSSBackgroundImages();
        }
        gstrImagesStatus = "off";
    }

}

// ====================
// Function:    RemoveCSSBackgroundImages
//
// Purpose:     Sets the background-image property to 'none' for any elements
//              in the page that have it set. Also populates an array with the
//              background image URLs (if the array exists) so that they can
//              be restored if needed.
//
// Input:       -
//
// Output:      Switches all CSS background images off.
//
// Assumptions: Global: garrCSSBackgroundImages (array)
//
// History:     20080911 RW Created
// ====================
function RemoveCSSBackgroundImages() {
    arrAllElements = document.getElementsByTagName('*');
    for (var i = 0; i < arrAllElements.length; i++) {
        if (garrCSSBackgroundImages) {
            garrCSSBackgroundImages[i] = arrAllElements[i].style.backgroundImage;
        }
        arrAllElements[i].style.backgroundImage = 'none';
    }
}

// ====================
// Function:    ResetCSSBackgroundImages
//
// Purpose:     Reloads CSS background images from a global array.
//
// Input:       -
//
// Output:      Switches CSS background images back on if they were switched
//              off.
//
// Assumptions: Global: garrCSSBackgroundImages (array containing background
//              images that were switched off). Normally this is created by
//              RemoveCSSBackgroundImages()
//
// History:     20080911 RW Created
// ====================
function ResetCSSBackgroundImages() {
    // This function can't run without garrCSSBackgroundImages, and we assume that if 
    // garrCSSBackgroundImages has something in it then RemoveCSSBackgroundImages() was run.
    if (garrCSSBackgroundImages && garrCSSBackgroundImages.length > 0) { 
        arrAllElements = document.getElementsByTagName('*');
        for (var i = 0; i < arrAllElements.length; i++) {
            arrAllElements[i].style.backgroundImage = garrCSSBackgroundImages[i];
        }
    }
}

// ####################################
// ##
// ##  ASP.Net Enhancements & Hacks
// ##
// ####################################

// The following functions are loaded by ASP.Net in WebResource.axd when a
// server side form is used, but WebResource.axd is not loaded until the 
// last element of the page! So if an event fires on the page (like a 
// keypress on a form element) that requires one of these functions, a 
// Javascript error will be generated. Quite silly! Defining these functions
// in our global file (loaded in the header) as blank functions at least
// means that the same behaviour will happen for these events as happens when
// Javascript is turned off completely, rather than an ugly error.
function WebForm_FireDefaultButton(event, target) {
}

function Body_OnLoad() {
    if (window.on_load&&(typeof window.on_load=="function")) window.on_load();
}

// ####################################
// ##
// ##  Fun Stuff / Easter Eggs
// ##
// ####################################

// No easter eggs currently present. :-)
