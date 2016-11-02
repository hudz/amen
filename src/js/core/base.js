
function ajaxcontroller(type,value,id){
new Ajax.Request("../utility/ajaxcontroller.jsp",
{
method:'post',
parameters: {type:type,value:value,id:id},
onSuccess: function(form){
var response = form.responseText || "no response text";
//r('content_form',response);
//r('savedBarCont','Saved');
//loading('off');
msgBar(type,'Saved');
},
onFailure: function(){
		msgBar(type,'Fail to update');
		}

});//end ajax

}

function getAjaxSmartLookup(lookupID,ID,ID2,selects,selectName){

new Ajax.Request("../utility/getAjaxSmartLookup.jsp",
{
method:'post',
parameters: {lookupID:lookupID,ID:ID,ID2:ID2,selects:selects,selectName:selectName},
onSuccess: function(form){
var response = form.responseText || "no response text";
r('semester_unit_aj',response);
msgBar(type,'Saved');
},
onFailure: function(){msgBar(type,'Fail to update');}
});//end ajax

}

function startup(id){
switch(id)
{
case 1:
  jumpAnchorFrCache();
  break;    
case 2:
  getAjaxSmartLookup('16','0',document.semesterunitgroupdetail.programmeID.value,'true','semesterUnitID');
  break;
default:
  
}
	
}

function setNDSubjectAllowed(id){
	type = "Subject";
	var url = "../Enrollment/NDSUBJECT/logic/updateNDSubjectAllowed.jsp";
	new Ajax.Request(url,
{
method:'post',
parameters: {id:id},
onSuccess: function(form){
var response = form.responseText || "no response text";
//r('semester_unit_aj',response);
var allowed = "";
//alert('>'+trims(response)+'<');
if(trims(response)==1){allowed = " Allowed"}else if(trims(response)==0){allowed =" Disallowed"}
msgBar(type+allowed,'');
},
onFailure: function(){msgBar(type,'Fail to update');}
});//end ajax
	
}

function getStaffEntitlement(id){
	
	l('ic_no');
	var url = "../leavemgmt/applyleave/logic/getLeaveEntitlementByStaffAjax.jsp";
	new Ajax.Request(url,
{
method:'post',
parameters: {id:id},
onSuccess: function(form){
var response = form.responseText || "no response text";
//r('semester_unit_aj',response);
var allowed = "";
trims(response);
var data = new Array();
data = response.split(':');


w(data[1],data[0]);
var divVar = new Array;
var strVar = new Array;
strVar = data[1].split('|');
divVar = data[0].split('|');
//var selectedData = ["",]
//alert(">"+trims(divVar[0])+"<");
document.forms[0].alStaffId.value = "";
document.forms[0].alSleId.value = "";
document.forms[0].alBalance.value = "";
document.forms[0].alPositionId.value = "";
	document.forms[0].emlFrom.value = "";
	document.forms[0].startPeriod2.value = "";
	document.forms[0].endPeriod2.value = "";
	document.forms[0].alRemarks.value = "";
for(var i=0;i<divVar.length;i++){
//if(trims(divVar[i])=="sle_id"){
//	if(trims(strVar[i])!="0"){
//	showThis('buttonSave');
//	hideThis('infoWarning');
if(trims(divVar[i])=="staff_id"){

	document.forms[0].alStaffId.value = strVar[i];
}
if(trims(divVar[i])=="sle_id"){
	
	document.forms[0].alSleId.value = strVar[i];
}
if(trims(divVar[i])=="sle_curr_balance"){
	document.forms[0].alBalance.value = strVar[i];
}
if(trims(divVar[i])=="position_id"){
	document.forms[0].alPositionId.value = strVar[i];
}
if(trims(divVar[i])=="email"){
	document.forms[0].emlFrom.value = strVar[i];
}
if(trims(divVar[i])=="sle_start_date"){
	document.forms[0].startPeriod2.value = formatDate(strVar[i]);
}
if(trims(divVar[i])=="sle_end_date"){
	document.forms[0].endPeriod2.value = formatDate(strVar[i]);
}
if(trims(divVar[i])=="sle_remark"){
	document.forms[0].alRemarks.value = strVar[i];
}
if(document.forms[0].alSleId.value!=""){
showThis('buttonSave');
	hideThis('infoWarning');
}else{
	showThis('infoWarning');
hideThis('buttonSave');
}
//	}else{
//	showThis('infoWarning');
//	hideThis('buttonSave');
//}

//}else{
//	showThis('infoWarning');
//	hideThis('buttonSave');
//}
}

//alert('>'++'<');
if(trims(response)==1){allowed = " Allowed"}else if(trims(response)==0){allowed =" Disallowed"}
msgBar('Loaded..','');
},
onFailure: function(){msgBar('','Fail to get');}
});//end ajax
	
}
