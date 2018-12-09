Element.prototype.querySelectorAttribute = function(selector, attribute, value) {
	let els = document.querySelectorAll(selector);
	array.forEach(element => {
		if(element.hasAttribute(attribute) && element.getAttribute(attribute) == value) {
			return element;
		}
	});
	return undefined;
}
Element.prototype.setStyle = function(object, value = '') {
	if(typeof(object) == 'object') {
		for(let key in object) {
			if(key in this.style) { this.style[key] = object[key]; }
		}
	} else {
		if(object in this.style) { this.style[object] = value; }
	}
}

let custoMenu = {
	functions: {},
	element: '',
	
	addMenu : function(array) {
		// append menu
		document.body.innerHTML = '<ul class="custoMenu" style="display: none;" data-name="' + array['name'] + '"></ul>';
		var menu = document.body.querySelectorAttribute('ul.custoMenu', 'data-name', array['name']);
		
		// for each item in array
		for(var key in array['items']) {
			// get desc 
			var desc = array['items'][key]['desc'] || key.charAt(0).toUpperCase() + key.substr(1);
			
			// append item
			menu.innerHTML += '<li data-action="' + key + '" title="' + desc + '">' + array['items'][key]['text'] + '</li>';
			
			// if defined, save function
			var func = array['items'][key]['func'];
			if(func !== undefined) {
				if(typeof func === "function") {
					this.functions[key] = func;
				}
			}
		}
	},
	openMenu : function(element, e) {
		// close all custoMenus
		this.closeMenu();
		
		// update last element
		this.upElement(element);
		
		// get name
		var name = this.getData('data-name');
		// get custoMenu
		var ctxmenu = document.body.querySelectorAttribute('ul.custoMenu', 'data-name', name);
		
		//display custoMenu
		ctxmenu.setStyle({
			display: "block",
			top: e.pageY + "px",
			left: e.pageX + "px"
		});

		// adjust position
		if(window.innerHeight - e.pageY < ctxmenu.offsetHeight) {
			ctxmenu.setStyle('top', e.pageY - ctxmenu.offsetHeight);
		}
	},
	closeMenu: function() {
		// hide menu
		document.getElementsByClassName('custoMenu').forEach(element => {
			element.style.display = "none";
		});
	},
	openFunction: function(element) {
		// get name of function
		var action = element.getAttribute('data-action');
		// if this function is defined
		if(typeof this.functions[action] === "function") {
			// execute it
			this.functions[action]();
		}
	},
	upElement: function(element) {
		//update last last clicked element
		this.element = element;
	},
	getData: function(attribute) {
		// get last clicked element attribute
		return this.element.getAttribute(attribute);
	}
}
document.addEventListener('DOMContentLoaded', function(){
	document.body.addEventListener('contextmenu', function(evt){
		let el = evt.target;
		while(el != document.body && !el.classList.contains('custoMe')) {
			el = el.parentElement;
		}

		if(el.classList.contains('custoMe')) {
			e.preventDefault();
			e.stopPropagation();
			custoMenu.openMenu(el, e);
		}
	});

	document.body.addEventListener('click', function(evt){
		let el = evt.target;
		while(el != document.body && !el.classList.contains('custoMenu') && !el.tagName == "LI") {
			el = el.parentElement;
		}

		if(el.classList.contains('custoMenu') && el.tagName == "LI") {
			custoMenu.openFunction(el);
		} else {
			custoMenu.closeMenu();
		}
	});
});