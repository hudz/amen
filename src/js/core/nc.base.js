/*!
 * Base JavaScript Function (for nc)
 * @requires jQuery v1.3 or later
 * (c) 2009, 2010, 2011 ncsoft Software Development team 
 *
 * Original author, Hudzaifah Hafiz [ hudzaifah@gmail.com ]
 *
 * nc.base.js is a Free License, some code is under MIT license.
 * (http://www.opensource.org/licenses/mit-license.php)
 *
 * For a nice jQuery plugin development pattern, see:
 * http://www.learningjquery.com/2007/10/a-plugin-development-pattern
 *  
 *  List of functions available.
 * 1.URL
 * 2.language
 * 3.lookup
 * 4.table
 * 5.save
 * 6.populate
 * 7.ajax
 * 8.email
 * 9.submit
 * 10.autocomplete
 * 11.form
 * 12.tabs
 * 13.upload
 * 14.list
 * 15.chart
 * 16.data
 */


nc.base = {
	
	URL	: {
		lookup			: nc.hostName + nc.ENGINE_PATH + "lookup.jsp",
		table			: nc.hostName + nc.ENGINE_PATH + "table.jsp" ,
		sql				: nc.hostName + nc.ENGINE_PATH + "sql.jsp" ,
		save			: nc.hostName + nc.ENGINE_PATH + "save.jsp" ,
		language		: nc.hostName + nc.ENGINE_PATH + "language.jsp",
		email			: nc.hostName + nc.ENGINE_PATH + "email.jsp",
		autocomplete	: nc.hostName + nc.ENGINE_PATH + "autocomplete.jsp",
		populate		: nc.hostName + nc.ENGINE_PATH + "populate.jsp",
		list			: nc.hostName + nc.ENGINE_PATH + "list.jsp",
		count			: nc.hostName + nc.ENGINE_PATH + "count.jsp",
		array			: nc.hostName + nc.ENGINE_PATH + "array.jsp",
		chart			: nc.hostName + nc.ENGINE_PATH + "chart.jsp",
		data			: nc.hostName + nc.ENGINE_PATH + "data.jsp",
		upload			: nc.hostName + nc.ENGINE_PATH + "upload.jsp",
		uploadTemp		: nc.hostName + nc.ENGINE_PATH + "uploadTemp.jsp",
		download		: nc.hostName + nc.ENGINE_PATH + "download.jsp",
		report			: nc.hostName + nc.ENGINE_PATH + "report.jsp",
		view			: nc.hostName + nc.ENGINE_PATH + "viewFile.jsp"
		
	},
			
	// DatePicker by
	// requires jquery.datepicker.js
	
	calendar: function(elem, dateFormat, options){
		var dateFormatDefault = '';
		if(dateFormat === undefined){
			dateFormatDefault = 'dd/mm/yy';
		}else{
			dateFormatDefault = dateFormat;
		}
		 	 
		// default variable not accessible by outside
		var defaults = {
				button			: false,
				success			: '',
				maxDate			: ''
		};
		
		var opts = jQuery.extend({}, defaults, options);
		
		jQuery(elem).focus(function(e){e.stopPropagation();}).datepicker ({
			duration: '',
			showButtonPanel: true,
			buttonImage: (opts.button) ? '' : (nc.hostname+'/images/cal.gif'),
			showOn: (opts.button) ? 'both' : 'focus',
			dateFormat : dateFormatDefault,
			changeMonth: true,
			changeYear: true,
			yearRange: "-100:+0",
			showAnim: '',
			buttonImageOnly: true,
			maxDate		: ''
			//,onSelect: function() { $(this).change(); }
			
		});
	},
				
	// TimePicker by 
	// Copyright (c) 2007-2008 Maxime Haineault (haineault.com)
	// MIT License ~ http://www.opensource.org/licenses/mit-license.php
	timePicker: function(elem){
		jQuery(elem).timepicker({
			
		});
	},
			
				
	language: function(options, container, callback){
				
		// default variable not accessible by outside
		var defaults = {
				value: "",
				key  : "",
				container : container	// default container
		};
			
		var opts = jQuery.extend({}, defaults, options);
		var url =  nc.base.URL.language + "?key=" + opts.key;
		var value = nc.base._cache_language[url];

		if (value != null) {
			return value;
		}
		
		var xHR = jQuery.ajax(
				{
					async: false,
					type: "GET",
					url: url
				}
			);
		
		value = xHR.responseText;
		nc.base._cache_language[url] = value;
		return value;
	},
			
	lookupJava: function(options, container, callback){
				
		// default variable not accessible by outside
		var defaults = {
				value: "",
				container : container	// default container
		};
		
		// Use jQuery.extend to extend options to defaults
		// Extend our default options with those provided.
		// Note that the first arg to extend is an empty object -
		// this is to keep from overriding our "defaults" object.
		var opts = jQuery.extend({}, defaults, options);
		
		jQuery(opts.container)
			.html(opts.value)
			.trigger("change");
	},
			
	lookup: function(options, container, callback){
	  	// Small loading
		//nc.ls(container);

		// default variable not accessible by outside
		var defaults = {
				id				: "",			// SQL ID
				defaultValue	: "",			// defaultValue yang akan dipilih
			  	ID				: "",			//
				ID1				: "",			//	== ID
				ID2				: "",			//
				parameters		: {},			// JSON Obj
				parameter		: "",			// 
				parameter1		: "",			//
				parameter2		: "",			//
				parameter3		: "",			//	== PARAMETER
				parameter4		: "",			//
				parameter5		: "",			//
				parameter6		: "",			//
				condition		: "",			//
				condition1		: "",			//	== CONDITION
				condition2		: "",			//
				returnThis		: false,		// return something
				response		: "",			// response from traveler
				container		: "",			// container of 	
				lookup			: false,		// if want <select>
				inner_html		: false,		// inner html
				selectOption	: true,    		// ??
				callback		: "",			// callback function
				singleData		: false,		// if don"t want <select>
				allValue		: false,		// If want ALL value in select 
				specialCase		: "",			// SpecialCase
				selected		: false,		// onSuccess, choose the first option
				defaultSelected		: false,		// onSuccess, choose the first option
				notOption		: false,		// emm
				language		: "BI",			// language 
				success			: "",           // same as callback
				json			: true,			// return type json
				change			: "",
				cache			: true,
				pleaseSelect	: true,
				database		: false,
				disabled		: false
				
				
		};
		
		// Use jQuery.extend to extend options to defaults
		// Extend our default options with those provided.
		// Note that the first arg to extend is an empty object -
		// this is to keep from overriding our "defaults" object.
		var opts = jQuery.extend({}, defaults, options);
		
		// Serialize and send parameter that from user 
		// this is to keep from sending to the server with empty parameter
		var data = nc.base.serialize(opts, defaults, options);
		
		// to save up redundant ajax call
		var urlCache = nc.base.URL.lookup + data;
		var value = nc.base._cache_lookup[urlCache];
		
		function init(opts){
			nc.out('init');
		}
		
		
		// value from cache is
		// and cache is true
		if (value != null && opts.cache) {
			opts.response = value;
			populate.call(this, opts);
			//nc.base.afterLookup(opts);
		}else{
			
			// prevent from trigger ajax if parameter is null or -
			if(opts.parameter != "-" && opts.parameter1 != "-"){
				nc.msg({msg:'Loading..'});
				jQuery.ajax({
					//mode	: "abort",
					type	: "POST",
					url		: nc.base.URL.lookup,
					data	: data,
					success	: function(msg){
				
							// catch error and stop the ajax
							if( nc.error(msg) ) return;
						
							msg = jQuery.trim(msg);
							opts.response = msg;
							var pleaseSelect = '<option value="">- SILA PILIH -</option>';
							var noData = '<option value="">- TIADA DATA -</option>';
							
							if(opts.json){
								var encoded = jQuery.evalJSON(opts.response);
								var theHTML = (opts.pleaseSelect) ? pleaseSelect : '';
								var countData = null;
								jQuery.each(encoded.data, function(val, text, i){
									// construct <option>
									theHTML = theHTML + '<option value="' + this['id'] +'">' + this['desc'] + '</option>';
									countData = val;
								});
								if(countData == null){
									theHTML = noData;
								}
								opts.response = theHTML;
							}
							
							// save all lookup in an array
							nc.base._cache_lookup[urlCache] = opts.response;
							
							populate(opts);
							
							jQuery(document).trigger('nc.lookup');
							nc.msg({destroy:'true'});
						}
					
				});
			}
		
		}
		
		if(opts.returnThis){
			//return opts.response;
		}

		function populate(opts){
			// Put lookup
			var notSingleData = false;
			if( opts.singleData ){
				notSingleData = false;
				if(opts.inner_html){
					if(!notSingleData){
						jQuery(opts.container).html(opts.response);
					}else{
						notSingleData = true;
						jQuery(opts.container).html(opts.response);
					}
				}else{
					
					notSingleData = false;
					jQuery(opts.container).val(opts.response);
				}
			}else{
				notSingleData = true;
				jQuery(opts.container).html(opts.response);
			}
			
			
			// select automatically if option is [1]
			if(notSingleData){
				if(opts.defaultValue != ""){
					jQuery(opts.container).val(opts.defaultValue).change();
				}else{
					var optionLength = jQuery(opts.container).length;
					// select automatically
					if(opts.selected){
						// If option is more than 1
						if(optionLength < 2){
							jQuery("option:eq(1)",opts.container).attr("selected","selected");		
						}
						
						// If the dropdown have only one option (changes request by user E)
						// then remove --sila pilih-- or --please select--
						if(jQuery("option" , opts.container).size() == 2){
							// remove first option
							jQuery(opts.container).children().eq(0).remove();
							// disable it ?
							//jQuery(opts.container).attr("disabled", true)
							
						}else{
							//jQuery(opts.container).attr("disabled", false)
						} 
					}
				}
				if(opts.disabled){
					jQuery(opts.container).attr("disabled", true)
				}
			}
			
			
			if( opts.change != ""){
				//jQuery(opts.container).unbind('change').change(function(){opts.change();});
				jQuery(opts.container).off('change').on( 'change', function(){opts.change();});
				// live event kept bubbling
				//jQuery(opts.container).on('change', function(){opts.change();});
				//setTimeout(function(){jQuery(opts.container).change();},50);
			}else{
				// trigger change
				jQuery(opts.container).trigger("change");
			}
			
			jQuery(document).trigger("nc.lookup");
			
			// if allValue is true append option all(for report purpose)
			if(opts.allValue){
				jQuery(opts.container).append('<option value="all">ALL</option>');
			}
			
			//Last call;
			// call callback function
			(opts.callback == "" || opts.callback == undefined) ? "" : opts.callback(opts);
			// onsuccess function
			(opts.success == ""    || opts.success == undefined) ? "" : opts.success(opts);
		}
				
	}, //end lookup
		
	
	sql:  function(options, container, callback){ 
		var defaults = {
				URL	:	nc.base.URL.sql,
			  	id: "",
		    	ID: "",
				ID1: "",
		   	 	ID2: "",
		   	 	sql: "",
		   	 	//parameters: {},
				parameter: "",
				parameter1: "",
				parameter2: "",
				parameter3: "",
				parameter4: "",
				parameter5: "",
				parameter6: "",
				condition: "",
				condition1: "",
				condition2: ""
			};
		var opts = jQuery.extend({}, defaults, options);
		
		nc.table(opts, container, callback);
	},
		
	// ===========================================
	// CREATE TABLE 
	// CALL nc.base.Table({options})
	// ===========================================
	table: function(options, container, callback){
		
		var UINamingBM = ["RESET"],
			UINamingBI = ["RESET"],
			UINaming = ["RESET"],
			tableInstance = this,
			
			// default variable not accessible by outside
			defaults = {
				URL	:	nc.base.URL.table,
			  	id: "",
		    	ID: "",
				ID1: "",
		   	 	ID2: "",
		   	 	sql: "",
		   	 	authorize	: true,
		   	 	database	: false,
		   	 	//parameters: {},
				parameter: "",
				parameter1: "",
				parameter2: "",
				parameter3: "",
				parameter4: "",
				parameter5: "",
				parameter6: "",
				condition: "",
				condition1: "",
				condition2: "",
				selectOption: "",
				returnThis: false,
				response: "",
				columnsDataList: [],
				container: "",
				lookup: true,
				callback: "",
				success: "",
				style: "",
				tableWidth: "100",
				tableID: "list_data",
				paging: "java",
				listAll: false,
				page: 0,
				elementTargeted: "",
				json: true,
				pager: true,
				title: '',
				titleShow: true,
				render: "sortable",
				scrollbar: "",
				loadData : "",
				containerNavigation: "",
				currentPage : "1",
				totalRecords : 0,
				totalPage : 0,
				range : '10',
				sort : 0,
				sortType : 'asc',
				filter: '',
				filterType: '',
				minRows: '',
				maxRows: '',
				renderTo: '_wrapper',
				table_title	:	'#table_title',
				table_bar	:  '.table_bar',
				hasTableTitle: false,
				hasNavigation: false,
				pagerNavigation: true,
				search		: true,
				print		: true,
				rowClick : '',
				rightClick: false,
				rightClickHeader: false,
				selectRow 		: '',
				select 			: '', // to select row,
				refresh			: '',	// interval to refresh 
				trColumn		: '',
				hideColumn		: '',
				checkboxInput 	: '<input type="checkbox" value="" id="select_all_checkbox" title="Select All"/>',
				checkboxArray	: [],
				checkboxArrayTemp	: [],
				order			: true,
				initTime		: false, 
				initCalendar 	: false, 
				checkboxes		:	'', // to select row on check a checkboxes
				mini			: false, // mini version of table
				searchBar		: true,
				addRowButton 	: false,
				add			 	: false,
				excelButton		: false,
				reportButton	: false,
				excludeHeader	: [],
				bil				: true,
				printHTML		: '<div class="button_print_wrapper"><div class="button_print"> ' +
									'<a id="print_table" class="link_print"><span>CETAK <t id=\"print_text_detail\"></t></span></a></div></div>', 
				addRowHTML		: '<div class="button_add_wrapper"><div class="button_add"> ' +
									'<a id="add_row" class="link_add"><span>TAMBAH <t id=\"add_text_detail\"></t></span></a></div></div>',
				convExcelHTML	: '<div class="button_excel_wrapper"><div class="button_excel"> ' +
									'<a id="conv_excel" class="link_excel"><span>EXCEL</span></a></div></div>',
				reportHTML		: '<div class="button_report_wrapper"><div class="button_report"> ' +
									'<a id="_report" class="_list_report"><span>LAPORAN</span></a></div></div>',
				rightClickMenu 	: '<ul id="myMenu" class="contextMenu"> ' +
			    					'<li class="insert"><a href="#insert">Add New</a></li> ' +        
			    					'<li class="edit"><a href="#edit">Edit</a></li>            ' +         
			    					'<li class="delete"><a href="#delete">Delete</a></li>          ' +   
			    				 '</ul> ',
			    vgrip			: '<div class="vGrip"><span></span></div>',
				htmlTableTitle 	: '<div id="table_title" style="cursor: default;" class=""><span>Listing</span><div class="ptogtitle" title="Minimize/Maximize Table"></div></div>',
				htmlPagingPager : 
				'<div class="table_bar"> ' +
				'<span id="pager" class="pager"> ' +
			  	'<span id="child_pager_left" >  ' +
			    	//'<img class="search_s" src="'+nc.hostname+'/images/icon/search_small.png"/>  ' +
						'<select id="select_s"><option>--</option></select>  ' +
					 	'<input type="text" id="filter_box" class="search" placeholder="Search table.." value="" maxlength="20" size="20"  />  ' +
					 	'<span class="button reset" id="filter_clear_button" >x</span>' +
					 	'<span class="button ui-corner-tr ui-corner-br " id="refresh_button" value="REFRESH" ><span></span></span>' +
			    '</span>  ' +
			    '<span id="child_pager_right">  ' +
			    		'<span id="detailRecord"></span>' +
			    		'<span id="first" class="first ui-corner-tl ui-corner-bl fg-button button ui-state-default" id="example_first"><<</span> '+
			    		'<span id="prev" class="prev fg-button button ui-state-default" id="example_previous"><</span>'+
			 			//'<img class="first" src="'+nc.hostname+'/images/icon/first.png" />  ' +
						//'<img class="prev" src="'+nc.hostname+'/images/icon/prev.png" />  ' +
						'<input id="pagedisplay" class="pagedisplay" type="text" size ="5" readOnly style="text-align:center;"/>  ' +
						//'<img class="next" src="'+nc.hostname+'/images/icon/next.png" />  ' +
						//'<img class="last" src="'+nc.hostname+'/images/icon/last.png" />  ' +
						'<span id="next" class="next fg-button button ui-state-default" id="example_next">></span>'+
						'<span id="last" class="last ui-corner-tr ui-corner-br fg-button button ui-state-default" id="example_last">>></span>'+
						'<select class="pagesize" id="pagesize" > ' +
							'<option value="10" selected="selected">10</option>  ' +
							'<option value="20">20</option>  ' +
							'<option value="30">30</option>  ' +
							//'<option value="9999">Semua</option>  ' +
						'</select>  ' +
					'</span>  ' +
			   '</span>' 
					 
 
			};
		
		// Use jQuery.extend to extend options to defaults
		// Extend our default options with those provided.
		// Note that the first arg to extend is an empty object -
		// this is to keep from overriding our "defaults" object.
		var opts = jQuery.extend({}, defaults, options);
		
		// override back table id
		// opts.tableID = 'table' + opts.tableID;
		// Serialize and send parameter that from user 
		// var data = nc.base.serialize(opts, defaults, options);
		data = "";
		
		
		
		if( opts.container != "" ){
			//opts.tableID = opts.container;
		}
		
		if( opts.scrollbar != "" ){
			//opts.listAll = true;
		}

		init(opts);
		
		function init(opts){
			createWrapper(opts);
			if(opts.refresh != ''){
				if( opts.refresh != '' && parseInt(opts.refresh) < 10000 ) opts.refresh = 10000;
				setInterval ( function(){ populate(opts); }, parseInt(opts.refresh) );
			}else{
				populate(opts);
			}
		}
		
		function populate(opts) { //get latest data
			nc.loadingIcon( opts.tableID + opts.renderTo );
			// merge 
			opts.checkboxArray = jQuery.merge(opts.checkboxArray, opts.checkboxArrayTemp);
			// make them unique
			opts.checkboxArray = jQuery.unique(opts.checkboxArray);
			
			//opts.checkboxArray = (opts.checkboxArray.length == 0) ? opts.checkboxArrayTemp :( jQuery.merge(opts.checkboxArrayTemp , opts.checkboxArray ));
			
			if(opts.renderTo != ''){
				//nc.loadingIcon( opts.tableID + opts.renderTo );
				nc.msg({msg:'Loading..'});
			}
			
			// to save up redundant ajax call
			data = nc.base.serialize(opts, defaults, options);
			
			var urlCache = opts.URL + data, 
				value = nc.base._cache_table[urlCache];
			
			if (value != null) {
				opts.response = value;
				return;
			}
			
			//jQuery('tbody', opts.tableID).css({'background-color'});
			
			var hasWrapped = false;
			var interval = null;
			
			// Call ajax by post
			jQuery.ajax({
					// try to leverage ajaxQueue plugin to abort previous requests
					mode: "abort",
					// limit abortion to this input
					port: "table" + opts.id,
					type: "POST",
					url: opts.URL,
					data: data,
					statusCode: {
					    404: function() {
					      nc.error("page not found:<br />"+nc.base.URL.table);
					    },
					    0: function() {
					    		nc.removeLoadingIcon(opts.tableID + opts.renderTo );
					    		nc.msg({destroy:'true'});
						    } 
					  },
					  
					success: function(msg){
						
						// catch error and stop the ajax
						if(nc.error(msg)) return;
						
						//nc.timeEnd('tablesuccess')
						
						try{
						// 0: GET RESPONSE
						// ---------------
						msg = jQuery.trim(msg);  
						opts.response = msg;
						
						// temp
						if(opts.render == "flexigrid"){
							jQuery(opts.tableID).flexigrid({
								colModel : [
											{display: 'Matric No', name : 'matric', width : 180, sortable : true, align: 'left'},
											{display: 'Student Name', name : 'student_name', width : 120, sortable : true, align: 'left'},
											{display: 'IC Passport', name : 'numcode', width : 80, sortable : true, align: 'right'}
											],
								searchitems : [
											{display: 'Matric No', name : 'matric'},
											{display: 'Student Name', name : 'student_name', isdefault: true}
											],

								usepager: true,
								rp: 10

							});
						}
						
						// 00: MAKE TABLE
						
						// 2: CREATE PAGER NAVIGATION
						// --------------------------
						if(opts.pagerNavigation && opts.search ) createPagerNavigation(opts);
						
						// 1: CREATE TABLE TITLE
						// ---------------------
						createTableTitle(opts);
						
						// 3: CREATE TABLE HEADER & CONTENT & FOOTER
						// --------------------------------
						createTableHeaderAndContent(opts);
						createFooter(opts);
						
						// 5: MANAGE HEADERS
						// ----------------------------------
						manageHeaders(opts);
						
						// 4: CONFIGURE TABLE
						// ---------------------------------
						configureTable(opts);
						trackScroll();
						highlightRow(opts);
						
						(opts.mini) ? mini(opts) : "" ;
						
						
						//contextMenu(opts);
						
						//jQuery(opts.tableID).wrap('<div class="outer_table" />').css({'border':'1px solid #cccccc'});
						
						
						// 6: CALLBACK
						// CALLBACK FUNCTION
						(opts.callback == ""   || opts.callback == undefined)   ? "" : opts.callback();
						(opts.success == ""    || opts.success == undefined)    ? "" : opts.success(opts);
						(opts.rowClick == ""   || opts.rowClick == undefined)   ? "" : triggerRowClick(opts);
						(opts.selectRow == ""  || opts.selectRow == undefined)  ? "" : selectRow(opts);
						(opts.rightClick == "" || opts.rightClick == undefined) ? "" : rightClick(opts);
						(opts.rightClickHeader == "" || opts.rightClickHeader == undefined) ? "" : rightClickHeader(opts);
						(opts.checkboxes == "" || opts.checkboxes == undefined) ? "" : checkboxes(opts);
						
						
						 /*var onClose = this._get(inst, 'onClose');
			                if (onClose) {
			                    onClose.apply(
			                        (inst.input ? inst.input[0] : null),
								    [(inst.input ? inst.input.val() : ''), inst]);  // trigger custom callback
			                }
			                */
						
						// 6: TRIGGER 
						//jQuery(document).trigger('nc.table');
						nc.removeLoadingIcon( opts.tableID + opts.renderTo );
						nc.msg({ destroy:'true' });
						
						}catch(e){
							nc.err(e);
						}
						//  ===========================================
						//  END ON SUCCESS
						
						
						//nc.timeEnd('table');
					}
			
			
			}); // end ajax
		} // end populate
		
		
		
		function mini(opts){
			jQuery('#child_pager_two, .search_s').hide();
			//jQuery('tr.even td, tr.odd td').cssText({'height':'27px'});
		}
		
		function createWrapper(opts){
			var tableID = opts.tableID.replace('#','');
			if( jQuery(opts.tableID).parents('[id*=' + opts.renderTo + ']').size() <= 0 ){
				jQuery(opts.tableID).wrap('<div id="'+ tableID + opts.renderTo + '"  class="table_wrapper"></div>');
			}
			
			
		}
		
		function createTable(opts){
			if( opts.renderTo != '' ){
				if( jQuery( opts.renderTo ).find( 'table' ).size() < 0 ){
					jQuery( opts.renderTo ).prepend(' <table></table> ');
				}
			}
		}
		
		// creating table title
		function createTableTitle(opts){
			
			if(opts.render == "flexigrid"){
				
			}else{
				/*if( opts.renderTo != '_wrapper' ){
					// put the table_title element
					if( jQuery( opts.tableID + opts.renderTo ).find( opts.table_title ).size() <= 0 ){
						nc.out('jQuery(opts.htmlTableTitle).insertBefore(opts.tableID + opts.renderTo);')
						jQuery(opts.htmlTableTitle).insertBefore(opts.tableID + opts.renderTo);
					}
				}else{
				}*/
				//if( jQuery(opts.tableID, opts.tableID + opts.renderTo).prev( opts.table_title ).size() <= 0 ){
				if( jQuery(opts.table_title, opts.tableID + opts.renderTo).size() <= 0 ){
					if(opts.titleShow){
						if(opts.title != ''){
							//jQuery(opts.htmlTableTitle).insertBefore(opts.tableID + opts.renderTo);
							jQuery(opts.tableID + opts.renderTo).prepend(opts.htmlTableTitle);
							jQuery(opts.table_title, opts.tableID + opts.renderTo).find("span").html(opts.title);
						}
						
					}else{
						//jQuery(opts.table_title).insertBefore(opts.tableID);
					}
				}else{
				}
			}
		}
		
		function createPagerNavigation(opts){

			if( jQuery(  opts.tableID  + opts.renderTo ).find( opts.table_bar ).size() <= 0 ){
				//nc.out('.size()'+jQuery(  opts.tableID  + opts.renderTo ).find( opts.table_bar ).size())
				//jQuery(opts.htmlPagingPager).insertAfter( opts.tableID + opts.renderTo);
				jQuery(opts.tableID + opts.renderTo).prepend(opts.htmlPagingPager );
			}
				
			
			
			/*if(opts.render == "flexigrid"){
				opts.pager = false;
			}else{
				if( opts.renderTo != '' ){
					if( jQuery(  opts.tableID  + opts.renderTo ).find( '.table_bar' ).size() < 0 ){
						jQuery(opts.htmlPagingPager).insertAfter(opts.tableID, opts.tableID + opts.renderTo);
					}
				}
				if( jQuery(opts.tableID, opts.tableID + opts.renderTo).next('.table_bar').size() <= 0){
					if(opts.pager){
						//if( jQuery(opts.tableID, opts.tableID + opts.renderTo).next(".table_bar").size() <= 0 ){
							if(opts.style == "popup"){
								jQuery(opts.htmlPagingPager).after(opts.tableID, "#facebox");
							}else{
								jQuery(opts.htmlPagingPager).insertAfter(opts.tableID, opts.tableID + opts.renderTo);
							}		
						//}
					}
				}
			}*/
		}
		
		
		function createFooter(opts){
			if( jQuery(  opts.tableID  + opts.renderTo ).find( '.vGrip' ).size() <= 0 ){
				//jQuery(opts.htmlPagingPager).insertAfter( opts.tableID + opts.renderTo);
				jQuery(opts.tableID + opts.renderTo).append(opts.vgrip );
			}
			
			// add button in table
			if(opts.addRowButton != false || opts.add != false){
				if( jQuery(  opts.tableID  + opts.renderTo ).find( '.vGrip' ).find('.button_add_wrapper').size() <= 0 ){
					jQuery(opts.tableID + opts.renderTo).find('.vGrip')
						.css({'height':'20px'})
						.append(opts.addRowHTML);
					
					jQuery('#add_row', opts.tableID  + opts.renderTo).die().on('click', function(){
						//jQuery(opts.tableID  + opts.renderTo).jqprint({ operaSupport: true });
						(!opts.addRowButton)  ? opts.add() : opts.addRowButton();
					});
				}
				
			}
			
			// add button excel in table
			if(opts.excelButton){
				if( jQuery(  opts.tableID  + opts.renderTo ).find( '.vGrip' ).find('.button_excel_wrapper').size() <= 0 ){
					jQuery(opts.tableID + opts.renderTo)
						.find('.vGrip')
						.css({'height':'20px'})
						.append(opts.convExcelHTML);
				}
				
			}
			
			// add button report in table
			if(opts.reportButton || opts.report){
				if( jQuery(  opts.tableID  + opts.renderTo ).find( '.vGrip' ).find('.button_report_wrapper').size() <= 0 ){
					jQuery(opts.tableID + opts.renderTo)
						.find('.vGrip')
						.css({'height':'20px'})
						.append(opts.reportHTML);
					
					// add function to button
					jQuery('#_report', opts.tableID  + opts.renderTo).die().on('click', function(){
						//jQuery(opts.tableID  + opts.renderTo).jqprint({ operaSupport: true });
						(!opts.reportButton)  ? opts.report() : opts.reportButton();
					});
				}
				
			}
			
			// add button in table
			if(opts.print){
				if( jQuery(  opts.tableID  + opts.renderTo ).find( '.vGrip' ).find('.button_print_wrapper').size() <= 0 ){
					jQuery(opts.tableID + opts.renderTo).find('.vGrip')
					.css({'height':'20px'})
					.append(opts.printHTML);
					
					jQuery('.button_print', opts.tableID  + opts.renderTo).die().on('click', function(){
						jQuery(opts.tableID  + opts.renderTo).jqprint({ operaSupport: true });
					}).tipsy({
						gravity: 'n',
						title: function() { return 'CETAK SENARAI INI' }
						}
					);
					
					
				}
				
			}
		} 
		
		function createTableHeaderAndContent(opts){
			var containerNavigation = "";
			if(opts.style == "popup"){
				// put response into container in facebox
				jQuery(container,"#facebox").html(opts.response);
				opts.containerNavigation = "_popup";
			}else{
				if(opts.json){
					
					jQuery(opts.tableID)
						//.fadeOut(218)
						//.delay(300)
						.empty(function(){
							/*jQuery(opts.tableID + opts.renderTo)
								.append()*/
						});  //clear out the table if it was previously populated
					
					// create table
				 	if( opts.container != "" ){
				 		//jQuery(opts.tableID).append('<table class="'+opts.tableID.substr(1,opts.tableID.length)+'"></table>');
					}else{
						
					}
				 	
				 	jQuery(opts.tableID).addClass("sortablescroll").attr("cellspacing", "0").attr("width", "100%");
				 	
				 	var thead, tbody = null;
				 	
					if(opts.render == "flexigrid"){
						jQuery(opts.tableID).append( '<tbody><tr></tr></tbody>' );
					}else{
						jQuery(opts.tableID).append( '<thead><tr></tr></thead><tbody></tbody>' );
					    thead = jQuery(opts.tableID).find( "thead tr" ); 
					    tbody = jQuery(opts.tableID).find( "tbody" );
					}
				    
					// Converts from JSON to Javascript, quickly, and is trivial.
					//var encoded = jQuery.evalJSON(opts.response);
					var encoded = jQuery.parseJSON(opts.response);
					
					// if nc.error catches error and assigned to opts.error
					if(encoded.error){
						//thead.append("<th width=\"1%\" class=\"fixed-first\">Error</th>");
						tbody.append("<tr><td class=\"\">Error loading the table</td></tr>");
						nc.alert({msg: encoded.error});
						return false;
					}else if(encoded.authorize){
						tbody.append("<tr><td class=\"\">You are not authorized. Please Login.</td></tr>");
						nc.alert({msg: encoded.authorize});
						return false;
					}

					//create the table headers
					var a = 0, rows = 0, headerCount = 0, sort = 0, filterType = 0, 
						bilColumn = "", hiddenColumn = [], tridColumn = [], printColumn = []
						,checkboxColumn = [],inputColumn = [], trid = [], actionColumn = []
						, firstColumn = [];
					
				    //add the table rows
				    jQuery(encoded.data).each(function(key, row) {
				    	
				    	// key 0 == header
				    	
				    	if( key == 0 ){
			    		if(this["totalRecords"] != undefined) opts.totalRecords = this["totalRecords"];
			    		if(this["totalPage"] != undefined) opts.totalPage = this["totalPage"];
			    		if(this["currentPage"] != undefined) opts.currentPage = this["currentPage"];
			    		if(this["maxRows"] != undefined) opts.maxRows = this["maxRows"];
			    		if(this["minRows"] != undefined) opts.minRows = this["minRows"];
				    	if(this["bilColumn"] != undefined) bilColumn = this["bilColumn"];
				    	if(this["sort"] != undefined) opts.sort = this["sort"];
				    	if(this["sortType"] != undefined) opts.sortType = this["sortType"];
				    	if(this["filterType"] != undefined) opts.filterType = this["filterType"];
				    	
				    	
				    	var headerListText = "";
			    		if(opts.render == "flexigrid"){
			    			// do nothing
						}else{
							for (var header in this["headersList"]) {
								//:TODO change to switch
								headerCount++;
								headerListText = this["headersList"][header];
								if(headerListText == 'BIL'){
									if(opts.bil){
										//headerCount--;
										firstColumn.push(headerCount);
										thead.append("<th width=\"1%\" class=\"fixed-first\">" + headerListText + "</th>");
									}
								}else if(headerListText == 'HIDE'){
									// get the column position for hiddenColumn
									hiddenColumn.push(headerCount);
									opts.hideColumn = hiddenColumn;
									headerCount--;
									// skip to hide the column
									thead.append("<th width=\"0%\" style=\"display:none;\">" + headerListText + "</th>");
								}else if(headerListText.match(/tr_id/gi) || headerListText.match(/this/gi)){
									// get the column position for trid
									//headerCount++;
									tridColumn.push(headerCount);
									opts.trColumn = tridColumn;
									headerCount--;
									// skip to hide the column
									//thead.append("<th width=\"0%\" style=\"display:none;\">" + this["headersList"][header] + "</th>");
								}else if(headerListText == 'CHECKBOX'){
									// get the column position for checkbox
									//headerCount++;
									checkboxColumn.push(headerCount);
									// skip to hide the column
									thead.append("<th width=\"1%\" sort=\"disabled\">" + opts.checkboxInput + "</th>");
								}else if(headerListText == 'PRINT__' || headerListText == 'PRINT_' || headerListText == 'PRINT'){
									// get the column position for print
									printColumn.push(headerCount);
									thead.append("<th width=\"1%\" sort=\"disabled\" >" + headerListText + "</th>");
								}else if(headerListText == 'ADD__' || headerListText == 'ADD_' || headerListText == 'ADD'){
									actionColumn.push(headerCount);
									thead.append("<th width=\"1%\" sort=\"disabled\">" + headerListText + "</th>");
								}else if(headerListText == 'DELETE__' || headerListText == 'DELETE_' || headerListText == 'DELETE'){
									actionColumn.push(headerCount);
									thead.append("<th width=\"1%\" sort=\"disabled\">" + headerListText + "</th>");
								}else if(headerListText == 'EDIT__' || headerListText == 'EDIT_' || headerListText == 'EDIT'){
									actionColumn.push(headerCount);
									thead.append("<th width=\"1%\" sort=\"disabled\">" + headerListText + "</th>");
								}
								else if(headerListText.indexOf('ZZZ') > 0){
									inputColumn.push(headerCount);
									thead.append("<th width=\"5%\" sort=\"disabled\" >" + headerListText.substring(0, headerListText.indexOf('ZZZ')) + "</th>");
								}
								else if(headerListText.match(/name/gi)){
									thead.append("<th width=\"40%\">" + headerListText + "</th>");
								}
								else if(headerListText.match(/thesis/gi)){
									thead.append("<th width=\"30%\">" + headerListText + "</th>");
								}
								else if(headerListText.match(/matric/gi)){
									thead.append("<th width=\"8%\">" + headerListText + "</th>");
								}
								else if(headerListText.match(/lecture/gi)){
									thead.append("<th width=\"40%\">" + headerListText + "</th>");
								}
								//else if(headerListText.match(/lecture/gi)){
								//	thead.append("<th width=\"40%\">" + headerListText + "</th>");
								//}
								else{
									thead.append("<th>" + headerListText + "</th>");
								}
								
								
								//  For sorted column
								if(opts.sort === ""){
									opts.sort = 0;
								}
								
								var magicNo = 2;
								//if(checkboxColumn > -1){
									//magicNo = 3;
								//}
								
				    	 		if( headerCount == (parseInt(opts.sort) + magicNo) ){
				    	 			jQuery('th:nth-child('+ (parseInt(opts.sort) + magicNo) +')', thead).addClass('headerSortDown');
				    	 		}
				    	 		
					        }
				    		
						}
			    	 	
				    	
			    		
				    	}
			    		// append the column and rows
			    		// Kena buat balik ni
			    		
				    	// key 1 == body of the table
				    	if( key == 1){
				    		
			    		var tbody = jQuery("tbody", opts.tableID), 
		    			tr = null;
			    		var hiddenColumnData = "";
			    		var printHTML = '<a onclick="printReport(\'',
			    		    printHTMLClose = '\')" href="javascript: ;"> ' +
			    						'<img border="0" src="'+nc.hostname+'/images/icon.letter.gif" title="Letter"> ' +
			    						'</a>';
			    		var deleteHTML = '<a onclick="deleteRecord(\'', deleteHTMLClose = '\')" href="javascript: ;"> ' +
    						'<img border="0" src="'+nc.hostname+'/images/icons/application_form_delete.png" title="Delete"> ' +
    						'</a>';
			    		var columnsDataListData = null;
			    		
				        for ( var data in this["columnsDataList"] ) {
				        	a++;
				        	// create a row when first column iterate 
				        	if( a == 1 ){
				        		tr = document.createElement('tr');
				        		tbody.append(tr);
				        		if(opts.paging == 'java'){
					        		if (rows % 2 == 0) jQuery(tr).addClass("odd");
								    else jQuery(tr).addClass("even");
				        		}
				        	}else if( a == bilColumn ){
				        		rows++;
				        	}
				        	opts.columnsDataList.push( this["columnsDataList"][data] );
				        	
				        	columnsDataListData = this["columnsDataList"][data];
				        	
				        	var colspan = headerCount - 1;
				        	
				        	// create column
				        	// if null record
				        	if( opts.totalRecords == 0 && columnsDataListData != "1"){
				        		jQuery(tr).append( "<td colspan=\""+colspan+"\">" + columnsDataListData + "</td>" );
				        	}else{
				        		//if( hiddenColumn > 0 ){
				        		if( jQuery.inArray(a, firstColumn) >= 0 ){
			        				// skip render
			        				// hide this
			        				if(opts.bil){
			        					jQuery(tr).append("<td class=\"fixed-first\">" + columnsDataListData + "</td>");
			        				}
			        			}
				        		else if( jQuery.inArray(a, hiddenColumn) >= 0 ){
			        				// skip render
			        				// hide this
			        				jQuery(tr).append("<td style=\"display:none;\" class=\""+((a == bilColumn)?"fixed-last":"") +"\">" 
			        					+ columnsDataListData + "</td>");
			        			}else if( jQuery.inArray(a, tridColumn) >= 0 ){
			        				// skip render
			        				// add id to tr
			        				jQuery(tr).attr('id', columnsDataListData);
			        			}else if( jQuery.inArray(a, printColumn) >= 0 ){
			        				jQuery(tr).append("<td class=\""+((a == bilColumn)?"fixed-last":"")+"\">" + printHTML + columnsDataListData + printHTMLClose + "</td>");
			        			}else if( jQuery.inArray(a, actionColumn) >= 0 ){
			        				jQuery(tr).append("<td class=\""+((a == bilColumn)?"fixed-last":"")+"\">"  + columnsDataListData  + "</td>");
			        			}else if( jQuery.inArray(a, checkboxColumn) >= 0 ){
			        				jQuery(tr).append('<td class="'+((a == bilColumn)?'fixed-last':'')+'" ><input type="checkbox" id="' + columnsDataListData +  '" ></td>');
			        			}else if( jQuery.inArray(a, inputColumn) >= 0 ){
			        				// add input html
			        				jQuery(tr).append('<td class="'+((a == bilColumn)?'fixed-last':'')+'" ><input type="text" size="10" value="" id="'+ columnsDataListData.split('---')[0] +'" data="' + columnsDataListData.split('---')[1] +  '" ></td>');
			        			}else{
			        				jQuery(tr).append("<td class=\""+((a == bilColumn)?"fixed-last":"")+"\">" + columnsDataListData + "</td>");
			        			}
				        		//}else{
				        			// or else just display all
				        			//jQuery(tr).append("<td>" + this["columnsDataList"][data] + "</td>");
				        		//}deleteColumn
				        		//if last record
				        		
				        	}
				        	
				        	
				        	
				        	if( a == bilColumn ){
				        		a = 0; 
				        	}
				        } //end for
				        
			    		
				    	}
				    });
				    
				    
				    
					var theHTML = "";
					//if(checkboxColumn > -1){
						//checkboxes(opts);
					//}
					/*jQuery.each(encoded.data, function(data, obj){
						// construct header
						if(this["columnsLabel"] != "") theHTML  = theHTML + this["columnsLabel"];
						if(this["columnsData"] != "") theHTML  = theHTML + this["columnsData"];
					})*/
				// else not json
				}else{
					// else put in container
					jQuery(opts.container).html(opts.response);
					opts.containerNavigation = "";
				}
				
			}
		}
		
		
		
		function configureTable(opts){
			try{
			if(opts.paging == "js"){
				if(opts.response != ""){
					configureTableJS(opts);
				}else{
				
				}		
				// PUT
				if(opts.style == "popup"){
					
					if(opts.elementTargeted != ""){
						// children more than 1
						jQuery(opts.tableID).children(":gt(1)").children().each(function(){
							
							/*jQuery(this).click(function(){
								//nc.out("elementTarget value"+jQuery(this).siblings(":last").children().find("a").attr("value"))
								jQuery("#name_pemantau").html(jQuery(this).siblings(":last").children().find("a").parent().prev().html());
								jQuery(opts.elementTargeted).val(jQuery(this).siblings(":last").children().find("a").attr("value"));
								jQuery.facebox.close();
							})	*/										 
						 });
					}
					
				}else{
				}	
			}else if(opts.paging == "java"){
				configureTableJava(opts);
				 
			}
			}catch(e){
				nc.err(e);
			}
		}
		
		function configureTableJS(opts){
			try{
				collapseTable(opts);
				// count all row
				jQuery(".rowBodyContent", opts.tableID).each(function(){
					opts.totalRecords += 1;
				})
					
				// ==============================================================
					if(opts.listAll){
						if(opts.render == "sortable"){
							jQuery(opts.tableID)
							.tablesorter({widgets: ["zebra"],headers:{0:{sorter: false}}})
							/*.tablesorterPager({
								container: jQuery("#pager"+opts.containerNavigation),
								page:(opts.page == 0)?opts.page:eval(opts.page)-1
							})*/
							;
							if(opts.pager){
								jQuery(opts.tableID)
								.tablesorterFilter({
									filterContainer: jQuery("#filter_box", opts.tableID + "_wrapper"),
		        					filterClearContainer: jQuery("#filter_clear_button", opts.tableID + "_wrapper"),
		                            filterCaseSensitive: false
		                         });
							}
						}else if(opts.render == "flexigrid"){
							jQuery(opts.tableID).flexigrid();	
						}
					}else{
						if(opts.render == "sortable"){
							jQuery(opts.tableID)
								.tablesorter({
									widgets: ["zebra"],
									// disable the bil sorting
									headers: {
										0:{sorter: false}
									}
								});
							if(opts.pager){
								jQuery(opts.tableID)
								.tablesorterPager({
									container: jQuery("#pager"+opts.containerNavigation),
									page:(opts.page == 0) ? opts.page : parseInt(opts.page)-1
								})
								.tablesorterFilter({
									filterContainer: jQuery("#filter_box","#pager"+opts.containerNavigation),
		        					filterClearContainer: jQuery("#filter_clear_button","#pager"+opts.containerNavigation),
		                            filterCaseSensitive: false
		                         });
							}
						}else if(opts.render == "flexigrid"){
							nc.out('flexigrid2');
							//jQuery(opts.tableID).flexigrid();	
						}
					}
					
				// ---------------------------------------Sortable Tables
				
				// BUTTON CLEAR
				if(opts.pager){
					jQuery("#filter_clear_button","#pager"+opts.containerNavigation).click(function(){
					  jQuery("#filter_box","#pager"+opts.containerNavigation).val("");
					})
				}
				
				if(opts.style == "popup"){
					if(opts.pager){
						jQuery(".pagesize","#child_pager_two"+opts.containerNavigation).val("30");
						jQuery(".pagesize","#child_pager_two"+opts.containerNavigation).change();
					}
					
				}
				
				jQuery(opts.tableID).on('doneRender', function(){
					sortBilangan(opts);
				});
			
			}catch(e){
				nc.err(e);
			}
		}
		
		
		function configureTableJava(opts){
			// ======================================
			// Paging JAVA
			
			// paging display
			jQuery('#pagedisplay', opts.tableID + opts.renderTo).val(opts.currentPage + ' / ' + opts.totalPage);
			jQuery('#detailRecord',opts.tableID + opts.renderTo).html(
					' <span class="pages min">' + opts.minRows 
					+ '</span> - <span class="pages max">' + opts.maxRows 
					+ '</span> dari <span class="pages total">' + opts.totalRecords 
					+ '</span> rekod ');
			
			jQuery('#detailRecord').find('.pages.total').digits();
			// selected
			jQuery('#select_s', opts.tableID + opts.renderTo).val(opts.filterType);
			jQuery('#pagesize', opts.tableID + opts.renderTo).val(opts.range);
			
			
			//var row = 0;
			// make odd and even rows
			/*jQuery('tbody', opts.tableID).children().each(function(row){
				if (row % 2 == 0) jQuery(this).addClass("odd");
			    else jQuery(this).addClass("even");
			});*/
			
			// LISTENER
			
			jQuery("#first, #prev, #next, #last", opts.tableID + opts.renderTo)
				.on('mouseover mouseout', function(event) {
				  if (event.type == 'mouseover') {
					  jQuery(this).css({'cursor':'pointer'});
				  } else {
					  jQuery(this).css({'cursor':'default'});
				  }
				});

			if(opts.currentPage > 1){
			  	jQuery("#first", opts.tableID + opts.renderTo).removeClass('disabled').off().on('click', function(){
					opts.currentPage = 1; 
					populate(opts); 
				});
			}else{
				jQuery("#first, #prev", opts.tableID + opts.renderTo).addClass('disabled').css({'cursor':'default'}).unbind('click');
			}
		  	
			jQuery("#prev", opts.tableID + opts.renderTo).removeClass('disabled').off().on('click', function(){ 
				if (opts.currentPage > 1) opts.currentPage -= 1; populate(opts); 
			});
			
			
			jQuery("#next", opts.tableID + opts.renderTo).removeClass('disabled').off().on('click', function(){ 
				if (parseInt(opts.currentPage) < parseInt(opts.totalPage)) opts.currentPage = parseInt(opts.currentPage) + 1;
				populate(opts);
				
			});
			
			
			if(parseInt(opts.currentPage) < parseInt(opts.totalPage)){
				jQuery("#last", opts.tableID + opts.renderTo).removeClass('disabled').off().on('click', function(){ 
					opts.currentPage = opts.totalPage; 
					populate(opts); 
				});
			}else{
				jQuery("#last , #next", opts.tableID + opts.renderTo).addClass('disabled').css({'cursor':'default'}).unbind('click');
			}
			
			if(parseInt(opts.currentPage) <= 1){
				jQuery("#first , #prev", opts.tableID + opts.renderTo).addClass('disabled').css({'cursor':'default'}).unbind('click');
			}else{
			}
			
			// bind sortup / sortdown switch class
			jQuery('thead th', opts.tableID + opts.renderTo)
				.not(':nth-child(1)')
				// sort disable for header that has attr sort disable
				.not('[sort=disabled]')
				.each(function(position){
				var headerPosition = position;
				jQuery(this) 
					.click(function(){
					jQuery('thead th', opts.tableID)
					//	jQuery(this).parent()
						.not(this).removeClass('headerSortDown');
					jQuery(this).addClass('headerSortDown');
					
					// if tridColumn  = headerSortUp
					/*if(opts.trColumn == headerPosition){
						headerPosition ++;
					}
					
					if(opts.hideColumn == headerPosition){
						headerPosition ++
					}*/
					
					// not clicked addclass headerSortUp
					opts.sort = headerPosition;
					opts.sortType = (opts.sortType == 'asc') ? 'desc' : 'asc';
					// populate back table
					populate(opts);
				});
			});
			
			jQuery(".pagesize", opts.tableID + opts.renderTo).unbind('change').bind('change', function(){ 
				opts.range = jQuery(this).val(); populate(opts); 
			});
			
			
			
			
			jQuery("select#select_s", opts.tableID + opts.renderTo).unbind('change').bind('change', function(){
				var inputBox = jQuery('#filter_box', opts.tableID + opts.renderTo);
				var selectBox = jQuery(this);
				opts.filterType = selectBox.val();
				inputBox.val("");
				opts.filter = inputBox.val();
				populate(opts);
			});
		
			var selectBox = jQuery("select#select_s", opts.tableID + opts.renderTo);
			var inputBox = jQuery('#filter_box', opts.tableID + opts.renderTo);
			
			// on select search option
			if(selectBox.find('option:selected').hasClass("date")){
					nc.calendar( inputBox, 'dd/mm/yy');
					//destroy timepicker
					
			// has 'time'
			}else if(selectBox.find('option:selected').hasClass("time")){
					//inputBox.timepicker();
					inputBox.datepicker("destroy");
			}else{
				// destroy timepicker and datepicker
				inputBox.datepicker("destroy");
				
			}
			
			//jQuery('#filter_box', opts.tableID + opts.renderTo).on('');
			var timer;				
			jQuery('#filter_box', opts.tableID + opts.renderTo).unbind('keyup change').bind('keyup change',  function(event) {
				var timerWait = 500;
				var overrideBool = false;
				var inputBox = this;
				
				if (event.keyCode == '13') {
					timerWait = 1;
					overrideBool = true;
				  }
				
				var timerCallback = function()
				{
					opts.filterType = jQuery('#select_s',  opts.tableID + opts.renderTo).val();
					opts.filter = jQuery(inputBox).val();
					populate(opts);
				}

				// Reset the timer			
				clearTimeout(timer);
				timer = setTimeout(timerCallback, timerWait);				

				return false;
			});
			
			
			
			
			jQuery("#filter_clear_button", opts.tableID + opts.renderTo).unbind('click').bind('click', function(){
				  jQuery("#filter_box", opts.tableID + opts.renderTo).val("");
				  opts.filter = "";
				  populate(opts);
			});
			
			jQuery("#refresh_button", opts.tableID + opts.renderTo).unbind('click').bind('click', function(){
				  populate(opts);
			});
			
			
			collapseTable(opts);
		}
		
		function sortBilangan(opts){
			var nthColumnBIL = 0;
			var totalPage = jQuery('#pagedisplay', opts.tableID + opts.renderTo).val();
			var indexPage = totalPage.indexOf('/');
			var currentPage = totalPage.substr(0, indexPage);
			totalPage = totalPage.substr(indexPage+1, totalPage.length);
			var $sortablescroll = jQuery('.sortablescroll');
			
			var pageSize = jQuery('.pagesize', opts.tableID + "_wrapper").val();
			
			$sortablescroll.children().each(function(i){
				// header
				var childrenTable = i;
				var instance = this;
				var totalRecord = 0;
				
				$sortablescroll.children().eq(0).children().children().each(function(j){
					if(childrenTable == 0){
						if(jQuery(this).html().toUpperCase() == 'NO'){
							
							nthColumnBIL = j+1;
							//jQuery(opts.tableID).children(':nth-child(2)').children().each(function(i){jQuery(this).prepend('<td align="center" class="">'+(i+1)+'</td>');})
						}
					}
				});
				
				var numberingPool = ((pageSize * currentPage) - pageSize) + 1;
				var numbering = 0;
				nc.out('got it'+numbering+'|'+numberingPool+'|'+totalPage+'|'+currentPage+'|'+pageSize);
				$sortablescroll.children().eq(1).children().each(function(j){
					
					numbering = numberingPool + j;
					jQuery(this).children(':nth-child('+ nthColumnBIL +')').html(numbering)
					
				});
				
			});
		}
		
		
		function highlightRow(opts){
	 		jQuery(opts.tableID).find('tbody tr').each(function(){
				// HOVER ON TR
				jQuery(this).unbind().hover(function(){
					jQuery(this).children().each(function(){
						jQuery(this).addClass('highlighted');
					})
				}, function(){
					jQuery(this).children().each(function(){
						jQuery(this).removeClass('highlighted');
					})
				});
				
				// CLICK ON TR
				//jQuery(this).toggle(function(){
					//jQuery(this).children().each(function(){jQuery(this).css('backgroundColor','#fffeee')})
				//},function(){
					//jQuery(this).children().each(function(){jQuery(this).css('backgroundColor','#fffeee')})
				//})
				
			});
			
			var nthColumnBIL = 0;
	 	}
		
		function triggerRowClick(opts){
			if(opts.rowClick != ""){
				jQuery(opts.tableID)
				.find('tbody tr')
				.on('mouseover mouseout click', function(event) {
				  if (event.type == 'mouseover') {
					  jQuery(this).css({'cursor':'pointer'});
				  } else if (event.type == 'mouseout') {
					  jQuery(this).css({'cursor':'default'});
				  } else if (event.type == 'click') {
					  // Only allows the event to trigger when element != 'a' OR 'checkbox'
			            if (event.target.nodeName != 'A' && event.target.nodeName != 'INPUT'){
			            	// get TR ID
			            	opts.rowClick( jQuery(event.target).parent().attr('id') );
			            }
				  }
				});
				
			}
		}
		
		function checkboxes(opts){
				var checkedArray = [];
				var checkedArrayTobeSent = [];
				var $thisCheckboxAll = null;
				
				
				jQuery("INPUT#select_all_checkbox", opts.tableID + opts.renderTo)
					.unbind('click')
					.bind('click', function(event) {
						event.stopPropagation();
						$thisCheckboxAll = jQuery(this);
						if( $thisCheckboxAll.attr("checked") ) {
							jQuery(opts.tableID + opts.renderTo).find('tbody tr input[type=checkbox]').each(function() {
								jQuery(this)
									.click()
									//.attr("checked", true)
									//.parents('tr').toggleClass('selection');
							});
						}else{
							jQuery(opts.tableID + opts.renderTo).find('tbody tr input[type=checkbox]').each(function() {
								jQuery(this)
									.click()
									//.attr("checked", false)
									//.parents('tr').toggleClass('selection');
								});
						}
					});
				
				
				jQuery(opts.tableID + opts.renderTo).find('tbody tr input[type=checkbox]')
				.unbind('click')
				.bind('click', function(event) {
				  // toggle class
					
					  // bubble up this checkbox action
					  event.stopPropagation();
					  // highlight row
					  jQuery(this).parents('tr').toggleClass('selection');
					  
					  // clear check on select all checkbox
					  jQuery("INPUT#select_all_checkbox",opts.tableID).attr("checked", false);
					  // empty the array first
					  checkedArray.length = 0;
					  
					  // get all checked checkboxes
					  jQuery(opts.tableID).find('input[type=checkbox]:checked').each(function(){
						  
						  // if this id not in array, push it.
						  // so, first time will 
						  // check both checkedArray(for every click), opts.checkboxArray (for every ajax called)
					  	  if( ( jQuery.inArray( jQuery(this).attr('id'), checkedArray) ) < 0 ){
					  		  if( ( jQuery.inArray( jQuery(this).attr('id'), opts.checkboxArray) ) < 0 ){
					  			 nc.out(jQuery(this).attr('id') + '<-this--not---in array--->' + opts.checkboxArray + '<-and--not---in array--->' + checkedArray + '<--add this')
						  		 // push into an array
						  		 checkedArray.push(jQuery(this).attr('id'));	
					  		}
					  	  }
					  });
					  // assign to default table checkboxArray
					  opts.checkboxArrayTemp = checkedArray;
					  //nc.out(opts.checkboxArray.length + 's' +checkedArray.length)
					  //(checkedArray.length < opts.checkboxArray.length)?( jQuery.merge(checkedArray , opts.checkboxArray )):opts.checkboxArray)
					  //var arr = (opts.checkboxArray.length == 0)?checkedArray:( jQuery.merge(checkedArray , opts.checkboxArray ));
					  // merge and make them unique
					  checkedArrayTobeSent = jQuery.merge(checkedArray , opts.checkboxArray );
					  nc.out('checkedArrayTobeSent before unique'+checkedArrayTobeSent);
					  checkedArrayTobeSent = jQuery.unique(checkedArrayTobeSent);
					  nc.out('checkedArrayTobeSent after unique'+checkedArrayTobeSent);
					  opts.checkboxes(checkedArrayTobeSent);
					  
				  
				});
				
				// when populate function was called, new set of table is called
				// so, all the checkbox that were clicked is now nuetral
				// so, we have to select back and add selection class to them.
				var checkboxTobeHighlighted = "";
				jQuery.each(opts.checkboxArray, function(i){
					checkboxTobeHighlighted += 'input[id='+opts.checkboxArray[i]+']' + ( ( i + 1 == opts.checkboxArray.length ) ? '' : ',' );
		    	});
				jQuery(opts.tableID + opts.renderTo ).find(checkboxTobeHighlighted).each(function(i){
						jQuery(this).attr("checked", true)
								.parents('tr').addClass('selection');
				  });
				
				
		}
		
		function rightClick(opts){
			//nc.out('right'+opts.rightClickMenu);
			if(opts.rightClick){
				jQuery(document).append(opts.rightClickMenu);
				jQuery( opts.tableID + opts.renderTo).find('tbody tr')
				.contextMenu({ menu: 'myMenu' }, 
				        function(action, el, pos) { nc.out('right');opts.rightClick(action, el, pos); });
				
			}
		}
		
		function rightClickHeader(opts){
			if(opts.rightClickHeader != ""){
				nc.out('rightClickHeader is right on')
				jQuery.contextMenu({
			        selector: opts.tableID + opts.renderTo, 
			        callback: function(key, options) {
			            var m = "clicked: " + key;
			            window.console && console.log(m) || alert(m); 
			        },
			        items: {
			            "edit": {name: "Edit", icon: "edit"},
			            "cut": {name: "Cut", icon: "cut"},
			            "copy": {name: "Copy", icon: "copy"},
			            "paste": {name: "Paste", icon: "paste"},
			            "delete": {name: "Delete", icon: "delete"},
			            "sep1": "---------",
			            "quit": {name: "Quit", icon: "quit"}
			        }
			    });
				
				/*jQuery(document).append(opts.rightClickMenu);
				jQuery( opts.tableID + opts.renderTo).find('thead th')
					.contextMenu({ menu: 'myMenu' }, 
						function(action, el, pos) { nc.out('right');opts.rightClickHeader(action, el, pos); });
				*/
			}
		}
		
		
		function selectRow(opts){
			if(opts.selectRow != ""){
				jQuery(opts.tableID).find('tbody tr')
				.hover(function(){jQuery(this).css({'cursor':'pointer'});},function(){jQuery(this).css({'cursor':'default'});})
				.click(function(event){
					jQuery(this).toggleClass('selection');
					opts.selectRow( jQuery(event.target).find('a, input[type=hidden]').attr('id') );
				});
			}
		}
		
		function contextMenu(opts){
			 nc.out('contextMenu')
			jQuery( document ).contextMenu({
				menu: 'tableMenu'
			},
				function(action, el, pos) {
				alert(
					'Action: ' + action + '\n\n' +
					'Element ID: ' + jQuery(el).attr('id') + '\n\n' + 
					'X: ' + pos.x + '  Y: ' + pos.y + ' (relative to element)\n\n' + 
					'X: ' + pos.docX + '  Y: ' + pos.docY+ ' (relative to document)'
					);
			});
		}
		
		function mergeCell(opts){

			//count maxTD
			//====================================================================
			var maxTDeach = 0;
			jQuery("tr td", opts.tableID).each(function(){
				maxTDeach++;
			});
			
			
			
			maxTD = 0;
			jQuery("tr", opts.tableID).each(function(){
				if( maxTD < jQuery("td",jQuery(this)).size() ) maxTD = jQuery("td",jQuery(this)).size();
			});

			//merge redundant cell
			//====================================================================
			for ( var td=1; td<maxTD+1; td++ ){
				var rowSpan = 1;
				var valStack = [];
				var stackIndex = 1;

				//phase 1: collect rowspan data
				jQuery("tr",table).each(function(){
					var crntCell = jQuery("td:nth-child("+td+")",jQuery(this));
					if(crntCell.attr("mergecell")=="") rowSpan++;
					else{
						valStack[valStack.length] = rowSpan;
						rowSpan = 1;
					}
				});

				valStack[valStack.length] = rowSpan;	//for last row

				//phase 2: implement rowspan
				jQuery("tr",table).each(function(){
					var crntCell = jQuery("td:nth-child("+td+")",jQuery(this));
					if(crntCell.attr("mergecell")=="") crntCell.hide();
					else{
						crntCell.attr("rowspan",valStack[stackIndex]);
						stackIndex++
					}
				});
			}
		}
		
		function initCollapse(){
			jQuery("img[collapseid^=btnCollapse]").each(function(){
				var matrik = jQuery(this).attr("collapseid").replace("btnCollapse","");
				jQuery(this).attr("collapse","false");
				jQuery(this).attr("src","/smp/images/tablesorter_expand2.png");
				jQuery("tr[collapseid^="+matrik+"]").hide();
				jQuery("tr[collapseid="+matrik+"]:first").show();
				jQuery("tr[collapseid="+matrik+"]:first td").each(function(){
					jQuery(this).attr("rowspan_ori",jQuery(this).attr("rowspan"));
					jQuery(this).attr("rowspan","1");
				});

				if( jQuery("tr[collapseid="+matrik+"]:first td:eq(1)").attr("rowspan_ori")=="1" ) jQuery(this).css("opacity","0.3");
			});
			jQuery("#fssContainerListing").show();
			jQuery("#fssLoading").hide();
		}


		
		function manageHeaders(opts){
			var tableHeaders = [];
			var tableHeadersValue = [];
			var inputCheckBox = '<input type="checkbox" value="" id="select_all_checkbox" title="Select All"/>';
			var indexProcess, indexEdit, indexDelete, indexSummary = 0;
			
			// ===================================================element Headers in <table>
			var $thisThead = null;
			jQuery(opts.tableID + opts.renderTo).find("thead th").each(function(i){
				
				// store common expression for speed
				$thisThead = jQuery(this);
				
				// REPLACE "_" with " " in table headers
				// dan bukan Checkbox
				if( $thisThead.html().indexOf("_DOT_") >= 0 ){
					var originalTitle = $thisThead.html();
					var title = originalTitle.split("_DOT_");
					originalTitle = "";
					
					for(var k=0; k< title.length;k++){
						originalTitle = originalTitle + title[k] + ".";
					}
					$thisThead.html(originalTitle);
				}
				
				// REPLACE "_" with " " in table headers
				// dan bukan Checkbox
				if( $thisThead.html().indexOf("_SLASH_") >= 0 ){
					var originalTitle = $thisThead.html();
					var title = originalTitle.split("_SLASH_");
					originalTitle = "";
					
					for(var k=0; k< title.length;k++){
						originalTitle = originalTitle + title[k] + "/";
					}
					$thisThead.html(originalTitle);
				}
				
				
				
				
				// REPLACE "_" with " " in table headers
				// dan bukan Checkbox
				if( $thisThead.html().indexOf("_") >= 0 && $thisThead.html() != "CHECKBOX" && $thisThead.find('input[type=checkbox]').size() <= 0  ){
					
						var originalTitle = $thisThead.html();
						var title = originalTitle.split("_");
						originalTitle = "";
						
						for(var k=0; k< title.length;k++){
							originalTitle = originalTitle + title[k] + " ";
						}
						$thisThead.html(originalTitle);
					
				}	
				
				// REPLACE "|" with "<br />" in table Headers (new line)
				if( $thisThead.html().indexOf("|") >= 0){
					var originalTitle = $thisThead.html();
					var title = originalTitle.split("|");
					originalTitle = "";
					for(var k=0; k < title.length; k++){
						originalTitle = originalTitle + title[k] + "<br />";
					}
					$thisThead.html(originalTitle);
				}	
				
				
				
				// Put in Header Array
				if( $thisThead.html() != "CHECKBOX"){
					if( $thisThead.html() != "Bil"){
					    // Ignores CATATAN and KEHADIRAN header ()
						if( $thisThead.html().indexOf("CATATAN") >= 0 &&
							$thisThead.html().indexOf("KEHADIRAN") >= 0){
							
						}else{
							tableHeadersValue[i] = i;
							var originalTitle = $thisThead.html();
							
							if( $thisThead.html().indexOf("<br>") >= 0){
								var title = $thisThead.html().split("<br>");
								originalTitle = "";
								for(var k=0; k < title.length; k++){
									originalTitle = originalTitle + title[k] + " ";
								}
							}
							tableHeaders[i] = originalTitle;
						}
					}
				}
				
				// REPLACE "CHECKBOX" with input type checkbox.
				if( $thisThead.html() == "CHECKBOX"){
					//jQuery(opts.tableID).tablesorter({headers:{i:{sorter: false}}})
					$thisThead.html(inputCheckBox);
				}
				
				
				// REPLACE "CHECKBOX" with input type checkbox.
				if( $thisThead.html() == "PROCESS"){
					 indexProcess = $thisThead.index();
				}
				
				
				
			});
			
			var thisColumn = null;
			var thisColumnHTML = null;
			// Traverse every row to do everything
			 jQuery(opts.tableID).find('tbody tr')
			    .not(':nth-child(1)')
				.each(function(columnTraversed){
					thisColumn = jQuery(this);
					if( columnTraversed == indexProcess  ){
						thisColumnHTML = thisColumn.html();
						//nc.out("index"+columnTraversed+'>'+indexProcess+thisColumnHTML);
					}
					
				});
			
			// add bil
			//jQuery(opts.tableID).children(":nth-child(1)").children().prepend("<th width="1%" class="header">BIL</th>");
			//jQuery(opts.tableID).children(":nth-child(2)").children().each(function(i){jQuery(this).prepend('<td align="center" class="">'+(i+1)+'</td>');})
			
			
			// ======================================================
			// Show hide column
			//  - attach it to table
			
			var headerHideShow = "";
			// hide and show column in table
			
			// create list
			for(var i=0; i< tableHeaders.length; i++){
				headerHideShow = headerHideShow + '<li><a href="javascript: ;" id="list-menu-link" class="list-menu-links" column="'+(i+1)+'">' + tableHeaders[i]  + '</a></li>';
			}
			
			headerHideShow = '<div id="list-column"><ul>' + headerHideShow + '</ul></div>';
			
			// Attach it
			//jQuery(opts.tableID).children(':nth-child(1)').children(':nth-child(1)').append('<th id="header-column-show">^</th>');
			//jQuery(opts.tableID).before('<div id="header-column-show">^</div>');
			//jQuery('#header-column-show', opts.container).after(headerHideShow);
			
			
			
			if( jQuery(".list-menu-links").size() > 0 ){
				// event listenr
				jQuery("#list-column").hide();
				//event listener for menu column
				jQuery("#header-column-show").click(function(){
					jQuery("#list-column").toggle();
				});
				jQuery(".list-menu-links").each(function(){
					jQuery(this).click(function(e){
						nc.out("column hide clicked")
						e.preventDefault();
						var clicked = jQuery(e.target);
						var columnClicked = clicked.attr("column");
						jQuery("td:nth-child("+columnClicked+"), th:nth-child("+columnClicked+")", opts.tableID).toggle();
					});
				});
			}
			
			// ======================================
			// PUT OPTIONS SELECT IN PAGER NAVIGATION
			
			var optionSelectSorter = "";
			//nc.out(tableHeaders.length)
			if(tableHeaders.length == 0){
				optionSelectSorter = optionSelectSorter 
				+ '<option value="-">TIADA DATA</option>';
			}else{
				for(var m=1; m<tableHeaders.length; m++){
					
					if(tableHeaders[m] !== undefined){
						//nc.out('m == opts.excludeHeader[m]' + m + '-' + opts.excludeHeader[m])
						if( jQuery.inArray(m, opts.excludeHeader) >= 0 ){
							// do nothing
							// dont render in option
						}else{
							if( tableHeaders[m] == 'HIDE' 
									|| tableHeaders[m].match(/input/gi) 
									|| tableHeaders[m].match(/print/gi)
									|| tableHeaders[m].match(/delete/gi)
									|| tableHeaders[m].match(/edit/gi)
									|| tableHeaders[m].match(/update/gi)
									|| tableHeaders[m].match(/add/gi)){
							}else if( tableHeaders[m].match(/date/gi) ){
								optionSelectSorter = optionSelectSorter 
								+ '<option class="date" value="'+tableHeadersValue[m]+'">'+tableHeaders[m]+'</option>';
							}else if( tableHeaders[m].match(/time/gi) ){
								optionSelectSorter = optionSelectSorter 
								+ '<option class="time" value="'+tableHeadersValue[m]+'">'+tableHeaders[m]+'</option>';
							}else{
								optionSelectSorter = optionSelectSorter 
								+ '<option value="'+tableHeadersValue[m]+'">'+tableHeaders[m]+'</option>';
							}
						}
					}
				}
			}
			// put it!
			jQuery("#select_s", opts.tableID + "_wrapper").html(optionSelectSorter);
			// placeholder
			jQuery("#filter_box", "#pager"+opts.containerNavigation).attr('placeholder', 'Cari ' + jQuery("#select_s option:selected", "#pager"+opts.containerNavigation).text());
			
			// bind with the select change
			jQuery("#select_s", opts.tableID + "_wrapper").change(function(){
				// clear filter input text
				jQuery("#filter_clear_button", opts.tableID + "_wrapper").click();  
				// filter by headers
				jQuery(opts.tableID).tablesorterFilter({filterColumns: [ parseInt(jQuery(this).val()) ]});
				
			});	
				
			
			// END PUT OPTIONS SELECT IN PAGER NAVIGATION
			// =========================================
			
			// ====Disable header from auto-sort
			//  Checkbox Select All
			
			
			// Handle checkboxes
			/*var $thisCheckbox = null;
			jQuery("INPUT:checkbox",opts.tableID).click( function() {
																											 
				if( !$thisCheckbox.attr("checked") ) {
					jQuery("INPUT#select_all_checkbox",opts.tableID).attr("checked", false);
				}
				
				// Highlight row Clicked	
				$thisCheckbox.parent().parent().children().each(function(){
					$thisCheckbox.toggleClass("row-clicked");
				})
				
			});*/
			
			jQuery(".shiftcheckbox").shiftcheckbox();
			
			function highlightRowSelected(src){
				var classClicked = "row-clicked";
				if(jQuery(src).parent().parent().hasClass("even")){
					classClicked = "row-clicked-even";
				}
				
				jQuery(src).parent().parent().children().each(function(){
					jQuery(src).toggleClass("row-clicked");
				})
			}
							
			
			//eachRowHighlight();
			// Handle Rows 
			// Highlight row on hover
			//function eachRowHighlight(){
			 //var thisRow =	jQuery(opts.tableID).find('tbody tr');
					//.each(function(column){
					
			// HOVER ON TR
			/*thisRow.on('mouseover mouseout', function(event) {
				  if (event.type == 'mouseover') {
				    // do something on mouseover
					  thisRow.addClass("highlighted");
				  } else {
				    // do something on mouseout
					  thisRow.removeClass("highlighted");
				  }
				});
			*/
			// CLICK ON TR
			//thisRow.click(function(){
				//jQuery(this).children().each(function(){jQuery(this).css("backgroundColor","#fffeee")})
			//});
					
				//});
			//}
			
			// Curve Corners?
			// Chrome can't cater this
			
			
			// set textarea autogrow    
			// this plugin crash in IE used elastic instead
			// update: 7/7/9 elastic also crashed in IE
			if(jQuery.browser.msie){
			  jQuery("textarea").attr("rows","2");
			}else{
			  //jQuery('textarea').autogrow({maxHeight:100});
			}
				
			
			// correct align for (blue_bar yang terkeluar ke kanan)
			// http://203.106.216.153/xampp/smf/index.php?topic=140.msg758
			//jQuery("#child_pager_two"+opts.containerNavigation).css("margin-right","20px");
			// align function
			//jQuery(".first, .prev, .next, .last, .search_s", ".pager"+opts.containerNavigation)
				//.attr("align","absmiddle")
				//.css({"margin-bottom":"3px"});
			
			jQuery("#pagedisplay", opts.tableID + opts.renderTo).attr("style","text-align:center;");
		} //end manageHeader
		
		
		function addNewRow(opts){
			
		}
		
		function dragColumn(opts){
			
		}
		
		function trackScroll(){
			// scrollbar
			if(opts.scrollbar != ""){
				//
				jQuery('#child_pager_two').hide();
				var exactHeight = jQuery("tbody", opts.tableID).height();
				
				jQuery("tbody", opts.tableID).scroll(function(){
					
					//nc.out('scrolling-'+jQuery("tbody", opts.tableID).scrollTop() +"-"+ (parseInt(exactHeight) - parseInt(opts.scrollbar)));
					if  (jQuery("tbody", opts.tableID).scrollTop() == (parseInt(exactHeight) - parseInt(opts.scrollbar)) ){
					   //lastAddedLiveFunc();
						nc.out('end');
						jQuery('.outer_table').css({'background-color':'#CCCCCC', 'opacity':'0.6', 'z-index': '100'});
					}
					
					// calculation to track scroll to the bottom of the div
					 if (myDiv.offsetHeight + myDiv.scrollTop >= myDiv.scrollHeight) {
						    scrolledToBottom();
					}
				});
				
				
				updateHeight(opts, "a");
				jQuery(document).bind('update',function(){
					updateHeight(opts, "b");
				});
				
				jQuery(opts.tableID).hover(function(){
					jQuery(this).find('tr').focus();
				}, function(){
					jQuery(this).find('tr').focusout();
				});
			}
		}
		
		function scrolledToBottom(){
			
		}
		
		function updateHeight(opts, fr){
			nc.out("updateHeight"+opts.scrollbar+jQuery("tbody", opts.tableID).height()+fr);
			if(jQuery("tbody", opts.tableID).height() <= parseInt(opts.scrollbar) ){
				jQuery("tbody", opts.tableID).css({"overflow-x":"","overflow-y":"","height":""});
			}else{
				jQuery("tbody", opts.tableID).css({"overflow-x":"hidden","overflow-y":"scroll","height":opts.scrollbar+"px"});
			}
		}
		
		
	
		
		if(opts.returnThis){
			//return opts.response;
		}
 		
		function collapseTable(opts){
			
			jQuery("#table_title", opts.tableID + opts.renderTo).each(function(){
				jQuery(this).on('mouseover mouseout', function(event) {
					  if (event.type == 'mouseover') {
						  jQuery(this).css({"background-color":"#e9e9e9","cursor":"pointer"});
					  } else {
						  jQuery(this).css({"background-color":"#ffffff","cursor":"default"});
					  }
					}).click(function(){
						 var table = jQuery(opts.tableID + opts.renderTo );
						 jQuery(opts.tableID).toggle();
						 /*if (table.is(":hidden")) {
							 table.slideUp("fast");
						 } else {
							 table.slideDown("fast");
						 }*/
					});
				/*jQuery(this).unbind().hover(function(){
					jQuery(this).css({"background-color":"#e9e9e9","cursor":"pointer"});
				},function(){
					jQuery(this).css({"background-color":"#ffffff","cursor":"default"});
				}).click(function(){
					 var table = jQuery(opts.tableID + opts.renderTo );
					 if (table.is(":hidden")) {
						 table.slideUp("fast");
					 } else {
						 table.slideDown("fast");
					 }
				});*/
			});
		}
 
			
	}, // end table
	
	
	save: function(options, container, callback){
		
		// default variable not accessible by outside
		var defaults = {
			  	id: "",
			  	userID: "",
			  	defaultValue: "",
		    	ID: "",
				ID1: "",
		    	ID2: "",
				parameter: "",
				parameter1: "",
				parameter2: "",
				parameter3: "",
				parameter4: "",
				parameter5: "",
				parameter6: "",
				parameter7: "",
				parameter8: "",
				parameter9: "",
				parameter10: "",
				parameter11: "",
				parameter12: "",
				parameter13: "",
				parameter14: "",
				parameter15: "",
				parameter16: "",
				parameter17: "",
				parameter18: "",
				parameter19: "",
				parameter20: "",
				parameter21: "",
				parameter22: "",
				parameter23: "",
				parameter24: "",
				parameter25: "",
				parameter26: "",
				parameter27: "",
				parameter28: "",
				condition: "",
				condition1: "",
				condition2: "",
				selectOption: "",
				returnThis: false,
				response: "",
				container: "",
				lookup: true,
				callback: "",
				success: "",
				style: "",
				type: "",
				checkColumn:"",
				checkColumnParam:"",
				checkColumnDateConvert:"",
				updateColumn:"",
				updateWhereColumn:"",
				updateColumnParam:"",
				updateWhereColumnParam: "",
				updateWhereColumnDateConvert: "",
				loopData:"",
				recursive:"",
				alertSuccess : true,
				showAlert: false,
				rows	: 0
		};
	
	    // Use jQuery.extend to extend options to defaults
		// Extend our default options with those provided.
		// Note that the first arg to extend is an empty object -
		// this is to keep from overriding our "defaults" object.
		var opts = jQuery.extend( {}, defaults, options );
		
		var data = "";
		var seperator = "___";
		var index = 0;
		
		//var data = nc.base.serializeData(opts, defaults, options);
		
		index = opts.parameter.indexOf(seperator);
		if(index == -1){
			opts.parameter = nc.base.typeOf(opts.parameter) + seperator + opts.parameter;
		}
		
		index = opts.parameter1.indexOf(seperator);
		if(index == -1){
			opts.parameter1 = nc.base.typeOf(opts.parameter1) + seperator + opts.parameter1;
		}
		
		index = opts.parameter2.indexOf(seperator);
		if(index == -1){
			opts.parameter2 = nc.base.typeOf(opts.parameter2) + seperator + opts.parameter2;
		}
		index = opts.parameter3.indexOf(seperator);
		if(index == -1){
			opts.parameter3 = nc.base.typeOf(opts.parameter3) + seperator + opts.parameter3;
		}
		
		index = opts.parameter4.indexOf(seperator);
		if(index == -1){
			opts.parameter4 = nc.base.typeOf(opts.parameter4) + seperator + opts.parameter4;
		}
		
		index = opts.parameter5.indexOf(seperator);
		if(index == -1){
			opts.parameter5 = nc.base.typeOf(opts.parameter5) + seperator + opts.parameter5;
		}
		
		index = opts.parameter6.indexOf(seperator);
		if(index == -1){
			opts.parameter6 = nc.base.typeOf(opts.parameter6) + seperator + opts.parameter6;
		}
		
		index = opts.parameter7.indexOf(seperator);
		if(index == -1){
			opts.parameter7 = nc.base.typeOf(opts.parameter7) + seperator + opts.parameter7;
		}
		
		index = opts.parameter8.indexOf(seperator);
		if(index == -1){
			opts.parameter8 = nc.base.typeOf(opts.parameter8) + seperator + opts.parameter8;
		}
		
		index = opts.parameter9.indexOf(seperator);
		if(index == -1){
			opts.parameter9 = nc.base.typeOf(opts.parameter9) + seperator + opts.parameter9;
		}
		
		index = opts.parameter10.indexOf(seperator);
		if(index == -1){
			opts.parameter10 = nc.base.typeOf(opts.parameter10) + seperator + opts.parameter10;
		}
		
		index = opts.parameter11.indexOf(seperator);
		if(index == -1){
			opts.parameter11 = nc.base.typeOf(opts.parameter11) + seperator + opts.parameter11;
		}
		
		index = opts.parameter12.indexOf(seperator);
		if(index == -1){
			opts.parameter12 = nc.base.typeOf(opts.parameter12) + seperator + opts.parameter12;
		}
		
		index = opts.parameter13.indexOf(seperator);
		if(index == -1){
			opts.parameter13 = nc.base.typeOf(opts.parameter13) + seperator + opts.parameter13;
		}
		index = opts.parameter14.indexOf(seperator);
		if(index == -1){
			opts.parameter14 = nc.base.typeOf(opts.parameter14) + seperator + opts.parameter14;
		}
		index = opts.parameter15.indexOf(seperator);
		if(index == -1){
			opts.parameter15 = nc.base.typeOf(opts.parameter15) + seperator + opts.parameter15;
		}
		index = opts.parameter16.indexOf(seperator);
		if(index == -1){
			opts.parameter16 = nc.base.typeOf(opts.parameter16) + seperator + opts.parameter16;
		}
		index = opts.parameter17.indexOf(seperator);
		if(index == -1){
			opts.parameter17 = nc.base.typeOf(opts.parameter17) + seperator + opts.parameter17;
		}
		index = opts.parameter18.indexOf(seperator);
		if(index == -1){
			opts.parameter18 = nc.base.typeOf(opts.parameter18) + seperator + opts.parameter18;
		}
		index = opts.parameter19.indexOf(seperator);
		if(index == -1){
			opts.parameter19 = nc.base.typeOf(opts.parameter19) + seperator + opts.parameter19;
		}
		index = opts.parameter20.indexOf(seperator);
		if(index == -1){
			opts.parameter20 = nc.base.typeOf(opts.parameter20) + seperator + opts.parameter20;
		}
		index = opts.parameter21.indexOf(seperator);
		if(index == -1){
			opts.parameter21 = nc.base.typeOf(opts.parameter21) + seperator + opts.parameter21;
		}
		index = opts.parameter22.indexOf(seperator);
		if(index == -1){
			opts.parameter22 = nc.base.typeOf(opts.parameter22) + seperator + opts.parameter22;
		}
		index = opts.parameter23.indexOf(seperator);
		if(index == -1){
			opts.parameter23 = nc.base.typeOf(opts.parameter23) + seperator + opts.parameter23;
		}
		index = opts.parameter24.indexOf(seperator);
		if(index == -1){
			opts.parameter24 = nc.base.typeOf(opts.parameter24) + seperator + opts.parameter24;
		}
		index = opts.parameter25.indexOf(seperator);
		if(index == -1){
			opts.parameter25 = nc.base.typeOf(opts.parameter25) + seperator + opts.parameter25;
		}
		
		index = opts.parameter26.indexOf(seperator);
		if(index == -1){
			opts.parameter26 = nc.base.typeOf(opts.parameter26) + seperator + opts.parameter26;
		}
		
		index = opts.parameter27.indexOf(seperator);
		if(index == -1){
			opts.parameter27 = nc.base.typeOf(opts.parameter27) + seperator + opts.parameter27;
		}
		
		
		
		// AUDIT TRAIL PURPOSE
		opts.userID = nc.people.id;
		
		// Serialize and send parameter that from user 
		//var data = nc.base.serialize(opts, defaults, options);
		
		if( opts.id != "" ){
			data = data + "id=" + opts.id;
		}
		if( opts.userID != "" ){
			data = data + "&userID=" + opts.userID;
		}
		if( opts.ID != "" ){
			data = data + "&ID=" + opts.ID;
		}
		if( opts.ID1 != "" ){
			data = data + "&ID1=" + opts.ID1;
		}
		if( opts.ID2 != "" ){
			data = data + "&ID2=" + opts.ID2;
		}
		if( options.parameter != undefined ){
			data = data + "&parameter=" + opts.parameter;
		}
		if( options.parameter1 != undefined ){
			data = data + "&parameter1=" + opts.parameter1;
		}
		if( options.parameter2 != undefined ){
			data = data + "&parameter2=" + opts.parameter2;
		}
		if( options.parameter3 != undefined ){
			data = data + "&parameter3=" + opts.parameter3;
		}
		if( options.parameter4 != undefined ){
			data = data + "&parameter4=" + opts.parameter4;
		}
		if( options.parameter5 != undefined ){
			data = data + "&parameter5=" + opts.parameter5;
		}
		if( options.parameter6 != undefined ){
			data = data + "&parameter6=" + opts.parameter6;
		}
		if( options.parameter7 != undefined ){
			data = data + "&parameter7=" + opts.parameter7;
		}
		if( options.parameter8 != undefined ){
			data = data + "&parameter8=" + opts.parameter8;
		}
		if( options.parameter9 != undefined ){
			data = data + "&parameter9=" + opts.parameter9;
		}
		if( options.parameter10 != undefined ){
			data = data + "&parameter10=" + opts.parameter10;
		}
		if( options.parameter11 != undefined ){
			data = data + "&parameter11=" + opts.parameter11;
		}
		if( options.parameter12 != undefined ){
			data = data + "&parameter12=" + opts.parameter12;
		}
		if( options.parameter13 != undefined ){
			data = data + "&parameter13=" + opts.parameter13;
		}
		if( options.parameter14 != undefined ){
			data = data + "&parameter14=" + opts.parameter14;
		}
		if( options.parameter15 != undefined ){
			data = data + "&parameter15=" + opts.parameter15;
		}
		if( options.parameter16 != undefined ){
			data = data + "&parameter16=" + opts.parameter16;
		}
		if( options.parameter17 != undefined ){
			data = data + "&parameter17=" + opts.parameter17;
		}
		if( options.parameter18 != undefined ){
			data = data + "&parameter18=" + opts.parameter18;
		}
		if( options.parameter19 != undefined ){
			data = data + "&parameter19=" + opts.parameter19;
		}
		if( options.parameter20 != undefined ){
			data = data + "&parameter20=" + opts.parameter20;
		}
		if( options.parameter21 != undefined ){
			data = data + "&parameter21=" + opts.parameter21;
		}
		if( options.parameter22 != undefined ){
			data = data + "&parameter22=" + opts.parameter22;
		}
		if( options.parameter23 != undefined ){
			data = data + "&parameter23=" + opts.parameter23;
		}
		if( options.parameter24 != undefined ){
			data = data + "&parameter24=" + opts.parameter24;
		}
		if( options.parameter25 != undefined ){
			data = data + "&parameter25=" + opts.parameter25;
		}
		if( options.parameter26 != undefined ){
			data = data + "&parameter26=" + opts.parameter26;
		}
		if( options.parameter27 != undefined ){
			data = data + "&parameter27=" + opts.parameter27;
		}
		if( opts.condition != "" ){
			data = data + "&condition=" + opts.condition;
		}
		if( opts.condition1 != "" ){
			data = data + "&condition1=" + opts.condition1;
		}
		if( opts.condition2 != "" ){
			data = data + "&condition2=" + opts.condition2;
		}
		
		if( opts.type != "" ){
			data = data + "&type=" + opts.type;
		}
		
		if( opts.recursive != "" ){
			data = data + "&recursive=" + opts.recursive;
		}
		
		if( opts.loopData != "" ){
			data = data + "&loopData=" + opts.loopData;
		}
		
		if( opts.checkColumn != "" ){
			data = data + "&checkColumn=" + opts.checkColumn;
		}
		if( opts.checkColumnParam != "" ){
			data = data + "&checkColumnParam=" + opts.checkColumnParam;
		}
		if( opts.checkColumnDateConvert != "" ){
			data = data + "&checkColumnDateConvert=" + opts.checkColumnDateConvert;
		}
		
		if( opts.updateColumn != "" ){
			data = data + "&updateColumn=" + opts.updateColumn;
		}
		if( opts.updateColumnParam != "" ){
			data = data + "&updateColumnParam=" + opts.updateColumnParam;
		}
		
		if( opts.updateWhereColumn != "" ){
			data = data + "&updateWhereColumn=" + opts.updateWhereColumn;
		}
		if( opts.updateWhereColumnParam != "" ){
			data = data + "&updateWhereColumnParam=" + opts.updateWhereColumnParam;
		}
		if( opts.updateWhereColumnDateConvert != "" ){
			data = data + "&updateWhereColumnDateConvert=" + opts.updateWhereColumnDateConvert;
		}
			
		
		
		if( opts.lookup ){
			data = data + "&container=" + opts.container;
		}
		
		data = data + "&lookup=" + opts.lookup;
    
		if( opts.container != "" ){
			container = opts.container;
		}
		
		// to make new request is a different request
		var tt = new Date();
		data = data + '&time=' + tt.getTime();

		nc.msg({msg:'Saving..'});
		// call ajax by post
		jQuery.ajax({
				type: "POST",
				mode: "abort",
				// limit abortion to this input
				port: nc.base.URL.save + data,
				url: nc.base.URL.save,
				data: data, 
				statusCode: {
				    404: function() {
				      nc.error("page not found:<br/>" + nc.base.URL.save);
				    }
				  },
				cache: false,
				success: function(msg){
					  msg = msg.substr(1, msg.length);
					// catch error and stop the ajax
					if(nc.error(msg)) return;
					
					msg = jQuery.trim(msg);  	
					opts.response = msg;

					// Converts from JSON to Javascript, quickly, and is trivial.
					//var encoded = jQuery.evalJSON(opts.response);
					var encoded = jQuery.parseJSON(opts.response);
					// if nc.error catches error and assigned to opts.error
					if(encoded.error){
						nc.alert({
							title: "Warning",
							msg: encoded.error,
							option: "error"
						});
						return false;
					}else if(encoded.authorize){
						nc.alert({msg: encoded.authorize});
						return false;
					}
					
					
					if(encoded.row == undefined){
						opts.rows = 0;
					}else{
						opts.rows = encoded.row 
					}
					/*setTimeout(function(){
						jQuery("#fancybox-overlay").click();
						(opts.callback == "" || opts.callback == undefined)?"":opts.callback(opts.response);
						(opts.success == "" || opts.success == undefined)?"":opts.success();
					},1000)
					
					setTimeout(function(){
						nc.alert2({
							msg : 'Saved..<br/><br/>',
							title : "",
							width : 300,
							overlay: true
						});
					},1000)
					*/
					
					if(opts.alertSuccess) nc.alert3({ msg : (opts.type=='delete')?'Hapus...' + opts.rows + ' rekod' :'Simpan...'+ opts.rows + ' rekod' 	});
					nc.msg({destroy:'true'});
					(opts.success == "" || opts.success == undefined) ? "" : opts.success(opts.response.split("|")[0]);
					// call callback function
					//nc.out(opts.success)
					
					
				}
		});
		
		if(opts.returnThis){
			//return opts.response;
		}


}, // end save
	
	
	// Populate Form
	populate: function(options, container, callback){
		
		// default variable not accessible by outside
		var defaults = {
				defaultValue: "",
			  	id: "",
				parameter: "",
				condition: "",
				selected: "",
				returnThis: false,
				response: "",
				container: "",
				lookup: true,
				inner_html: false,
				selectOption: true,
				callback: "",
				singleData: false,
				allValue: false,
				specialCase: "",
				page : "",
				form : "",
				international : "",
				parameter : "",
				trigger: true,
				functionCallback: true,
				success : "",
				json	:	true,
				action		:nc.base.URL.populate
				
		};
		
		// Use jQuery.extend to extend options to defaults
		// Extend our default options with those provided.
		// Note that the first arg to extend is an empty object -
		// this is to keep from overriding our "defaults" object.
		var opts = jQuery.extend({}, defaults, options);
		
		var formPopulate = "";
		
		if(opts.form == ""){
			formPopulate = "#main_form";
		}else{
			formPopulate = 'form'+opts.form;
		}
		
		var data = nc.base.serialize(opts, defaults, options);
		
		
		jQuery.ajax({
			type: "POST",
			url: opts.action,
			data: data,
			statusCode: {
			    404: function() {
			      nc.error("page not found:<br />"+opts.action);
			    }
			  },
			success: function(msg){
			
				// catch error and stop the ajax
				if(nc.error(msg)) return;
				
				// Converts from JSON to Javascript, quickly, and is trivial.
				var encoded = jQuery.secureEvalJSON(jQuery.trim(msg));
				
				var columnsData = [];
				var columnsLabel = [];
				var columnsDataRaw, columnsLabelRaw = "";
				var columnsDataArr = [], columnsLabelArr = [];
				
				var jsonPopulate="";
				//add the table rows
			    jQuery(encoded.data).each(function(key, row) {
			    	if(this["columnsLabel"] != undefined) columnsLabelArr = this["columnsLabel"];
		    		if(this["columnsData"] != undefined) columnsDataArr = this["columnsData"] ;
			    });
			   
			    var jsonObj = {};
			    
			    for(var a = 0; a < columnsLabelArr.length; a++){
			    	//jsonObj['columnsLabelArr['+a+']'] = columnsDataArr[a];
			    	jsonPopulate = jsonPopulate + '"'+columnsLabelArr[a]+'":"'+columnsDataArr[a].replace(/\n/g,'').replace(/\r/g,'').replace(/\t/g,'') +'"'+ ((a == columnsLabelArr.length)?'':',');
			    	columnsData = columnsDataArr[a];
			    }

			    jsonPopulate = jQuery.evalJSON( '{' +jsonPopulate + '}' );
			    
			    // Populate data with jQuery.populate
				jQuery(formPopulate).populate(jsonPopulate);
				
				// call callback function
				if(opts.functionCallback){
					(opts.callback == "" || opts.callback == undefined) ? "" : opts.callback();
				}
				
				(opts.success == "" || opts.success == undefined)?"":opts.success(columnsDataArr);
				
				// trigger nc.populateForm upon finished
				if(opts.trigger){
					jQuery(document).trigger('nc.populateForm');
				}
			}
		});
		
	},
	
	ajax: function(options, container, callback){
		
		// default variable not accessible by outside
		var defaults = {
				type: 'POST',
				url: "",
				data: "",
				response: "",
				success: "",
				defaultValue: "",
			  	ID: "",
				parameter: "",
				condition: "",
				selected: "",
				returnThis: false,
				response: "",
				container: "",
				dataType: "",
				lookup: true,
				inner_html: false,
				selectOption: true,
				callback: "",
				singleData: false,
				allValue: false,
				specialCase: "",
				page : "",
				form : "",
				international : "",
				parameter : "",
				trigger: true,
				functionCallback: true
				
		};
		
		var opts = jQuery.extend( {}, defaults, options );
		
		if(opts.url == ""){
			return 'please specify url';
		}
		jQuery.ajax({
			type: opts.type,
			url: nc.hostname + '/action/' + opts.url,
			data: opts.data,
			dataType : opts.dataType,
			success: function(msg){
			
				// catch error and stop the ajax
				if(nc.error(msg)) return;
				
				msg = jQuery.trim(msg);  
				opts.response = msg;
				//opts.tableID = '#' + opts.tableID;
				var feedback = "";
				feedback = opts.response.split('|')[1];
				
				/*if(feedback != ""){
					setTimeout(function(){
						nc.alert({
							title: 'Warning',
							msg: feedback,
							option: 'error'
						});
					},300)
				}*/
				
				// call callback function
				(opts.success == "" || opts.success == undefined)?"":opts.success(opts.response);
				
				//return opts.response;
			}
		});
		
		
	},
	
	// Email function
	email: function(options, container, callback){
		// default variable not accessible by outside
		var defaults = {
				type: 'POST',
				id: "",
				url: "",
				response: "",
				success: "",
				emailTo: "",
				emailCC: "",
				emailSubject: "",
				emailContent: ""
		};
		
		var opts = jQuery.extend( {}, defaults, options );
		
		var data = nc.base.serialize(opts, defaults, options);

		jQuery.ajax({
			type: opts.type,
			url: nc.base.URL.email,
			data: data,
			statusCode: {
			    404: function() {
			      //nc.error("page not found:<br />"+nc.base.URL.email);
			    }
			  },
			success: function(msg){
				
				// catch error and stop the ajax
				//if(nc.error(msg)) return;
			
				msg = jQuery.trim(msg);  
				opts.response = msg;
				var feedback = "";
				feedback = opts.response.split('|')[1];
				
				/*if(feedback != ""){
					setTimeout(function(){
						nc.alert({
							title: 'Warning',
							msg: feedback,
							option: 'error'
						});
					},300)
				}*/
				
				// call callback function
				(opts.success == "" || opts.success == undefined)?"":opts.success(opts.response);
				
			}
		});
		
		
	},
	
	autocomplete: function(options, container, callback){
	  	// Small loading
		//nc.ls(container);

		// default variable not accessible by outside
		var defaults = {
				id: "",				// SQL ID
				defaultValue: "",		// defaultValue yang akan dipilih
			  	ID: "",					//
				ID1: "",				//	== ID
				ID2: "",				//
				parameters: {},			// JSON Obj
				parameter: "",			// 
				parameter1: "",			//
				parameter2: "",			//
				parameter3: "",			//	== PARAMETER
				parameter4: "",			//
				parameter5: "",			//
				parameter6: "",			//
				condition: "",			//
				condition1: "",			//	== CONDITION
				condition2: "",			//
				selected: "",			// ??
				returnThis: false,		// return something
				response: "",			// response from traveler
				container: "",			// container of 
				lookup: false,			// if want <select>
				inner_html: false,		// inner html
				selectOption: true,    	// ??
				callback: "",			// callback function
				singleData: false,		// if don't want <select>
				allValue: false,		// If want ALL value in select 
				specialCase: "",		// SpecialCase
				selected: true,			// onSuccess, choose the first option
				notOption:false,		// emm
				language: 'BM',			// language 
				success: "",            // same as callback
				json: false,			// return type json by default
				result: ""				// result after query sql
				//formatItem : {}
				
		};
		
		// Use jQuery.extend to extend options to defaults
		// Extend our default options with those provided.
		// Note that the first arg to extend is an empty object -
		// this is to keep from overriding our "defaults" object.
		var opts = jQuery.extend({}, defaults, options);
		
		// Serialize and send parameter that from user 
		// this is to keep from sending empty parameter to the server 
		var data = nc.base.serialize(opts, defaults, options);
		
		
		
		// autocomplete city
		 jQuery(opts.container)
		 	.autocomplete(nc.base.URL.autocomplete, {
				width: (opts.width == "") ? jQuery(opts.container).attr('width') : opts.width,
				//fmultiple: true,
				matchContains: true,
				//callback: callbackFunction(row)
				formatItem:  function(data, i, total, term) {
			 		 var response = "";
					 if(opts.json){
							var encoded = jQuery.evalJSON(data);
							var theHTML = "";
							jQuery.each(encoded, function(val, text){
								theHTML = text;
							})
							response = theHTML;
							return response;
					}else{
						return data[1];
					}
				},

				formatResult: function(data, value){
					//return data[0].split('---')[1];
					return data[0];
				},
				extraParams: opts,
				callback: function(){
					// call callback function
					(opts.success == "" || opts.success == undefined)?"":opts.success(opts.response);
				}
				
			}).result(function(event, data, formatted) {
				 opts.result( data );
				});
			
		/* if (opts.result){
			 nc.out("------");
			 jQuery(opts.container).result(function(event, data, formatted) {
				 nc.out("------"+data)
				 opts.result( data );
				});
		 }*/
		
		
		if(opts.returnThis){
			//return opts.response;
		}

	}, //end autocomplete
	
	
	
	form: function(options, container, callback){
	  	// Small loading
		//nc.ls(container);

		// default variable not accessible by outside
		var defaults = {
				id: "",				// SQL ID
				form : "",				// form
				action:nc.base.URL.save,				// action
				validate: true,			// validation // default true	
				popup	: false,
				popupWrapper	: '#fancybox-wrap',
				defaultValue: "",		// defaultValue yang akan dipilih
			  	ID: "",					//
				ID1: "",				//	== ID
				ID2: "",				//
				parameters: {},			// JSON Obj
				parameter: "",			// 
				parameter1: "",			//
				parameter2: "",			//
				parameter3: "",			//	== PARAMETER
				parameter4: "",			//
				parameter5: "",			//
				parameter6: "",			//
				condition: "",			//
				condition1: "",			//	== CONDITION
				condition2: "",			//
				selected: "",			// ??
				returnThis: false,		// return something
				response: "",			// response from traveler
				container: "",			// container of 
				lookup: false,			// if want <select>
				inner_html: false,		// inner html
				selectOption: true,    	// ??
				callback: "",			// callback function
				singleData: false,		// if don't want <select>
				allValue: false,		// If want ALL value in select 
				specialCase: "",		// SpecialCase
				selected: true,			// onSuccess, choose the first option
				notOption:false,		// emm
				language: 'BM',			// language 
				success: "",            // same as callback
				json: true,				// return type json by default
				result: ""				// result after query sql
				
		};
		
		// Use jQuery.extend to extend options to defaults
		// Extend our default options with those provided.
		// Note that the first arg to extend is an empty object -
		// this is to keep from overriding our "defaults" object.
		var opts = jQuery.extend({}, defaults, options);
		
		// Serialize and send parameter that from user 
		// this is to keep from sending empty parameter to the server 
		var data = nc.base.serialize(opts, defaults, options);
		
		// jquery plugin validate
		if( opts.validate ){
			//nc.out( ((opts.popup)? opts.popupWrapper + " " : "") + "form"+opts.form)
			if ( jQuery( ((opts.popup)? opts.popupWrapper + " " : "") + "form"+opts.form).valid() ) {
				//nc.out('validate:'+jQuery( ((opts.popup)? opts.popupWrapper + " " : "") + "form"+opts.form).valid());
				//nc.out(validateThisForm(opts.form));
				save(opts);
			}
		}else{
			save(opts);
		}
		
		function generateForm(){
			
		}
		
		function save(opts){
			var dataForm = null;
			if (opts.json){
				// megat json plugin
				//dataForm =  jQuery( ((opts.popup)? opts.popupWrapper + " " : "") + "form"+opts.form).toObject();
			}else{
				dataForm = jQuery( ((opts.popup)? opts.popupWrapper + " " : "") + "form"+opts.form).serialize();
			}
			
			nc.alert3({
				msg : 'Saving your data..',
				title : ""
			});
			
			if(opts.action == 'nc.save'){
				nc.out('save'+dataForm);
				(opts.success == "" || opts.success == undefined)?"":opts.success(dataForm);
			}else{
				nc.out('ajax save too?')
				jQuery.ajax({
					type   : "POST",
					url    : nc.hostname + '/' + opts.action,
					data   : dataForm,
					success: function(msg){
					
						// catch error and stop the ajax
						if(nc.error(msg)) return;
						
						jQuery('#fancybox-inner').html('Your data saved.');
						msg = jQuery.trim(msg);
						setTimeout(function(){
							jQuery.fancybox.close();
							(opts.success == "" || opts.success == undefined) ? "" : opts.success(opts.response);
						},500);
						
					}
				});
			}
			
		}
		
			
		
		if(opts.returnThis){
			//return opts.response;
		}

		function validateThisForm(form){
			 // validation
			 jQuery.validator.messages.required = "";
			 
			 jQuery("form"+form).validate({
				 invalidHandler: function(e, validator) {
					var errors = validator.numberOfInvalids();
					if (errors) {
						nc.out('ade error');
						var message = errors == 1
							? 'Anda tertinggal 1 medan. Ia telah diterangkan di bawah'
							: 'Anda xtertinggal ' + errors + ' medan-medan.  Ia telah diterangkan dibawah';
						jQuery("div.info_popup span").html(message);
						for(var name in validator){
							if(validator[name] == 'errorList' ){
								nc.out(name +' =' +validator[name])
							}
						}
						validator.focusInvalid();
						//jQuery(window).scrollTo('#oku_no_cont', 0);
						jQuery("div.info_popup").show();
					} else {
						jQuery("div.info_popup").hide();
					}
				},
				onkeyup: false,
				submitHandler: function() {
					jQuery("div.info_popup").hide();
				}
			 });

			 jQuery("div.info_popup").hide();
			 
		}
	}, //end form
	
	
	
	data: function(options, container, callback){
	  	// Small loading
		//nc.ls(container);

		// default variable not accessible by outside
		var defaults = {
				id: "",				// SQL ID
				form : "",				// form
				action:"",				// action
				validate: true,			// validation // default true			
				defaultValue: "",		// defaultValue yang akan dipilih
			  	ID: "",					//
				ID1: "",				//	== ID
				ID2: "",				//
				parameters: {},			// JSON Obj
				parameter: "",			// 
				parameter1: "",			//
				parameter2: "",			//
				parameter3: "",			//	== PARAMETER
				parameter4: "",			//
				parameter5: "",			//
				parameter6: "",			//
				condition: "",			//
				condition1: "",			//	== CONDITION
				condition2: "",			//
				selected: "",			// ??
				returnThis: false,		// return something
				response: "",			// response from traveler
				container: "",			// container of 
				lookup: false,			// if want <select>
				inner_html: false,		// inner html
				selectOption: true,    	// ??
				callback: "",			// callback function
				singleData: false,		// if don't want <select>
				allValue: false,		// If want ALL value in select 
				specialCase: "",		// SpecialCase
				selected: true,			// onSuccess, choose the first option
				notOption:false,		// emm
				language: 'BM',			// language 
				success: "",            // same as callback
				json: true,			// return type json by default
				result: ""				// result after query sql
				
		};
		
		// Use jQuery.extend to extend options to defaults
		// Extend our default options with those provided.
		// Note that the first arg to extend is an empty object -
		// this is to keep from overriding our "defaults" object.
		var opts = jQuery.extend({}, defaults, options);
		
		// Serialize and send parameter that from user 
		// this is to keep from sending empty parameter to the server 
		var data = nc.base.serialize(opts, defaults, options);
		var output = "";
		output = init(opts);
		
		function init(opts){
			jQuery.ajax({
				type   : "POST",
				url    : nc.base.URL.data,
				data   : data,
				success: function(msg){
					// Converts from JSON to Javascript, quickly, and is trivial.
					var encoded = jQuery.evalJSON(jQuery.trim(msg));
					
					var columnsData = [];
					var columnsLabel = [];
					var columnsDataRaw, columnsLabelRaw = "";
					var jsonPopulate = "";
					
					
					
					//add the table rows
				    jQuery(encoded.data).each(function(key, row) {
			    		if(this["columnsData"] != undefined) columnsDataRaw = this["columnsData"] ;
			    		if(this["columnsLabel"] != undefined) columnsLabelRaw = this["columnsLabel"];
			    		if(this["columnsData"] != undefined) columnsData.push(this["columnsData"]) ;
				    });
				    
				    (opts.success == "" || opts.success == undefined)? "" :opts.success(columnsData);
					
					//return columnsDataRaw;
				}
			});
		}
		
		return output;
	}, //end data

	
	tab: function(options, container, callback){
		// Small loading
		//nc.ls(container);

		// default variable not accessible by outside
		var defaults = {
				id: "",				// SQL ID
				form : "",				// form
				action:"",				// action
				validate: true,			// validation // default true			
				defaultValue: "",		// defaultValue yang akan dipilih
			  	ID: "",					//
				ID1: "",				//	== ID
				ID2: "",				//
				parameters: {},			// JSON Obj
				parameter: "",			// 
				parameter1: "",			//
				parameter2: "",			//
				parameter3: "",			//	== PARAMETER
				parameter4: "",			//
				parameter5: "",			//
				parameter6: "",			//
				condition: "",			//
				condition1: "",			//	== CONDITION
				condition2: "",			//
				selected: "",			// ??
				returnThis: false,		// return something
				response: "",			// response from traveler
				container: "",			// container of 
				lookup: false,			// if want <select>
				inner_html: false,		// inner html
				selectOption: true,    	// ??
				callback: "",			// callback function
				singleData: false,		// if don't want <select>
				allValue: false,		// If want ALL value in select 
				specialCase: "",		// SpecialCase
				selected: true,			// onSuccess, choose the first option
				notOption:false,		// emm
				language: 'BM',			// language 
				success: "",            // same as callback
				json: true,			// return type json by default
				result: "",				// result after query sql
				
				tabs: [],
				
				last: ''
					
					
		};
		
		// Use jQuery.extend to extend options to defaults
		// Extend our default options with those provided.
		// Note that the first arg to extend is an empty object -
		// this is to keep from overriding our "defaults" object.
		var opts = jQuery.extend( {}, defaults, options );
		
		// Serialize and send parameter that from user 
		// this is to keep from sending empty parameter to the server 
		var data = nc.base.serialize(opts, defaults, options);
		
		_cache_tab.push(opts.url);
		//opts.tabs.push();
		
		createTab(opts);
		
		if(opts.ajax){
			jQuery.ajax({
				type: "POST",
				url: nc.base.URL.list,
				data: data,
				statusCode: {
				    404: function() {
				      nc.error("page not found"+nc.base.URL.list);
				    }
				  },
				success: function(msg){
			
					// catch error and stop the ajax
					if(nc.error(msg)) return;
					
					msg = jQuery.trim(msg);
					opts.response = msg;
					
					if(opts.json){
						renderList(opts);
					}
					
					
					
					(opts.success == "" || opts.success == undefined)?"":opts.success();
					
					// save all lookup in an array
					nc.base._cache_list[urlCache] = opts.response;
					
					//nc.base.afterLookup(opts);
					// (container == "" || container == undefined)?function(){opts.returnThis = true;}:jQuery(container).html(msg);
					// var index = opts.container.indexOf("#");
					// if(index >= 0){ opts.container = opts.container.substring(index+1, opts.container.length); opts.container = "[id="+opts.container+"]";}
					
				}
			});
		}else{
			
		}
		
		
		function createTab(opts){
			jQuery.each(_cache_tab,function(i,j){
		        /* Sequentially creating the tabs and assigning a color from the array: */
		 
		        var tmp = jQuery('<li><a href="#" class="tab '+colors[(z++%4)]+'">'+i+' <span class="left" /><span class="right" /></a></li>');
		 
		        /* Setting the page data for each hyperlink: */
		        tmp.find('a').data('page',j);
		 
		        /* Adding the tab to the UL container: */
		        jQuery('ol.breadcrumb').append(tmp);
			});
		}
		
	},
	
	
	upload: function(options, container, callback){
		
		// default variable not accessible by outside
		var defaults = {
				id			: "",						// SQL ID
				element		: jQuery('input[type=file]'),
				popup		: false,			//
				file		: '',
			  	ID			: "",					//
				ID1			: "",				//	== ID
				ID2			: "",				//
				data		: null,
				src			:null,
				attachmentReceived:'',
				parameters	: {},			// JSON Obj
				parameter	: "",			// 
				parameter1	: "",			//
				parameter2	: "",			//
				parameter3	: "",			//	== PARAMETER
				parameter4	: "",			//
				parameter5	: "",			//
				parameter6	: "",			//
				condition	: "",			//
				condition1	: "",			//	== CONDITION
				condition2	: ""			//
		};
		var datas = new FormData();
		
		/*jQuery.each(jQuery('#'+options.file)[0].files, function(i, file) {
		    datas.append('file-'+i, file);
		});*/
		
		var  htmlParameter = '';
		var excludedList = "titleShow title pagerNavigation initTime initCalendar hasNavigation hasNavigation callback htmlPagingPagerPopup htmlPagingPager success htmlTableTitle result parameters selectRow rowClick change rightClickMenu vgrip response checkboxes checkboxInput columnsDataList addRowHTML printHTML checkboxArrayTemp renderTo hasTableTitle".split(' ');
			
		for (var name in options){
			if( jQuery.inArray(name, excludedList) >= 0 ){
				// xsf
			}else{
				if(options[name] != ''){
					htmlParameter = htmlParameter + '<input type="hidden" name="'+name+'" value="'+options[name]+'" >';
				}
			}
		}
		
		jQuery('form#'+options.src).append(htmlParameter);
		nc.out(jQuery('form#'+options.src).html());
		// 1 micox method
		micoxUpload(options.src, nc.base.URL.upload, options.attachmentReceived, 'Loading..','error','', options.success);
		
		// 2 uplodify method
		 /*jQuery(opts.element, opts.container).uploadify({
			 	'uploader'  : '../../../js/uploadify/uploadify.swf',
			    'script'    : '../../../js/uploadify/uploadify.php',
			    'cancelImg' : '../../../js/uploadify/cancel.png',
			    'folder'    : '/uploads/publication',
			    'auto'      : true
			  });
		 
		 // 3 andrew valums method
		 var uploader = new qq.FileUploader({
             element: document.getElementById('file-uploader-demo1'),
             action: 'do-nothing.htm',
             debug: true
         });  
          */
		
		// Use jQuery.extend to extend options to defaults
		// Extend our default options with those provided.
		// Note that the first arg to extend is an empty object -
		// this is to keep from overriding our "defaults" object.
			opts = jQuery.extend({}, defaults, options),
		
		// Serialize and send parameter that from user 
		//var data = nc.base.serialize(opts, defaults, options);
			data = "";
			
			//data = nc.base.serialize(opts, defaults, options);
			//nc.out('ssssss'+options.src);
			
		/*
		jQuery.ajax({
			type: "POST",
			url: nc.base.URL.upload,
			data: options.data,
			contentType: false,
		    processData: false,
			statusCode: {
			    404: function() {
			      nc.error("page not found:"+nc.base.URL.upload);
			    }
			  },
			  // xhr function to see progress
					xhr: function() {
						    var interval, xhr;
						    xhr = jQuery.ajaxSettings.xhr();
						    interval = setInterval(function() {
						      var completed, percentage, total;
						      if (xhr.readyState > 2) {
						        total = parseInt(xhr.getResponseHeader('Content-length'));
						        completed = parseInt(xhr.responseText.length);
						        percentage = (100.0 / total * completed).toFixed(0);
						        //nc.msg({msg:'Loading..' +percentage + "%"});
						        jQuery('#msg_notification').html('Senarai ' + percentage + "%");
						        //return console.log("Completed " + percentage + "%");
						      }
						    }, 50);
						    return xhr;
					  },
					complete: function() {
						  	nc.msg({destroy:'true'});
						    return clearInterval(interval);
					  },
			success: function(msg){
		
				// catch error and stop the ajax
				if(nc.error(msg)) return;
				
				msg = jQuery.trim(msg);
				opts.response = msg;
				
				(opts.success == "" || opts.success == undefined)?"":opts.success();
				
			}
		});
		*/
			
		
	},
	
	uploadTemp: function(options, container, callback){
		
		// default variable not accessible by outside
		var defaults = {
				id			: "",						// SQL ID
				element		: jQuery('input[type=file]'),
				popup		: false,			//
				file		: '',
			  	ID			: "",					//
				ID1			: "",				//	== ID
				ID2			: "",				//
				data		: null,
				src			:null,
				attachmentReceived:'',
				thumb		: '',
				parameters	: {},			// JSON Obj
				parameter	: "",			// 
				parameter1	: "",			//
				parameter2	: "",			//
				parameter3	: "",			//	== PARAMETER
				parameter4	: "",			//
				parameter5	: "",			//
				parameter6	: "",			//
				condition	: "",			//
				condition1	: "",			//	== CONDITION
				condition2	: "",			//
				success		: ''
		};
		var datas = new FormData();
		
		/*jQuery.each(jQuery('#'+options.file)[0].files, function(i, file) {
		    datas.append('file-'+i, file);
		});*/
		
		var  htmlParameter = '';
		var excludedList = "titleShow title pagerNavigation initTime initCalendar hasNavigation hasNavigation callback htmlPagingPagerPopup htmlPagingPager success htmlTableTitle result parameters selectRow rowClick change rightClickMenu vgrip response checkboxes checkboxInput columnsDataList addRowHTML printHTML checkboxArrayTemp renderTo hasTableTitle".split(' ');
			
		for (var name in options){
			if( jQuery.inArray(name, excludedList) >= 0 ){
				// xsf
			}else{
				if(options[name] != ''){
					htmlParameter = htmlParameter + '<input type="hidden" name="'+name+'" value="'+options[name]+'" >';
				}
			}
		}
		
		// fade in
		jQuery(options.thumb).css({'opacity':'0.5'});
		
		//
		//nc.out(jQuery('form#'+options.src).html());
		// 1 micox method
		jQuery('form#'+options.src).append(htmlParameter);
		micoxUpload(options.src, nc.base.URL.uploadTemp, options.attachmentReceived, 'Loading..','error', '', options.success);
		nc.out('#' + options.file + jQuery('#' + options.file).val())
		setTimeout(function(){ 
			jQuery(options.thumb).attr('src', '/eJKM/uploads/' + jQuery('#' + options.file).val() );
			}
		,1000);
		jQuery(options.thumb).css({'opacity':'1'})
		/*(jQuery.trim(options.success) == "" || options.success == undefined) ? function(){
			if(jQuery(options.file).val() != ""){
				//nc.out('pictreee')
				jQuery(options.thumb).attr('src', '/eJKM/uploads/' + jQuery(options.file).val());
				jQuery(options.thumb).css({'opacity':'1'})
			}
		} : options.success();
		*/
		
		// 2 uplodify method
		 /*jQuery(opts.element, opts.container).uploadify({
			 	'uploader'  : '../../../js/uploadify/uploadify.swf',
			    'script'    : '../../../js/uploadify/uploadify.php',
			    'cancelImg' : '../../../js/uploadify/cancel.png',
			    'folder'    : '/uploads/publication',
			    'auto'      : true
			  });
		 
		 // 3 andrew valums method
		 var uploader = new qq.FileUploader({
             element: document.getElementById('file-uploader-demo1'),
             action: 'do-nothing.htm',
             debug: true
         });  
          */
		
		// 4 jquery ajax upload dawid.kr...
		/*jQuery(options.src).ajaxUpload({
			url : nc.base.URL.uploadTemp,
			name: options.element,
			onSubmit: function() {
			    //jQuery('#InfoBox').html('Uploading ... ');
			},
			onComplete: function(result) {
			    //$('#InfoBox').html('File uploaded with result' + result);
				(options.success == "" || options.success == undefined) ? "" : options.success(result);
			}
		});*/
		
		// Use jQuery.extend to extend options to defaults
		// Extend our default options with those provided.
		// Note that the first arg to extend is an empty object -
		// this is to keep from overriding our "defaults" object.
			opts = jQuery.extend({}, defaults, options),
		
		// Serialize and send parameter that from user 
		//var data = nc.base.serialize(opts, defaults, options);
			data = "";
			
			//data = nc.base.serialize(opts, defaults, options);
			//nc.out('ssssss'+options.src);
			
		/*
		jQuery.ajax({
			type: "POST",
			url: nc.base.URL.upload,
			data: options.data,
			contentType: false,
		    processData: false,
			statusCode: {
			    404: function() {
			      nc.error("page not found:"+nc.base.URL.upload);
			    }
			  },
			success: function(msg){
		
				// catch error and stop the ajax
				if(nc.error(msg)) return;
				
				msg = jQuery.trim(msg);
				opts.response = msg;
				
				(opts.success == "" || opts.success == undefined)?"":opts.success();
				
			}
		});
		*/
			
		
	},
	
	list: function(options, container, callback){
	  	// Small loading
		//nc.ls(container);

		// default variable not accessible by outside
		var defaults = {
				id: "",				// SQL ID
				defaultValue: "",		// defaultValue yang akan dipilih
			  	ID: "",					//
				ID1: "",				//	== ID
				ID2: "",				//
				parameters: {},			// JSON Obj
				parameter: "",			// 
				parameter1: "",			//
				parameter2: "",			//
				parameter3: "",			//	== PARAMETER
				parameter4: "",			//
				parameter5: "",			//
				parameter6: "",			//
				condition: "",			//
				condition1: "",			//	== CONDITION
				condition2: "",			//
				selected: "",			// ??
				returnThis: false,		// return something
				response: "",			// response from traveler
				container: "",			// container of 
				lookup: false,			// if want <select>
				inner_html: false,		// inner html
				selectOption: true,    	// ??
				callback: "",			// callback function
				singleData: false,		// if don"t want <select>
				allValue: false,		// If want ALL value in select 
				specialCase: "",		// SpecialCase
				selected: true,			// onSuccess, choose the first option
				notOption:false,		// emm
				language: "BM",			// language 
				success: "",            // same as callback
				json: "true",				// return type json
				classli: "",
				classul: "",
				cache: true
				
		};
		
		// Use jQuery.extend to extend options to defaults
		// Extend our default options with those provided.
		// Note that the first arg to extend is an empty object -
		// this is to keep from overriding our "defaults" object.
		var opts = jQuery.extend({}, defaults, options);
		
		// Serialize and send parameter that from user 
		// this is to keep from sending to the server with empty parameter
		var data = nc.base.serialize(opts, defaults, options);
		
		var urlCache = nc.base.URL.list + data;
		
		var value = null;
		// if list is uncache
		// just load it up
		if( opts.cache ){
			// to save up redundant ajax call
			value = nc.base._cache_list[urlCache];
		}
		// value from cache is not null
		if (value != null) {
			opts.response = value;
			renderList(opts);
		}else{
			
				jQuery.ajax({
					type: "POST",
					url: nc.base.URL.list,
					data: data,
					statusCode: {
					    404: function() {
					      nc.error("page not found"+nc.base.URL.list);
					    }
					  },
					success: function(msg){
				
						// catch error and stop the ajax
						if(nc.error(msg)) return;
						
						msg = jQuery.trim(msg);
						opts.response = msg;
						
						if(opts.json){
							renderList(opts);
						}
						
						
						
						(opts.success == "" || opts.success == undefined)?"":opts.success();
						
						// save all lookup in an array
						nc.base._cache_list[urlCache] = opts.response;
						
						//nc.base.afterLookup(opts);
						// (container == "" || container == undefined)?function(){opts.returnThis = true;}:jQuery(container).html(msg);
						// var index = opts.container.indexOf("#");
						// if(index >= 0){ opts.container = opts.container.substring(index+1, opts.container.length); opts.container = "[id="+opts.container+"]";}
						
					}
				});
		
		}
		
		if(opts.returnThis){
			//return opts.response;
		}

		function renderList(opts){
			// Converts from JSON to Javascript, quickly, and is trivial.
			var encoded = jQuery.evalJSON(opts.response);
			var theHTML = '<ul class="'+( (opts.classul != "")?opts.classul: "" )+'">';
			jQuery(encoded.data).each(function(key, row) {
				//nc.out('<ul value="' + this['id'] +'"><li>' + this['desc'] + '</li></ul>')
				//theHTML = theHTML + '<ul value="' + this['id'] +'"><li class="">' + this['desc'] + '</li></ul>';
				theHTML = theHTML + '<li class="'+( (opts.classli != "")?opts.classli: "" )+'" id="' + this['id'] +'">' + this['desc'] + '</li>';
				//nc.out('theHTML'+theHTML)
			});
			theHTML = theHTML + "</ul>";
			opts.response = theHTML;
			jQuery(opts.container).html(opts.response);
		}
	}, //end lookup

	count: function(options, container, callback){

		// default variable not accessible by outside
		var defaults = {
				id: "",					// SQL ID
				union: "",
				parameters: {},			// JSON Obj
				parameter: '',			// JSON Obj
				parameter1: '',			// JSON Obj
				response: "",
				success: "",            // same as callback
				json: true,				// return type json
				count: 0,
				hidden: false,
				cache: true
				
		};
		
		var opts = jQuery.extend({}, defaults, options);
		var data = nc.base.serialize(opts, defaults, options);
		var urlCache = nc.base.URL.count + data;
		
		// to save up redundant ajax call
		var value = null;
		
		if( opts.cache ) value = nc.base._cache_count[urlCache];
		
		// value from cache is
		if (value != null) {
			opts.response = value;
			var encoded = jQuery.evalJSON(opts.response);
			jQuery.each(encoded.data, function(val, text){
				jQuery("#" + this['label'] ).html(this['count']);
			});
		}else{
			
				var ncajax = jQuery.ajax({
					type: "POST",
					url: nc.base.URL.count,
					data: data,
					statusCode: {
					    404: function() {
					      nc.error("page not found:<br />"+nc.base.URL.count);
					    }
					  },
					success: function(msg){
				
						// catch error and stop the ajax
						if(nc.error(msg, ncajax)) return;
						
						msg = jQuery.trim(msg);
						opts.response = msg;
						
						if( opts.hidden ){
							
						}else{
							if(opts.json){
								var encoded = jQuery.evalJSON(opts.response);
								jQuery.each(encoded.data, function(val, text){
									jQuery("#" + this['label'] + "").html(this['count']);
									opts.count = this['count'];
								});
							}
						}
						
						
						if( opts.feedback ){
							return count;
						}
						
						(opts.success == "" || opts.success == undefined)?"":opts.success(opts.count);
						// save all lookup in an array
						nc.base._cache_count[urlCache] = opts.response;
						
						}
					
				});
		}
		
		
		
	}, //end task manager
	
	
	chart: function(options, container, callback){

		// default variable not accessible by outside
		var defaults = {
				id			: "",					// SQL ID
				union		: "",
				parameters	: {},			// JSON Obj
				response	: "",
				success		: "",            // same as callback
				json		: true,				// return type json
				type 		: 'pie',
				title		: '',
				container	: 'chart_canvas',
				xAxis		: '',
				cache		: true
				
		};
		
		var opts = jQuery.extend({}, defaults, options);
		var data = nc.base.serialize(opts, defaults, options);
		var chart;
		var objChart;
		
		jQuery.ajax({
			type: "POST",
			url: nc.base.URL.chart,
			data: data,
			statusCode: {
			    404: function() {
			      nc.error("page not found:<br />"+nc.base.URL.chart);
			    }
			  },
			success: function(msg){
		
				// catch error and stop the ajax
				if(nc.error(msg)) return;
				
				msg = jQuery.trim(msg);
				opts.response = msg;
				
				if(opts.json){
					var encoded = jQuery.evalJSON(opts.response);
					jQuery.each(encoded.data, function(val, text){
						//jQuery("#" + this['label'] + "").html(this['count']);
					});
				}
				
				makeChart(opts);
				
				(opts.success == "" || opts.success == undefined)?"":opts.success();
				// save all lookup in an array
				// nc.base._cache_array[urlCache] = opts.response;
				
				}
			
		});
		
		function makeChart(opts){
			
			var encoded = jQuery.evalJSON(opts.response);
			var dataChart = [];
			var dataRaw = null;
			
			 jQuery(encoded.data).each(function(key, row) {
			//jQuery.each(encoded.data, function(val, text){
				dataRaw = [];
			    if(this["label"] != undefined) dataRaw.push( this["label"].toString() );
			    if(this["value"] != undefined) dataRaw.push( parseFloat(this['value'])  );
				dataChart.push(dataRaw);
				
			});
			
			for(var i=0; i < dataChart.length; i++){
				nc.out(dataChart[i])
			}
			
			chart = new Highcharts.Chart({
				chart: {
					renderTo: opts.container,
					plotBackgroundColor: null,
					plotBorderWidth: null,
					plotShadow: false
				},
				title: {
					text: opts.title
				},
				series: [{
					type: opts.type,
					name: 'Browser share',
					data: dataChart
				}],
				
				//
				tooltip: {
					formatter: function() {
						return '<b>'+ this.point.name +'</b>: '+ this.y +' %';
					}
				},
				plotOptions: {
					pie: {
						allowPointSelect: true,
						cursor: 'pointer',
						dataLabels: {
							enabled: true,
							color: '#000000',
							connectorColor: '#000000',
							formatter: function() {
								return '<b>'+ this.point.name +'</b>: '+ this.y +' %';
							}
						}
					}
				}
			    
			});
		}
		 
	}, //end chart
	
	progress : function(){
		// default variable not accessible by outside
		var defaults = {
				id				: "",					// SQL ID
				union			: "",
				parameters		: {},			// JSON Obj
				response		: "",
				success			: "",            // same as callback
				steps			: 20,											// steps taken to reach target
				stepDuration	: 20,											
				max				: 100,											// Upon 100% i'd assume, but configurable
				showText		: true,											// show text with percentage in next to the progressbar? - default : true
				textFormat		: 'percentage',									// Or otherwise, set to 'fraction'
				width			: 120,											// Width of the progressbar - don't forget to adjust your image too!!!												// Image to use in the progressbar. Can be a single image too: 'images/progressbg_green.gif'
				height			: 12,											// Height of the progressbar - don't forget to adjust your image too!!!
				callback		: null,											// Calls back with the config object that has the current percentage, target percentage, current image, etc
				boxImage		: 'images/progressbar.gif',						// boxImage : image around the progress bar
				barImage		: {
									0:	'images/progressbg_red.gif',
									30: 'images/progressbg_orange.gif',
									70: 'images/progressbg_green.gif'
								},
				
				
				// Internal use
				running_value	: 0,
				value			: 0,
				image			: null
				
				
		};
		
		var opts = jQuery.extend({}, defaults, options);
		var data = nc.base.serialize(opts, defaults, options);
		
		jQuery('#progress_bar').animate({'width':opts.width+'px'},{queue:true, duration:200, easing: 'easeInQuad'})
	},
	
	report: function(options, container, callback){
	  	// Small loading
		//nc.ls(container);

		// default variable not accessible by outside
		var defaults = {
				id: "",				// SQL ID
				defaultValue: "",		// defaultValue yang akan dipilih
			  	ID: "",					//
				ID1: "",				//	== ID
				ID2: "",				//
				parameters: {},			// JSON Obj
				parameter: "",			// 
				parameter1: "",			//
				parameter2: "",			//
				parameter3: "",			//	== PARAMETER
				parameter4: "",			//
				parameter5: "",			//
				parameter6: "",			//
				condition: "",			//
				condition1: "",			//	== CONDITION
				condition2: "",			//
				selected: "",			// ??
				returnThis: false,		// return something
				response: "",			// response from traveler
				container: "",			// container of 
				lookup: false,			// if want <select>
				inner_html: false,		// inner html
				selectOption: true,    	// ??
				callback: "",			// callback function
				singleData: false,		// if don't want <select>
				allValue: false,		// If want ALL value in select 
				specialCase: "",		// SpecialCase
				selected: true,			// onSuccess, choose the first option
				notOption:false,		// emm
				language: 'BM',			// language 
				success: "",            // same as callback
				json: false,			// return type json by default
				result: ""				// result after query sql
				//formatItem : {}
				
		};
		
		// Use jQuery.extend to extend options to defaults
		// Extend our default options with those provided.
		// Note that the first arg to extend is an empty object -
		// this is to keep from overriding our "defaults" object.
		var opts = jQuery.extend({}, defaults, options);
		
		// Serialize and send parameter that from user 
		// this is to keep from sending empty parameter to the server 
		var data = nc.base.serialize(opts, defaults, options);
		
		jQuery.ajax({
			type: "POST",
			url: nc.base.URL.report,
			data: data,
			statusCode: {
			    404: function() {
			      nc.error("page not found:<br />"+nc.base.URL.array);
			    }
			  },
			success: function(msg){
		
				// catch error and stop the ajax
				if(nc.error(msg)) return;
				
				msg = jQuery.trim(msg);
				opts.response = msg;
				
				if(opts.json){
					var encoded = jQuery.evalJSON(opts.response);
					jQuery.each(encoded.data, function(val, text){
						//jQuery("#" + this['label'] + "").html(this['count']);
					});
				}
				
				makeChart(opts);
				
				(opts.success == "" || opts.success == undefined)?"":opts.success();
				// save all lookup in an array
				// nc.base._cache_array[urlCache] = opts.response;
				
				}
			
		});
		
		if(opts.returnThis){
			//return opts.response;
		}

	}, //end report
	
	view: function(options, container, callback){
	  	// Small loading
		//nc.ls(container);

		// default variable not accessible by outside
		var defaults = {
				id: "",				// SQL ID
				defaultValue: "",		// defaultValue yang akan dipilih
			  	ID: "",					//
				ID1: "",				//	== ID
				ID2: "",				//
				parameters: {},			// JSON Obj
				parameter: "",			// 
				parameter1: "",			//
				parameter2: "",			//
				parameter3: "",			//	== PARAMETER
				parameter4: "",			//
				parameter5: "",			//
				parameter6: "",			//
				condition: "",			//
				condition1: "",			//	== CONDITION
				condition2: "",			//
				selected: "",			// ??
				returnThis: false,		// return something
				response: "",			// response from traveler
				container: "",			// container of 
				lookup: false,			// if want <select>
				inner_html: false,		// inner html
				selectOption: true,    	// ??
				callback: "",			// callback function
				singleData: false,		// if don't want <select>
				allValue: false,		// If want ALL value in select 
				specialCase: "",		// SpecialCase
				selected: true,			// onSuccess, choose the first option
				notOption:false,		// emm
				language: 'BM',			// language 
				success: "",            // same as callback
				json: false,			// return type json by default
				result: ""				// result after query sql
				//formatItem : {}
				
		};
		
		// Use jQuery.extend to extend options to defaults
		// Extend our default options with those provided.
		// Note that the first arg to extend is an empty object -
		// this is to keep from overriding our "defaults" object.
		var opts = jQuery.extend({}, defaults, options);
		
		// Serialize and send parameter that from user 
		// this is to keep from sending empty parameter to the server 
		var data = nc.base.serialize(opts, defaults, options);
		
		jQuery.ajax({
			type: "POST",
			url: nc.base.URL.view,
			data: data,
			statusCode: {
			    404: function() {
			      nc.error("page not found:<br />"+nc.base.URL.view);
			    }
			  },
			success: function(msg){
		
				// catch error and stop the ajax
				if(nc.error(msg)) return;
				
				msg = jQuery.trim(msg);
				opts.response = msg;
				
				
				(opts.success == "" || opts.success == undefined)?"":opts.success(msg);
				// save all lookup in an array
				// nc.base._cache_array[urlCache] = opts.response;
				
				}
			
		});
		
		if(opts.returnThis){
			//return opts.response;
		}

	}, //end view
	
	
	// ============================
	// DATA SERIALIZATION FOR URL PARAMETER
	serialize: function( opts, defaults, options, msg ){
		var data = "";
		var count = 0;
		var excludedList = "titleShow title pagerNavigation initTime initCalendar hasNavigation hasNavigation callback htmlPagingPagerPopup htmlPagingPager success htmlTableTitle result parameters selectRow rowClick change rightClickMenu vgrip response checkboxes checkboxInput columnsDataList addRowHTML printHTML addRowButton URL".split(' ');
		
		for (var name in opts){
			// determine whether parameter in defaults being override by user or not.
			
			
			if( jQuery.inArray(name, excludedList) >= 0 ){
				// do nothing
				// Don't send function callback
			}else{
				if(opts[name] !== ""){	
					count++;
					//if(count == 1){
					//	data = data + name + '=' + opts[name];
					//}else{
						if( name == 'parameters' ){
							opts[name] = jQuery.toJSON(opts[name]);
						}
						
						//nc.out( jQuery.escape(jQuery.trim(opts[name])) )
						//data = data + ((count == 1) ? "" : '&') + name + '=' + jQuery.escape(jQuery.trim(opts[name]));
						data = data + ((count == 1) ? "" : '&') + name + '=' + opts[name];
					//}
				}
			}
		}
		
		return data;
	},
	
	serializeData: function( opts, defaults, options, msg, type ){
		var data = "";
		var count = 0;
		var index = 0;
		var seperator = '___';
		
		for (var name in opts){
			// only serialize for name 'parameter'
			index = name.indexOf('parameter');
			
			if(index != -1){	
				index = opts[name].indexOf(seperator);
				
				if(index == -1){
					opts.parameter = nc.base.typeOf(opts.parameter) + seperator + opts.parameter;
				}
				
				count++;
				if(count == 1){
					data = data + name + '=' + opts[name];
				}else{
					data = data + '&' + name + '=' + opts[name];
				}
			}
			
		} // end for
		
		return data;
	},
	
	typeOf: function(str){
			// date
			var dateRegex = /^[0-3]?[0-9]\/[01]?[0-9]\/[12][90][0-9][0-9]$/;
			// integer
			var integerRegex = new RegExp("^[-]?[0-9]+[\.]?[0-9]+$");
			// decimal
			var decimalRegex     = /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/;

			// if data is an array
			if (str.constructor.toString().indexOf("Array") > 0){
				jQuery.each(str, function(i){
					if( integerRegex.test(str[i]) ){
						type = "int";
					}else if(str[i].match(dateRegex)){
						type = "date";
					}else if(str[i].match(decimalRegex)){
						type = "int";
					}else{
						type = "str";
					}
		    	});
			
			// else
			}else{ 
				if( integerRegex.test(str) ){
					type = "int";
				}else if(str.match(dateRegex)){
					type = "date";
				}else if(str.match(decimalRegex)){
					type = "int";
				}else{
					type = "str";
				}
			}
			
			// override 
			if(str == 'sysdate'){
				type = "date";
			}
			if(str == 'seq'){
				type = "int";
			}
			if(str.length == 0){
				type = "str";
			}
			//nc.out(originalLength + '|' + newLength);
			return type;
		},
	
	
		
	_cache_lookup: {},
	_cache_language: {},
	_cache_list: {},
	_cache_count: {},
	_cache_table: {},
	_cache_tab: {},
	_cache_menu: {},
	
	htmlPagingPager : 
		'<div class="table_bar"> ' +
		'<span id="pager" class="pager"> ' +
	  	'<span style="float:left;">  ' +
	    	//'<img class="search_s" src="'+nc.hostname+'/images/icon/search_small.png"/>  ' +
				'<select id="select_s"><option>--</option></select>  ' +
			 	'<input type="text" id="filter_box" class="search" value="" maxlength="40" size="40"  />  ' +
			 	'<input type="button" id="filter_clear_button" class="reset" value="X" />' +
				//'<span class="button"><button id="filter_clear_button" type="button" value="'+UINaming[0]+'">'+UINaming[0]+'</button></span> ' +
	    '</span>  ' +
	    '<span id="child_pager_two" style="float:right">  ' +
	    		'<span id="detailRecord"></span>' +
	 			'<img class="first" src="'+nc.hostname+'/images/icon/first.png" />  ' +
				'<img class="prev" src="'+nc.hostname+'/images/icon/prev.png" />  ' +
				'<input id="pagedisplay" class="pagedisplay" type="text" size ="5" readOnly style="text-align:center;"/>  ' +
				'<img class="next" src="'+nc.hostname+'/images/icon/next.png" />  ' +
				'<img class="last" src="'+nc.hostname+'/images/icon/last.png" />  ' +
				'<select class="pagesize" > ' +
					'<option value="10" selected="selected">10</option>  ' +
					'<option value="20">20</option>  ' +
					'<option value="30">30</option>  ' +
					//'<option value="9999">Semua</option>  ' +
				'</select>  ' +
			'</span>  ' +
	   '</span>' ,
		
		// *** IGNORE THE BELOW*** - it's just there so we can always suffix our final REAL default above with a comma
		ignoremeplease: 'thankyouverymuch'	

		 
		 
		 
		 
} // END nc.base


