$(function(){
	// 设置高度
	$("#todo .remind").css("min-height",$(window).height()-$("#todo .header").height());
	// 添加变量
	var eventarr=new Array;
	var eventnatearr= new Array;
	var importentarr= new Array;
	var natearr=new Array;
	var obj={
		// 	时间添加
		times:'',
		// 事件添加
		names:eventarr,
		// 是否已完成:0未完成，1已完成
		nate:natearr,
		// 日期内是否有事件：0无事件，1有事件
		eventnate:eventnatearr,
		// 是否是重要事件：0一般，1重要
		importent:importentarr
	}
	var arr=new Array;
	// 初始化
	function begin(){
		if(localStorage.calender){
			arr=JSON.parse(localStorage.calender);
			$.each(arr,function(i,v){
				var timeindex=i;
				var time=v;
				var timeaddinner="<div class='delete'>删除</div><div class='hua'><input type='text'><span>"+v.times+"</span></div>"
				var timeli=$("<li>").html(timeaddinner).appendTo($('#todo .time ul'));
				var eventul=$("<ul>").addClass('event').appendTo('#todo .remind');
				if(i==arr.length-1){
					eventul.addClass("now");
					timeli.addClass('now');
				}
				$.each(arr[timeindex].eventnate,function(n,m){
					if(m==1){
						var eventindex=n;
						var eventli=$("<li>").html("<div class='edit'>完成</div><div class='delete'>删除</div><div class='hua'><div class='addevent'></div><input type='text'><p>"+arr[timeindex].names[eventindex]+"</p><span class='icon import'>&#xe652;</span><span class='icon noimport'>&#xe616;</span></div>").appendTo(eventul).addClass('notimportevent');
						if((arr[timeindex].nate[n]==0)&&(arr[timeindex].importent[n]==1)){
							eventli.removeClass('notimportevent').addClass('importevent');
						}
						if(arr[timeindex].nate[n]==1){
							eventli.addClass('done');
						}
					}
					
				})
				$("<li>").html("<div class='edit'>完成</div><div class='delete'>删除</div><div class='hua'><div class='addevent'></div><input type='text'><p></p><span class='icon import'>&#xe652;</span><span class='icon noimport'>&#xe616;</span></div>").appendTo(eventul).addClass('needaddevent');
			})
		}	
		allnum();	
	}
	begin();
	// 添加时间
	function timeadd(){
		$("#todo .addtime div").on("touchend",function(){
			if(!$("#todo .time ul li").size()||!$("#todo .time ul .new").size()){
				var timeaddinner="<div class='delete'>删除</div><div class='hua'><input type='text'><span></span></div>"
				var timeli=$("<li>").html(timeaddinner).appendTo($('#todo .time ul'));
				timeli.addClass('new');
				timeli.find("input").focus();
			}
			return false;
		})
		$("#todo .time").on("touchend",".new",function(){
			$(this).find("input").focus();
		})
		$("#todo .time").on("blur","input",function(){
			var timeindex=$(this).closest('li').index();
			var parent=$(this).closest('li');
			var timeaddtext=$(this).val();
			if(timeaddtext){
				var eventarr=new Array;
				var eventnatearr= new Array;
				var importentarr= new Array;
				var natearr=new Array;
				var obj={
					// 	时间添加
					times:'',
					// 事件添加
					names:eventarr,
					// 是否已完成:0未完成，1已完成
					nate:natearr,
					// 日期内是否有事件：0无事件，1有事件
					eventnate:eventnatearr,
					// 是否是重要事件：0一般，1重要
					importent:importentarr
				}
				obj.times=timeaddtext;
				obj.names.push("");
				obj.nate.push("0");
				obj.eventnate.push("0");
				obj.importent.push("0");
				arr.push(obj);
				localStorage.calender=JSON.stringify(arr);
				$("span",$(this).closest('li')).html(timeaddtext);
				$("#todo .time .now").removeClass('now');
				parent.removeClass('new').addClass('now');
				var eventaddinner="<li class='needaddevent'><div class='edit'>完成</div><div class='delete'>删除</div><div class='hua'><div class='addevent'></div><input type='text'><p></p><span class='icon import'>&#xe652;</span><span class='icon noimport'>&#xe616;</span></div></li>";
				$("#todo .remind .now").removeClass('now');
				var newevent=$("<ul>").html(eventaddinner).addClass('event').addClass('now').appendTo($("#todo .remind"));
			}
		});
	}
	timeadd();
	// 添加事件
	function eventadd (){
		$("#todo .remind").on("touchend",".addevent",function(){
			var grendpa=$(this).closest(".event");
			var parent=$(this).closest('li');
			var eventindex=parent.index();
			var timeindex=$("#todo .time .now").index();
			if(eventindex==0){
				parent.removeClass('needaddevent').addClass('editevent');
				$("<li>").html("<div class='edit'>完成</div><div class='delete'>删除</div><div class='hua'><div class='addevent'></div><input type='text'><p></p><span class='icon import'>&#xe652;</span><span class='icon noimport'>&#xe616;</span></div>").addClass('needaddevent').appendTo(grendpa);
			}else if($("li",grendpa).eq(eventindex-1).attr('class')!='editevent'){
				parent.removeClass('needaddevent').addClass('editevent');
				$("<li>").html("<div class='edit'>完成</div><div class='delete'>删除</div><div class='hua'><div class='addevent'></div><input type='text'><p></p><span class='icon import'>&#xe652;</span><span class='icon noimport'>&#xe616;</span></div>").addClass('needaddevent').appendTo(grendpa);
			}
			parent.find("input").focus();
			return false;
		})
		$("#todo .remind").on("touchend",".editevent",function(){
			$(this).find("input").focus();
		})
		$("#todo .remind").on("blur","input",function(){
			var eventinner=$(this).val();
			var parent=$(this).closest('li');
			var timeindex=$("#todo .time .now").index();
			var eventindex=parent.index();
			if(eventinner!=""){
				arr=JSON.parse(localStorage.calender);
				arr[timeindex].names[eventindex]=eventinner;
				arr[timeindex].eventnate[eventindex]=1;
				arr[timeindex].nate[eventindex]=0;
				arr[timeindex].importent[eventindex]=0;
				localStorage.calender=JSON.stringify(arr);
				parent.removeClass("editevent").addClass('notimportevent');
				$("p",parent).text(eventinner);
				$(this).val('');
			}
			allnum();
			return false;
		})
	}
	eventadd();
	// 改变事件重要等级
	function eventimport(){
		$("#todo .remind").on("touchend",".icon",function(){
			arr=JSON.parse(localStorage.calender);
			var parent=$(this).closest('li');
			var eventindex=parent.index();
			var timeindex=$("#todo .time .now").index();
			if(arr[timeindex].importent[eventindex]=="0"){
				parent.addClass('importevent').removeClass('notimportevent');
				arr[timeindex].importent[eventindex]="1";
			}else{
				parent.addClass('notimportevent').removeClass('importevent');
				arr[timeindex].importent[eventindex]="0";
			}
			localStorage.calender=JSON.stringify(arr);
			return false;
		})
	}
	eventimport();
	// 滑动事件
	function timemove(){
		var timestratx;
		var timeendx;
		$("#todo .time").on("touchstart","li",function(e){
			timestartx=e.originalEvent.targetTouches[0].screenX;
			return false;
		})
		$("#todo .time").on("touchend","li",function(e){			
			timeendx=e.originalEvent.changedTouches[0].screenX;
			var differ=timeendx-timestartx;
			if(differ<-40){
				$(this).addClass('timemove')
			}
			if(differ>40){
				$(this).removeClass('timemove')
			}
			return false;
		})	
	}
	timemove()
	function eventmove(){
		var eventtratx;
		var eventendx;
		$("#todo .remind").on("touchstart",".event li:not('.needaddevent')",function(e){
			eventstartx=e.originalEvent.targetTouches[0].screenX;
			return false;
		})
		$("#todo .remind").on("touchend",".event li:not('.needaddevent')",function(e){			
			eventendx=e.originalEvent.changedTouches[0].screenX;
			var differ=eventendx-eventstartx;
			if(differ<-40){
				$(this).addClass('eventmove')
			}
			if(differ>40){
				$(this).removeClass('eventmove')
			}
			return false;
		})
	}
	eventmove()
	// 删除事件
	function deletetime(){
		$("#todo .time").on("touchend",".delete",function(){
			var parent=$(this).closest('li');
			var timeindex=parent.index();
			if(parent.index()>0){
				$(this).closest("ul").find("li").eq(parent.index()-1).addClass('now');
				$("#todo .remind .event").eq(timeindex-1).addClass('now')
			}
			parent.remove();
			$("#todo .remind .event").eq(timeindex).remove();
			arr=JSON.parse(localStorage.calender);
			arr.splice(timeindex,1);
			localStorage.calender=JSON.stringify(arr);
			allnum();
			return false;
		})
	}
	deletetime()
	function deleteevent(){
		$("#todo .remind").on("touchend",".delete",function(){
			var parent=$(this).closest('li');
			var timeindex=$("#todo .time .now").index();
			var eventindex=$(parent).index();
			parent.remove();
			arr=JSON.parse(localStorage.calender);
			arr[timeindex].names.splice(eventindex,1);
			arr[timeindex].nate.splice(eventindex,1);
			arr[timeindex].eventnate.splice(eventindex,1);
			arr[timeindex].importent.splice(eventindex,1);
			localStorage.calender=JSON.stringify(arr);
			allnum();
			return false;
		})
	}
	deleteevent();
	// 编辑事件是否完成
	function editFunction(){
		$("#todo .remind").on("touchend",".edit",function(){
			var parent=$(this).closest("li");
			var timeindex=$("#todo .time .now").index();
			var eventindex=$(parent).index();
			arr=JSON.parse(localStorage.calender);
			var num=arr[timeindex].nate[eventindex];
			if(num==0){
				arr[timeindex].nate[eventindex]=1;
				parent.toggleClass('done');
			}else if(num==1){
				arr[timeindex].nate[eventindex]=0;
				parent.toggleClass('done');
			}
			localStorage.calender=JSON.stringify(arr);
			parent.removeClass('eventmove');
			return false;
		})
	}
	editFunction();
	// 点击时间
	function clicktime(){
		$("#todo .time").on("touchend","li:not(.new)",function(){
			var index=$(this).index();
			if($(this).index()!=$("#todo .time .now").index()){
				$("#todo .time .now").removeClass("now");
				$(this).addClass('now');
				$("#todo .remind .now").removeClass("now");
				$("#todo .remind .event").eq(index).addClass('now');
			}
			return false;
		})
	}
	clicktime()
	// 背景样式
	function bj(){
		$("#todo .remind .bj").on("touchend",".tz",function(){
			$(this).toggleClass('slide').next().slideToggle();
			return false;
		})
		$("#todo .remind .bj").on("touchend",".yc li",function(){
			var val=$(this).text();
			switch(val){
				case "紫色":
				$("h2").css("color","#e60fff");
				break;
				case "蓝色":
				$("h2").css("color","#009cff");
				break;
				case "绿色":
				$("h2").css("color","#00ff54");
				break;
			}
			$(this).closest('.yc').slideToggle();
			$("#todo .remind .bj .slide").removeClass('slide');
		})
	}
	bj();
	// 整屏滑动
	function content(){
		var startx;
		var endx;
		$("#todo .content").on("touchstart",function(e){
			starx=e.originalEvent.targetTouches[0].screenX;
			return false;
		})
		$("#todo .content").on("touchend",function(e){			
			endx=e.originalEvent.changedTouches[0].screenX;
			var differ=endx-starx;
			if(differ<-50){
				$("#todo .remind").removeClass('remindmove');
				$("#todo .time").removeClass('timemove');
			}
			if(differ>50){
				$("#todo .remind").addClass('remindmove');
				$("#todo .time").addClass('timemove');
			}
			return false;
		})	
	}
	content();
	// 编辑
	function eidt(){
		$("#todo .header .right").on("touchend",function(){
			$("#todo .header .editdrop").slideToggle();
			return false;
		})
		$("#todo .header .editdrop").on("touchend","li",function(){
			var type=$(this).attr("type");
			switch(type){
				case "completed":
				$("#todo .remind").find('.mustblock').removeClass('mustblock');
				$("#todo .remind").find(".mustnone").removeClass('mustnone');
				$("#todo .remind").find(".needaddevent:last()").addClass('mustblock').end().find(".event").addClass('mustblock').find("li:not(.done)").addClass('mustnone');
				break;
				case "unfinished":
				$("#todo .remind").find('.mustblock').removeClass('mustblock');
				$("#todo .remind").find(".mustnone").removeClass('mustnone');
				$("#todo .remind").find(".needaddevent").addClass('mustnone').last().addClass('mustblock').end().end().find(".event").addClass('mustblock').find("li[class*=done]").addClass('mustnone');
				break;
				case "important":
				$("#todo .remind").find('.mustblock').removeClass('mustblock');
				$("#todo .remind").find(".mustnone").removeClass('mustnone');
				$("#todo .remind").find(".needaddevent:last()").addClass('mustblock').end().find(".event").addClass('mustblock').find("li:not(.importevent)").addClass('mustnone');
				break;
				case "all":
				$("#todo .remind").find('.mustblock').removeClass('mustblock');
				$("#todo .remind").find(".mustnone").removeClass('mustnone');
				$("#todo .remind").find(".needaddevent").addClass('mustnone').last().removeClass('mustnone').end().end().find(".event").addClass('mustblock');
				break;
				case "cancel":
				$("#todo .remind").find('.mustblock').removeClass('mustblock');
				$("#todo .remind").find(".mustnone").removeClass('mustnone');
				break;
			}
		})
	}
	eidt()
//// HEAD
	// 总事件数
	function allnum(){
		var num=$("#todo .remind").find(".event li").size()-$("#todo .remind").find(".event").size();
		$("#todo .remind>h2 span").text(num);
	}
})
