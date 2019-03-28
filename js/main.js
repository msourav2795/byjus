function toggleBodyLoader(){ //function to blink the loader(logo)
	document.getElementById("body").style.display="block";
	setTimeout(function(){ 
		document.getElementById("loader").style.display="none";
	}, 1000);	
}
function showList(){
	document.getElementById("secondList").style.display="block";
}
function showTable(){ //function to display course data
	document.getElementById("features").style.display="block";
		document.getElementById("dataTable").style.display="block";
}
