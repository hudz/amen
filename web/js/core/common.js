//common function
//detecting browser
var popupFrame = "<div style=\"position:fixed; top:50; left:100; z-index: 1000; display:none;\" class=\"editor\" id=\"editor\">      <a name=\"editor_a\"></a>  <div id=\"linkeditor\" style=\"top: auto ;left: auto;\">  <div class=\"border\">    <span id=\"closeButtons\" style=\"float:right\">   <input type=\"button\" onclick=\"closeThisWindow('editor');\" value=\"X\" class=\"inputbutton\"/>    </span>	  <div id=\"h2\"><span id=\"content_title\">  <span id=\"closeButtons\" style=\"float:right\"><input type=\"button\" onclick=\"closeThisWindow('editor');\" value=\"tutup\" class=\"inputbutton\"/> </span> </span></div> <div id=\"contentx\"><span id=\"content_form\"></span></div>	  </div>	  </div>	  </div>";
var buttonClose = "<br /><input type=\"button\" value=\"Tutup\" onclick=\"closeThisWindow('editor')\" />"
//var source = "http://192.168.1.153:8080/smp" ;
//var source = "http://localhost:8000/smp" ;
//var source = "http://sps.upm.edu.my:8080/igims" ;
var source = "http://localhost:8000/smpv0" ;
var agent = navigator.userAgent.toLowerCase();
var is_ie = (agent.indexOf("msie") != -1);
var is_ie_4 = (is_ie && (agent.indexOf("msie 4") != -1));
var is_ie_5 = (is_ie && (agent.indexOf("msie 5.0") != -1));
var is_ie_5_up = (is_ie && !is_ie_4);
var is_ie_5_5 = (is_ie && (agent.indexOf("msie 5.5") != -1));
var is_ie_5_5_up = (is_ie && !is_ie_4 && !is_ie_5);
var is_ie_6 = (is_ie && (agent.indexOf("msie 6.0") != -1));
var is_ie_7 = (is_ie && (agent.indexOf("msie 7.0") != -1));
var is_mozilla = ((agent.indexOf("mozilla") != -1) && (agent.indexOf("spoofer") == -1) && (agent.indexOf("compatible") == -1) && (agent.indexOf("opera") == -1) && (agent.indexOf("webtv") == -1) && (agent.indexOf("hotjava") == -1));
var is_mozilla_1_3_up = (is_mozilla && (navigator.productSub > 20030210));
var is_ns_4 = (!is_ie && (agent.indexOf("mozilla/4.") != -1));
var is_rtf = (is_ie_5_5_up || is_mozilla_1_3_up);
var is_safari = (agent.indexOf("safari") != -1);

// W3CDOM is for check whether meets the w3cdom or not
var W3CDOM = (document.getElementsByTagName && document.createElement);
// loading <%=request.getContextPath()%>
function loading(stat){if(stat=='on'){if(ce('loading_bar')){document.getElementById('loading_bar').innerHTML='<img src="../images/tiny_red.gif" />';}}else{if(ce('loading_bar')){document.getElementById('loading_bar').innerHTML='';}}}
// showElement
function showThis(id){if (document.getElementById(id).style.display == 'none')document.getElementById(id).style.display = '';}
// hide Element
function hideThis(id){document.getElementById(id).style.display='none';}
// display loading at center
function b(div){document.getElementById(div).innerHTML='<table width=\"100%\"  cellpadding=\"3\" cellspacing=\"3\" align=\"center\"><tr><td align=\"center\"><img src="'+source+'/images/tiny_red.gif" /></td></tr></table>';}
// getNumbering for a,b,c or i,ii,iii
function getNumbering(type,count){var subQuestion = new Array();subQuestion=["a","b","c","d","e","f","g","h","i","j","h","i"];subSubQuestion=["i","ii","iii","iv","v","vi","vii","viii","viiii","x","xi","xii"];if(type=="sub"){for(var i=0;i<subQuestion.length;i++){if(count-1==i){return subQuestion[i];}}}else{for(var i=0;i<subSubQuestion.length;i++){if(count-1==i){return subSubQuestion[i];}}}}
// get the type and return null of undefine
function ge(id){if(typeof(id)=='undefined'){return null;}}
function gen(id){if(typeof(id)=='undefined'){return 0;}}
// locate the hash
function locate(div){location.hash=div;}
// get 
function ga(){if(!window.ScriptEngine&&navigator.__ice_version){document.styleSheets;}if(document.getElementsByTagName){var Lk=document.getElementsByTagName('link'),Sl=document.getElementsByTagName('style');}else if(document.styleSheets && document.all ){var Lk=document.all.tags('LINK'),Sl=document.all.tags('STYLE');}else{return [];}for(var z=0,os=[];Lk[z];z++){var rel=Lk[z].rel?Lk[z].rel:Lk[z].getAttribute?Lk[z].getAttribute('rel'):'';if( typeof(rel)=='string'&&rel.toLowerCase().indexOf('style')+1){os[os.length]=Lk[z];}}for(var z=0;Sl[z];z++){os[os.length]=Sl[z];}return os;}
// i dun remember
function cs(){for(var z=0,sg=ga();sg[z];z++){if(sg[z].title){sg[z].disabled=true;}for(var y=0;y<arguments.length; y++){if(sg[z].title==arguments[y]){sg[z].disabled=false;}}}}
// get width
function gw(){return !W3CDOM?document.body.offsetWidth:window.innerWidth}
// get height
function gh(){return !W3CDOM?document.body.offsetHeight:window.innerHeight}
// check if id exist or not
function ce(id){if(document.getElementById(id)!=null){return true;}else{return false;}}
// check if type of id exist or undefined
function de(id){if(typeof document.getElementById(id)=='undefined'){return "babab";}}
// check if theVal is in the parent
function fe(inParent,theVal) {
if(inParent){
if (window.opener.document.getElementById(theVal) != null) {
return true;
} else {
return false;
}
}else{
if (document.getElementById(theVal) != null) {
return true;
} else {
return false;
}
}
}
// write str in different div // this important for ajax to return many data
function w(str,div){var dataArray = new Array();var divArray = new Array();dataArray = str.split('|');divArray = div.split('|');for(var i=0;i<dataArray.length;i++){if(!W3CDOM){if(ce(divArray[i])){r(divArray[i],dataArray[i]);}}else{if(ce(divArray[i])){rs(divArray[i],dataArray[i]);}}}}
// loading bar
function l(div){if(ce(div)){var str = '<img src="'+source+'/images/tiny_red.gif" />';           r(div,str);                }}
// write function to innerHTML
function r(div,str){
if(!W3CDOM){
var newdiv = document.createElement("div");
newdiv.innerHTML = str;
var container = document.getElementById(div);
container.appendChild(newdiv);
document.getElementById(div).innerHTML=str;
}else{
document.getElementById(div).innerHTML=str;
}
}
// write function //override firefox
function rs(div,str){
document.getElementById(div).innerHTML=str;
}
//object expected identifier
//class is reserved word for ie..
//create Element
function createElement(element,parent,id,elClass){
var newElement = document.createElement('span');
var container = document.getElementById(parent);
newElement.name = "image_id";
newElement.className = elClass;
newElement.id = id;
if(!W3CDOM){

}else{
//for ff and else*
//container.removeChild(document.getElementById("image_id"));
}
container.appendChild(newElement);
}
// deleteElement
function deleteElement(element){
//if(ge(element)){
var label=document.getElementById(element);
while( label.hasChildNodes() ) { label.removeChild( label.lastChild() ); }
}
// setCookie
function setCookie(name, value){
document.cookie = name+"="+value //cookie value is domain wide (path=/)
}
//getCookie
function getCookie(name){ 
var re=new RegExp(name+"=[^;]+", "i"); //construct RE to search for target name/value pair
if (document.cookie.match(re)) //if cookie found
return document.cookie.match(re)[0].split("=")[1] //return its value
return ""
}
// writeError
  function writeError(obj,message) {
	validForm = false;
	if (obj.hasError) return;
	if (W3CDOM) {
		obj.className += ' error'; 
		obj.onchange = removeError;
		var sp = document.createElement('span');
		sp.className = 'error';
		sp.appendChild(document.createTextNode(message));
		obj.parentNode.appendChild(sp);
		obj.hasError = sp;
	}
	else {
		errorstring += obj.name + ': ' + message + '\n';
		obj.hasError = true;
	}
	if (!firstError)
		firstError = obj;
}

//function leftTrim(str){while(str.substring(0,1)==' '){str=str.substring(1,str.length);}return str;}
//function rightTrim(str){while(str.substring(str.length-1,str.length)==' '){str=str.substring(0,str.length-1);}return str;}
//function trims(str){while(str.substring(0,1)==" "){str=str.substring(1,str.length);}while(str.substring(str.length-1,str.length)==" "){str=str.substring(0,str.length-1);}return str;}
// trims any string
function trims(str) {str = str.replace( /^\s+/g, "" );str = str.replace( /\s+$/g, "" ); return str;} 
// initcap any string
function initcap(str) {var str = str.substring(0,1).toUpperCase() + str.substring(1,str.length).toLowerCase();return str;}
// check email
function emailCheck (emailStr) {var checkTLD=1;var knownDomsPat=/^(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum)$/;var emailPat=/^(.+)@(.+)$/;var specialChars="\\(\\)><@,;:\\\\\\\"\\.\\[\\]";var validChars="\[^\\s" + specialChars + "\]";var quotedUser="(\"[^\"]*\")";var ipDomainPat=/^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/;var atom=validChars + '+';var word="(" + atom + "|" + quotedUser + ")";var userPat=new RegExp("^" + word + "(\\." + word + ")*$");var domainPat=new RegExp("^" + atom + "(\\." + atom +")*$");var matchArray=emailStr.match(emailPat);if(matchArray==null){alert("Email address seems incorrect (check @ and .'s)");return false;}var user=matchArray[1];var domain=matchArray[2];for(i=0;i<user.length;i++){if(user.charCodeAt(i)>127){alert("Ths username contains invalid characters.");return false;}}for(i=0;i<domain.length;i++){if(domain.charCodeAt(i)>127){alert("Ths domain name contains invalid characters.");return false;}}if(user.match(userPat)==null){alert("The username doesn't seem to be valid.");return false;}var IPArray=domain.match(ipDomainPat);if(IPArray!=null){for(var i=1;i<=4;i++){if(IPArray[i]>255){alert("Destination IP address is invalid!");return false;}}return true;}var atomPat=new RegExp("^" + atom + "$");var domArr=domain.split(".");var len=domArr.length;for(i=0;i<len;i++){if(domArr[i].search(atomPat)==-1){alert("The domain name does not seem to be valid.");return false;}}if(checkTLD && domArr[domArr.length-1].length!=2&&domArr[domArr.length-1].search(knownDomsPat)==-1){alert("The address must end in a well-known domain or two letter " + "country.");return false;}if(len<2){alert("This address is missing a hostname!");return false;}return true;}
//get Href
function gethref(divEl) {var div1 = document.getElementById(divEl);var align = div1.getAttribute("align");}
// display msgBar using script.ulico.us
function msgBar(type,msg){
//new Effect.Appear(document.getElementById('msgBar'));
//currenly disable for IE 6..does not work well in IE 6 & 7
if(W3CDOM){
if(ce('msgBar')){
showThis('msgBar');
r('msgBarCont',initcap(type) + ' ' + msg);
setTimeout("Effect.Fade('msgBar')",200);
}
}
}
// display showMsgBar using script.ulico.us
function showMsgBar(type,msg){
//new Effect.Appear(document.getElementById('msgBar'));
//currenly disable for IE 6..does not work well in IE 6 & 7
if(W3CDOM){
if(ce('msgBar')){
showThis('msgBar');
r('msgBarCont',initcap(type) + ' ' + msg);
//setTimeout("Effect.Fade('msgBar')",200);
}
}
}
// display hideMsgBar using script.ulico.us
function hideMsgBar(){
//new Effect.Appear(document.getElementById('msgBar'));
//currenly disable for IE 6..does not work well in IE 6 & 7
if(W3CDOM){
if(ce('msgBar')){
//showThis('msgBar');
//r('msgBarCont',initcap(type) + ' ' + msg);
setTimeout("Effect.Fade('msgBar')",200);
}
}
}
//set focus to first item in a form
function setFocus1st(aForm){
	if( aForm.elements[0]!=null) {
	var i;var max = aForm.length;
   for( i = 0; i < max; i++ ) {
    if( aForm.elements[ i ].type != "hidden"
     && !aForm.elements[ i ].disabled
     && !aForm.elements[ i ].readOnly ) {
      aForm.elements[ i ].focus();
      break;
     }
   }
  }
 } 
 //
function ae(a){
	for(idx=0; idx<document.anchors.length; idx++){
		if(document.anchors[idx].name==a){
			return true;
			break;
			}else{
				return false;}
				}
}
// link to anchor
function linkTo(anchorName){if(ae(anchorName)){window.location=String(window.location).replace(/\#.*$/, "") + "#"+anchorName;}else{}}
//
function addParam(param){if(ae(param)){window.location=String(window.location).replace(/\#.*$/, "") + "&"+param;}else{}}
//function save and populate and delete form from cookie
function saveThisForm(cookieName,formName){setThisCookie(cookieName,getFormString(formName,true));}
function populateThisForm(cookieName,formName){recoverInputs(formName,retrieveCookie(cookieName),true);}
function deleteThisForm(cookieName){setThisCookie(cookieName, '', 'delete' );}
//jump to anchor
function jumpTo(anchorName) {
  var anchorID;
  for(idx=0; idx<document.anchors.length; idx++) {
    if(document.anchors[idx].name == anchorName) {
      anchorID = idx;
      break;
    }
  }
  if (anchorID != undefined) {
    if (document.anchors[anchorID]) {
      self.location.hash = anchorName;
    } else {
      if(W3CDOM){
			if(ce('msgBar')){
				showThis('msgBar');
				r('msgBarCont',initcap('anchor not found.'));
				 }
				}
    }
  } else {
  }
} // jumpTo()
//jumpt to anchor from cache
function jumpAnchorFrCache(){
	var anchorStr = getCookie('anchorCache');
	jumpTo(anchorStr);
}
// return array on a form within accepted type
/*
function returnValueForm(formName){
	var typeAccepted = new Array();
	var returnObj = new Array();
	var returnNum = 0;
	typeAccepted = ["text","textarea","select"];
	for (var i = 0; i < document.formName.elements.length; i++){
	   for (var j = 0; j < typeAccepted.length ;j++){
		  if(document.formName.elements[i].type == typeAccepted[j]){ 
		     returnNum ++;
			 returnObj[returnNum] = document.formName.elements[i].value;
			 //returnObj[returnNum][] = document.formName.elements[i].name;
		 } 
	   }
   }//end for 
   return returnObj;
}
//save element in a form using cookie..hehe
function saveFormCookie(formName){
	var acceptedValueObj = returnValueForm(formName);
	var typeAccepted = new Array();
	typeAccepted = ["text","textarea","select"];
	for (var i = 0; i < acceptedValueObj.length; i++){
		setCookie(formName+"."+document.formName.elements[i].name, acceptedValueObj);
   }//end for 
}
//populate element to form from cookie
function populateFormCookie(formName){
	var acceptedValueObj = returnValueForm(formName);
	var formElement = new Array();
	var i = 0;
	
}
*/
/*To delete a cookie, use:

	var cookieDeletePermitted = setCookie( cookieNameAsAString, '', 'delete' );

	or set lifeTime to a less than 0 value.
*/	
function setThisCookie( cookieName, cookieValue, lifeTime, path, domain, isSecure ) {
	if( !cookieName ) { return false; }
	if( lifeTime == "delete" ) { lifeTime = -10; } //this is in the past. Expires immediately.
	/* This next line sets the cookie but does not overwrite other cookies.
	syntax: cookieName=cookieValue[;expires=dataAsString[;path=pathAsString[;domain=domainAsString[;secure]]]]
	Because of the way that document.cookie behaves, writing this here is equivalent to writing
	document.cookie = whatIAmWritingNow + "; " + document.cookie; */
	document.cookie = escape( cookieName ) + "=" + escape( cookieValue ) +
		( lifeTime ? ";expires=" + ( new Date( ( new Date() ).getTime() + ( 1000 * lifeTime ) ) ).toGMTString() : "" ) +
		( path ? ";path=" + path : "") + ( domain ? ";domain=" + domain : "") + 
		( isSecure ? ";secure" : "");
	//check if the cookie has been set/deleted as required
	if( lifeTime < 0 ) { if( typeof( retrieveCookie( cookieName ) ) == "string" ) { return false; } return true; }
	if( typeof( retrieveCookie( cookieName ) ) == "string" ) { return true; } return false;
}

function retrieveCookie( cookieName ) {
	var cookieJar = document.cookie.split( "; " );
	for( var x = 0; x < cookieJar.length; x++ ) {
		var oneCookie = cookieJar[x].split( "=" );
		if( oneCookie[0] == escape( cookieName ) ) { return oneCookie[1] ? unescape( oneCookie[1] ) : ''; }
	}
	return null;
}

//toggle column
var showMode = 'table-cell';
if (document.all) showMode = 'block';
function toggleVisual(btn){
	
    btn   = document.forms[0].elements[btn];
	
	cells = document.getElementsByName('t'+btn.name);
	//alert(cells);
	mode = btn.checked ? showMode : 'none';
	if(btn.checked){
		//alert(btn+'_h');
	showThis(btn.name+'_h');	
	}else{
		hideThis(btn.name+'_h');	
	}
	for(j = 0; j < cells.length; j++) cells[j].style.display = mode;
}


function popForm(value1,value2,option,caption,url,ajax){
openThisWindow('editor');
l('content_form');

if(ajax){
if(option=='view'){
new Ajax.Request(url,
{
method:'post',
parameters: {studId:value1,id:value2},
onSuccess: function(form){
var response = form.responseText || "no response text";
r('content_form',response);
r('content_title',caption);
//loading('off');
},
onFailure: function(){ alert('Gagal untuk pop '+caption+' form.') }

});
}else if(option=='arahan'){
new Ajax.Request(url,
{
method:'post',
parameters: {checkList:value1,checkListId:value2},
onSuccess: function(form){
var response = form.responseText || "no response text";

r('content_form',response);
r('content_title',caption);
//loading('off');
},
onFailure: function(){ alert('Gagal untuk pop '+caption+' form.') }

});//end ajax
}else if(option=='edit'){
new Ajax.Request(url,
{
method:'post',
parameters: {bts_id:value1,checkListId:value2},
onSuccess: function(form){
var response = form.responseText || "no response text";

r('content_form',response);
r('content_title',caption);
//loading('off');
},
onFailure: function(){ alert('Gagal untuk pop '+caption+' form.') }

});//end ajax
}else if(option=='remove'){
new Ajax.Request(url,
{
method:'post',
parameters: {bts_id:value1,checkListId:value2},
onSuccess: function(form){
var response = form.responseText || "no response text";

r('content_form',response);
r('content_title',caption);
//loading('off');
},
onFailure: function(){ alert('Gagal untuk pop '+caption+' form.') }

});//end ajax
}
}
else{
r('content_form',url);
r('content_title',caption);
}
}//end popEditForm
function openThisWindow(id){
	Effect.Appear(id, { duration: 0.7 });
}
function closeThisWindow(id){
	Effect.Fade(id, { duration: 0.2 });
	//$(div).fade();
	//div.fade();
}

function initPopup(){
	document.write(popupFrame);
}

function isNumber(field) {
var numChars="0123456789.";
var isNum = true;
for(var i=0; i<field.value.length; i++) {
  for(var j=0; j<numChars.length; j++)  {
   if(numChars.charAt(j)==field.value.charAt(i))   {   
   		break;
    } else {  if(j==(numChars.length-1)) { isNum = false; } }  
	
  }
 }
if(isNum==false){
return false;
} else {
return true;
}


}

function clearThis(src){
	src.value = ""
	}
	function focusAndSelectThis(src){
	setTimeout(function(){src.focus();src.select();},1);
	}