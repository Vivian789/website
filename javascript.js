$(document).ready(init);
console.log('asdf')
var index = 0;
var footerPosition;
var aboutPosition;
var projectsPosition;
var skillsPosition;
var contactPosition;

function init(){
	$("#parallax").scroll(elevatortabs);
	bottomPosition = $('#footer')[0].scrollHeight + $('#footer').height();
	footerPosition = $("#footer").offset().top;
	aboutPosition = $("#about").offset().top;
	projectsPosition = $("#projects").offset().top;
	skillsPosition = $("#skills").offset().top;
	contactPosition = $("#contact").offset().top;
	$("#leftarrow").on("click", leftarrow);
	$("#rightarrow").on("click", rightarrow);
	index = 0;
	var i = 0;
	projectimage.forEach(function(image){
		$("#project-index-row").append("<div class = 'project-index-icon' id = 'project" + i +"'><img src =" + image + " height = '125' width = '185' ></div>");
		eval('var func = function(){switchProjectViewTo(' + i + ');};');
		$("#project"+i).on("click", func);
		i++;
	})
	initdraw();
	console.log('init')
}

var finalNameText = "> Vivian Lo";
var finalDescript = "Developer";
var currentTextIndex = 0;

function initdraw(){
	var c = document.getElementById("canvas");
	var ctx = c.getContext("2d");
	ctx.canvas.width  = window.innerWidth;
 	ctx.canvas.height = window.innerHeight;
	ctx.font = "100px Arial";
	ctx.fillStyle = "#f5f4fb";
	ctx.strokeStyle = "#f5f4fb";
	calldraw();
}

function calldraw(){
	window.requestAnimationFrame(draw);
}

function draw(){
	var c = document.getElementById("canvas");
	var ctx = c.getContext("2d");
	currentTextIndex ++;
	if(currentTextIndex <= finalNameText.length){
		var currentText = finalNameText.slice(0, currentTextIndex);
		ctx.strokeText(currentText, canvas.width/2, canvas.height/2);
		setTimeout(calldraw, 100);
	}else if(currentTextIndex <= finalNameText.length + finalDescript.length){
		var currentText = finalDescript.slice(0, currentTextIndex - finalNameText.length);
		ctx.font = "50px Arial";
		ctx.fillText(currentText, canvas.width/2+ 100, canvas.height/2 + 70);

		setTimeout(calldraw, 50);
	}
}


function switchProjectViewTo(projectNumber){
	$("#project-image").hide().html(getNewProjectHTML(projectlink[projectNumber], projectimage[projectNumber])).fadeIn();
	$("#project-text").hide().html(projecttext[projectNumber]).fadeIn();
}

var projectimage = ["http://vivian-lo.com/tetris.png",
];
var projecttext = ["Tetris Me",];
var projectlink = ["https://tetrisme.herokuapp.com",];

function getNewProjectHTML(link, image){
	return "<a href = " + link + " target = '_blank'><img src = " + image + " height = '500' width = '700'></a>";
}

function leftarrow(){
	index -= 1;
	if (index < 0){
		index  = projectimage.length -1;
	}
	switchProjectViewTo(index);
}

function rightarrow(){
	index +=1;
	if (index > projectimage.length -1){
		index  = 0;
	}
	switchProjectViewTo(index);
}

function elevatortabs(){
	var homePosition = 0;
	var currentPosition = $("#parallax").scrollTop();
	var scrollPercentage = (currentPosition/bottomPosition) * 100;
	$(".progressBar").css("top", (scrollPercentage - 5) + "%");
	if(scrollPercentage < 10){
		$("aside").fadeOut();
	}else{
		$("aside").fadeIn();
	}
	$("#nav-home").removeClass("hovered");
	$("#nav-about").removeClass("hovered");
	$("#nav-projects").removeClass("hovered");
	$("#nav-skills").removeClass("hovered");
	$("#nav-contact").removeClass("hovered");
	if(currentPosition + (contactPosition/10) <= aboutPosition){
		$("#nav-home").addClass("hovered");
	}else if(currentPosition + (contactPosition/10)<= projectsPosition){
		$("#nav-about").addClass("hovered");
	}else if(currentPosition +(contactPosition/10)<= skillsPosition){
		$("#nav-projects").addClass("hovered");
	}else if(currentPosition + (contactPosition/10)<= contactPosition){
		$("#nav-skills").addClass("hovered");
	}else{
		$("#nav-contact").addClass("hovered");			
	}
}