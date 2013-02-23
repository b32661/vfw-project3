/**
 *   Jeremy Criddle
 *   VFW 1302
 *   Project 2
 *  02-17-2013
 */
 
//Wait to load until DOM is ready.
window.addEventListener("DOMContentLoaded", function(){
	//getElemtntById Function
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}
	
	//Create select field element and populate it with options.
	function formatTime(){
		var formTag = document.getElementsByTagName("form"), //formTag is an array of all the form tags.
			selectLi = $('select'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "groups");
		for(var i=0, j=contactGroups.length; i<j; i++){
				var makeOption = document.createElement('option');
				var optText = contactGroups[i];
				makeOption.setAttribute("value", optText);
				makeOption.innerHTML = optText;
				makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
		
	}
	
	//Find value of selected radio button.
	function getSelectedRadio(){
		var radios = document.forms[0].timeFormater;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
				preferred = radios[i].value;
			}
		}
	}
		
	function toggleControls(n){
		switch(n){
			case "on":
				$('stomper').style.display = "none";
				$('clear').style.display = "inline";
				$('displayIt').style.display = "none";
				$('addNew').style.display = "inline";
				break;
			case "off":
				$('stomper').style.display = "block";
				$('clear').style.display = "inline";
				$('displayIt').style.display = "inline";
				$('addNew').style.display = "none";
				$('items').style.display = "none";
				break;
			default:
				return false;
		}
	}
	
	function storeData(){
		var id = Math.floor(Math.random()*100000001);
		//Gather up all our form field values and store them in an object. Object properties contain array with the form label and input value
		getSelectedRadio();
		var item = {};
			item.group = ["Group:", $('groups').value];
			item.sure = ["Sure:", $('sure').value];
			item.preFormat = ["Format:", preferred];
			item.eventName = ["Name:", $('eventName').value];
			item.eventDescription = ["Description:", $('eventDescription').value];
			item.eventTime = ["Time:", $('eventTime').value];
			item.eventDate = ["Date:", $('eventDate').value];
		//Save data into Local Storage: Use Stringify to convert our object to a string.
		localStorage.setItem(id, JSON.stringify(item));
		alert("Timestomp was sucessful!");
		window.location.reload();
		}
	
	function getData(){
		toggleControls("on");
		if(localStorage.length === 0){
			alert("There are no Stomped times to display.");
			window.location.reload();
		}
		//Write Data from Local Storage to the browser.
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('items').style.display = "block";
		for(var i=0, len=localStorage.length; i<len; i++){
			var makeLi = document.createElement('li');
			var linksLi = document.createElement('li');
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//convert the string from local storage value back to an object by using JSON.parse()
			var obj = JSON.parse(value);			
			var makeSubList = document.createElement('ul');
			makeLi.appendChild(makeSubList);
			for(var n in obj){
				var makeSubli = document.createElement('li')
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild(linksLi)
	}
			makeItemLinks(localStorage.key(i), linksLi);
	}
		
	}
	
	function makeItemLinks(key, linksLi){
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Stomp";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);
		
		var deleteLink = document.createElement('a')
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Stomp";
		//deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
				
	}
	
	function editItem(){
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		toggleControls("off");
		
		$('groups').value = item.group[1];
		$('sure').value = item.sure[1];
		var radios = document.forms[0].timeFormater;
		for(var i=0; i<radios.length; i++){
			if(radios[i].value == "standard" && item.preFormat[1] == "standard"){
				radios[i].setAttribute("checked", "checked");
			} else if(radios[i].value == "military" && item.preFormat[1] == "military"){
				radios[i].setAttribute("checked	", "checked");	
			}
		}		
		$('eventName').value = item.eventName[1];
		$('eventDescription').value = item.eventDescription[1];
		$('eventDate').value = item.eventDate[1];
		$('eventTime').value = item.eventTime[1];		
		
	}
	
	function clearLocal(){
		if(localStorage.length === 0){
			alert("There is no data to clear.");
		}else{
			localStorage.clear();
			alert("All contacts are deleted!");
			window.location.reload();
			return false;
		}
		
	}
		
	// Variable defaults
	var contactGroups = ["--Choose A Group--", "Start", "End", "Arrival", "Departure" ],
	preferred ;
	
	formatTime();
	
	//set link $ submit click events
	var displayLink = $('displayIt');
	displayLink.addEventListener("click", getData);
	var clearLink = $('clear');
	clearLink.addEventListener("click", clearLocal);
	var save = $('stomp');
	save.addEventListener("click", storeData);
	
});