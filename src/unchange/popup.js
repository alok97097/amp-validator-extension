var port = chrome.extension.connect({
    name: "Background Communication"
});

document.addEventListener('DOMContentLoaded', function () {
    initialize();
});

function initialize() {
    document.getElementById("ampValidate").addEventListener('click', initiatMsg);
}

var perviousNode = null;
function clickEvent(evt){ 
    var target = event.target;
    if(target.className.indexOf("collection-item") == -1){
        target = target.parentElement;
        if(target.className.indexOf("collection-item") == -1){
            target = target.parentElement;
            if(target.className.indexOf("collection-item") == -1){
                return;
            }
        }
    }
    if(perviousNode != target){
        hideAllSub();
        hideAllParent();
        perviousNode = target;
        target.style.display = "block";
        target.nextElementSibling.style.display = "block";
        target.childNodes[1].childNodes[1].style.display = "inline-block";
        target.childNodes[1].childNodes[1].style.transform = "rotate(90deg)";
    }
    else{
        if( target.nextElementSibling.style.display == "block"){
            target.nextElementSibling.style.display = "none";
            showAllParent();
            target.childNodes[1].childNodes[1].style.transform = "rotate(0deg)";
            
        }
        else{
            target.nextElementSibling.style.display = "block";
            hideAllParent();
            target.style.display = "block";
            target.childNodes[1].childNodes[1].style.display = "inline-block";
            target.childNodes[1].childNodes[1].style.transform = "rotate(90deg)";
        }
    }
}

function hideAllSub(){
    var sub = document.getElementsByClassName("errorMsg");
    var parentNode = document.getElementsByClassName("collection-item");
    for(var i=0;i<sub.length;i++){
        sub[i].style.display = "none";
        parentNode[i].childNodes[1].childNodes[1].style.transform = "rotate(0deg)";
    }
}

function showAllParent(){
    var parentNode = document.getElementsByClassName("collection-item");
    for(var i=0;i<parentNode.length;i++){
        parentNode[i].style.display = "block";
    }
}

function hideAllParent(){
    var parentNode = document.getElementsByClassName("collection-item");
    for(var i=0;i<parentNode.length;i++){
        parentNode[i].style.display = "none";
    } 
}

function displayError(errorMsg){
    if(errorMsg.code == 'MANDATORY_ATTR_MISSING'){
        return 'The mandatory attribute \''+errorMsg.params[0]+ '\' is missing in tag \''+errorMsg.params[1]+ '\'.';
    }
    else if(errorMsg.code == 'MANDATORY_PROPERTY_MISSING_FROM_ATTR_VALUE'){
        return 'The property \'' +errorMsg.params[0]+ '\' is missing from attribute \'' +errorMsg.params[1]+ '\' in tag \'' +errorMsg.params[2]+'\'.';
    }
    else if(errorMsg.code == 'MANDATORY_CDATA_MISSING_OR_INCORRECT'){
        return 'The mandatory text (CDATA) inside tag \'' +errorMsg.params[0]+ '\' is missing or incorrect.';
    }
    else if(errorMsg.code == 'MANDATORY_TAG_ANCESTOR_WITH_HINT'){
        return 'The tag \'' +errorMsg.params[0]+ '\' may only appear as a descendant of tag \''+errorMsg.params[1]+'\'. Did you mean \''+errorMsg.params[2]+'\'?';
    }
    else if(errorMsg.code == 'MANDATORY_TAG_ANCESTOR'){
        return 'The tag \'' +errorMsg.params[0]+ '\' may only appear as a descendant of tag \''+errorMsg.params[1]+'\'.';
    }
    else if(errorMsg.code == 'MANDATORY_TAG_MISSING'){
        return 'The mandatory tag \'' +errorMsg.params[0]+ '\' is missing or incorrect.';
    }
    else if(errorMsg.code == 'INVALID_ATTR_VALUE'){
        return 'The attribute \'' +errorMsg.params[0]+ '\' in tag \'' +errorMsg.params[1]+ '\' is set to the invalid value \'' +errorMsg.params[2]+'\'.';
    }
    else if(errorMsg.code == 'INVALID_URL_PROTOCOL'){
        return 'Invalid URL protocol \'' +errorMsg.params[0]+ '\' for attribute \'' +errorMsg.params[1]+ '\' in tag \'' +errorMsg.params[2]+'\'.';
    }
    else if(errorMsg.code == 'DISALLOWED_SCRIPT_TAG'){
        return 'The tag \'script\' is disallowed except in specific forms.';
    }
    else if(errorMsg.code == 'DISALLOWED_STYLE_ATTR'){
        return 'The attribute \'style\' may not appear';
    }
    else if(errorMsg.code == 'DISALLOWED_ATTR'){
        return 'The attribute \'' +errorMsg.params[0]+ '\' may not appear in tag \''+errorMsg.params[1]+'\'.';
    }
    else if(errorMsg.code == 'DISALLOWED_TAG'){
        return 'The tag \'' +errorMsg.params[0]+ '\' is disallowed.';
    }
    else if(errorMsg.code == 'DEPRECATED_TAG'){
        return 'The tag \'' +errorMsg.params[0]+ '\' is deprecated - use \'' +errorMsg.params[1]+ '\' instead.';
    }
    else if(errorMsg.code == 'WRONG_PARENT_TAG'){
        return 'The parent tag of tag \'' +errorMsg.params[0]+ '\' is \''+errorMsg.params[1]+ '\', but it can only be \''  +errorMsg.params[2]+'\'.';
    }
    else if(errorMsg.code == 'GENERAL_DISALLOWED_TAG'){
        return 'The tag ' +errorMsg.params[0]+ '\' is disallowed except in specific forms.';
    }
    else if(errorMsg.code == 'TAG_REQUIRED_BY_MISSING'){
        return 'The \'' +errorMsg.params[0]+ '\' tag is missing or incorrect, but required by \''+errorMsg.params[1]+'\'.';
    }
    else if(errorMsg.code == 'CDATA_VIOLATES_BLACKLIST'){
        return 'The text (CDATA) inside tag \'' +errorMsg.params[0]+ '\' matches \''+errorMsg.params[1]+'\', which is disallowed.';
    }
    else if(errorMsg.code == 'DISALLOWED_PROPERTY_IN_ATTR_VALUE'){
        return 'The property \'' +errorMsg.params[0]+ '\' in attribute \''+errorMsg.params[1]+'\' in tag \''+errorMsg.params[2]+'\' is disallowed.';
    }
    else if(errorMsg.code == 'INVALID_PROPERTY_VALUE_IN_ATTR_VALUE'){
        return 'The property \'' +errorMsg.params[0]+ '\' in attribute \''+errorMsg.params[1]+'\' in tag \''+errorMsg.params[2]+'\' is set to \''+errorMsg.params[3]+'\', which is invalid.';
    }
    else if(errorMsg.code == 'MISSING_URL'){
        return 'Missing URL for attribute \'' +errorMsg.params[0]+ '\' in tag \''+errorMsg.params[1]+'\'.';
    }
    else if(errorMsg.code == 'MUTUALLY_EXCLUSIVE_ATTRS'){
        return 'Mutually exclusive attributes encountered in tag \'' +errorMsg.params[0]+ '\' - pick one of  \''+errorMsg.params[1]+'\'.';
    }
    else if(errorMsg.code == 'MANDATORY_ONEOF_ATTR_MISSING'){
        return 'The tag \'' +errorMsg.params[0]+ '\' is missing a mandatory attribute - pick one of \''+errorMsg.params[1]+'\'.';
    }
    else if(errorMsg.code == 'DISALLOWED_TAG_ANCESTOR'){
        return 'The tag \'' +errorMsg.params[0]+ '\' may not appear as a descendant of tag \''+errorMsg.params[1]+'\'.';
    }
    else if(errorMsg.code == 'DUPLICATE_UNIQUE_TAG'){
        return 'The tag \'' +errorMsg.params[0]+ '\' appears more than once in the document.';
    }
    else if(errorMsg.code == 'STYLESHEET_TOO_LONG'){
        return 'The author stylesheet specified in tag \'style\' is too long - we saw ' +errorMsg.params[0]+ ' bytes whereas the limit is '+errorMsg.params[1]+' bytes.';
    }
    else if(errorMsg.code == 'CSS_SYNTAX'){
        return 'CSS syntax error in tag \'' +errorMsg.params[0]+ '\' - '+errorMsg.params[1]+'.';
    }
    else if(errorMsg.code == 'CSS_SYNTAX_INVALID_AT_RULE'){
        return 'CSS syntax error in tag \'' +errorMsg.params[0]+ '\' - saw invalid at rule \''+errorMsg.params[1]+'\'.';
    }
    else if(errorMsg.code == 'IMPLIED_LAYOUT_INVALID'){
        return 'The implied layout \'' +errorMsg.params[0]+ '\' is not supported by tag '+errorMsg.params[1]+'.';
    }
    else if(errorMsg.code == 'ATTR_DISALLOWED_BY_IMPLIED_LAYOUT'){
        return 'The attribute \'' +errorMsg.params[0]+ '\' in tag \''+errorMsg.params[1]+'\' is disallowed by implied layout \''+errorMsg.params[2]+'\'.';
    }
    else if(errorMsg.code == 'SPECIFIED_LAYOUT_INVALID'){
        return 'The specified layout \'' +errorMsg.params[0]+ '\' is not supported by tag \''+errorMsg.params[1]+'\'.';
    }
    else if(errorMsg.code == 'ATTR_DISALLOWED_BY_SPECIFIED_LAYOUT'){
        return 'The attribute \'' +errorMsg.params[0]+ '\' in tag \''+errorMsg.params[1]+'\' is disallowed by implied layout \''+errorMsg.params[2]+'\'.';
    }
    else if(errorMsg.code == 'ATTR_VALUE_REQUIRED_BY_LAYOUT'){
        return 'Invalid value \'' +errorMsg.params[0]+ '\' for attribute \''+errorMsg.params[1]+'\' in tag \''+errorMsg.params[2]+'\' - for layout \''+errorMsg.params[3]+'\', set the attribute \''+errorMsg.params[1]+'\' to value \''+errorMsg.params[4]+'\'.';
    }
    else if(errorMsg.code == 'INCONSISTENT_UNITS_FOR_WIDTH_AND_HEIGHT'){
        return 'Inconsistent units for width and height in tag \'' +errorMsg.params[0]+ '\'  - width is specified in \''+errorMsg.params[1]+'\' whereas height is specified in \''+errorMsg.params[2]+'\'.';
    }
    else if(errorMsg.code == 'TEMPLATE_IN_ATTR_NAME'){
        return 'Mustache template syntax in attribute name \'' +errorMsg.params[0]+ '\' in tag \''+errorMsg.params[1]+'\'.';
    }
    else if(errorMsg.code == 'UNESCAPED_TEMPLATE_IN_ATTR_VALUE'){
        return 'The attribute \'' +errorMsg.params[0]+ '\' in tag \''+errorMsg.params[1]+'\' is set to \''+errorMsg.params[2]+'\', which contains unescaped Mustache template syntax.';
    }
    else if(errorMsg.code == 'TEMPLATE_PARTIAL_IN_ATTR_VALUE'){
        return 'The attribute \'' +errorMsg.params[0]+ '\' in tag \''+errorMsg.params[1]+'\' is set to \''+errorMsg.params[2]+'\', which contains a Mustache template partial.';
    }
    else if(errorMsg.code == 'DEPRECATED_TAG'){
        return 'No error message defined as yet (no deprecated tags).';
    }
    else{
        return errorMsg.params.toString();
    }
}

function openPanal(currentPageUrl){
    window.open("https://dev1.notifyvisitors.com/product/amp-validator?validate="+currentPageUrl);
}

initiatMsg = function (){
    port.postMessage("validatePage");
    port.onMessage.addListener(function (msg) {
        console.log(msg);
        console.log(msg.ampValidate.status);
        console.log(msg.ampValidate.errors);
        var errorArr = msg.ampValidate.errors;
        if(msg.ampValidate.status == "PASS"){
            document.getElementById("checkAMP").style.display = "block";
            document.getElementById("ampValidate").style.backgroundColor = "#28b473";
            document.getElementById("checkAMP").innerText = 'valid AMP Page...';    
        }else if(msg.ampValidate.status == "FAIL"){
            // document.getElementById("checkAMP").innerText = msg;
            document.getElementById("ampValidate").style.backgroundColor = "#d5281c";
            document.getElementById("errorList").style.display = "block";
            var collection = document.getElementById("errorList");
            var len = errorArr.length < 6 ? errorArr.length : 5;
           
            if(errorArr.length > 0){
                for(var i=0; i<errorArr.length; i++){
                    var achnorTag = document.createElement('div');
                    achnorTag.setAttribute("class", "collection-item");
                    
                    var paraTag = document.createElement('p');
                    paraTag.setAttribute("class", "head_text");

                    var spanTag = document.createElement('span');
                    spanTag.setAttribute("class", "badge");
        
                    var iconTag = document.createElement('i');
                    iconTag.setAttribute("class", "material-icons error_icon");
                    iconTag.innerText = 'error';
                    
                    var chevronIconTag = document.createElement('i');
                    chevronIconTag.setAttribute("class", "material-icons chevron_icon");
                    chevronIconTag.innerText = 'chevron_right';

                    spanTag.appendChild(iconTag);
                    spanTag.appendChild(chevronIconTag);

                    var errorDetail = document.createElement('div'); 
                    errorDetail.setAttribute("class", "errorDetail");

                    var errorMsg = document.createElement('p'); 
                    errorDetail.setAttribute("class", "errorMsg");
                    errorMsg.innerHTML = "Error : "+displayError(errorArr[i]);
                   
                    var lineErrorDetail = document.createElement('p'); 
                    lineErrorDetail.setAttribute("class", "lineErrorDetail") ;
                    lineErrorDetail.innerHTML = "Line : " + errorArr[i].line+', ';

                    var colErrorDetail = document.createElement('span'); 
                    colErrorDetail.setAttribute("class", "colErrorDetail");
                    colErrorDetail.innerHTML = "Column : " + errorArr[i].col;

                    errorDetail.appendChild(errorMsg);
                    errorDetail.appendChild(lineErrorDetail);   
                    lineErrorDetail.appendChild(colErrorDetail);

                    paraTag.innerText = errorArr[i].code.length < 25 ? errorArr[i].code : errorArr[i].code.substring(0,23)+'...';
                    paraTag.title = errorArr[i].code;
                    achnorTag.appendChild(paraTag);
                    achnorTag.appendChild(spanTag); 
                    collection.appendChild(achnorTag);
                    collection.appendChild(errorDetail);                    
                }
            }
            if(errorArr.length >= 4){
                document.getElementById("moreError").innerText = (errorArr.length-5)+' moreErrors >>>';
                document.getElementById("moreError").href = "https://dev1.notifyvisitors.com/product/amp-validator?validate="+msg.currentUrl;
            }

            var classes  = document.getElementsByClassName("collection-item");
            for(var i=0;i<classes.length;i++){
                classes[i].addEventListener("click",clickEvent);
            }
        }
    });
}



