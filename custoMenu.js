Document.prototype.querySelectorAttribute = function(selector, attribute, value) {
	let els = document.querySelectorAll(selector);

	for (let i = 0; i < els.length; i++) {
		const element = els[i];
		if(element.hasAttribute(attribute) && element.getAttribute(attribute) == value) {
			return element;
		}
	}
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
Element.prototype.appendHTML = function(str) {
  var div = document.createElement('div');
  div.innerHTML = str;
  while (div.children.length > 0) {
    this.appendChild(div.children[0]);
  }
}

let custoMenu = {
	functions: {},
	element: '',
	
	addMenu : function(parameters) {
		// append menu
		const requiredparameters = ['name', 'file'];
		for(let key in requiredparameters) {
			if(!(key in parameters)) {
				console.error(key + ' key is required to initialize your custoMenu : ', parameters);
				return null;
			}
		}
		document.body.appendHTML('<ul class="custoMenu" style="display: none;" data-name="' + parameters.name + '"></ul>');
		menu = document.body.lastElementChild;
		
		// for each item in parameters
		for(let key in parameters.items) {
			// required parameters for items
			const requiredparametersitems = ['text', 'func'];
			for(let prop in requiredparametersitems.items[key]) {
				if(!(prop in parameters.items[key])) {
					console.error(prop + 'key is required to initialize your custoMenu item : ', parameters.items[key]);
					return;
				}
			}

			// func required method
			if(typeof parameters.items[key].func == 'string' && !('objectfunction' in requiredparametersitems.items[key])) {
				console.error('if you are using a string parameter for func, you nee to specify the object related');
				return;
			}
	
			// desc return description or captilized key
			let desc = parameters.items[key].desc || key.charAt(0).toUpperCase() + key.substr(1);
			
			// append item
			menu.appendHTML('<li data-action="' + key + '" title="' + desc + '">' + parameters.items[key].text + '</li>');
			
			// adding functions
			let object = {
				func: parameters.items[key].func
			};
			if('objectfunc' in parameters.items[key]) {
				object.objectfunction = parameters.items[key].objectfunction;
			}
			this.functions[key] = object;
		}
	},
	openMenu : function(element, e) {
		// close all custoMenus
		this.closeMenu();
		
		// update last element
		this.upElement(element);
		
		// get name
		let name = this.getData('data-name');
		// get custoMenu
		let ctxmenu = document.querySelectorAttribute('ul.custoMenu', 'data-name', name);
		
		//display custoMenu
		ctxmenu.setStyle({
			display: "block",
			top: e.pageY + "px",
			left: e.pageX + "px"
		});

		// adjust position
		if(e.pageY + ctxmenu.offsetHeight > window.innerHeight) {
			ctxmenu.setStyle('top', e.pageY - ctxmenu.offsetHeight);
		}
	},
	closeMenu: function() {
		// hide menu
		let menus = document.getElementsByClassName('custoMenu');
		for (let i = 0; i < menus.length; i++) {
			menus[i].setStyle('display', 'none');
		}
	},
	openFunction: function(element) {
		// get name of function
		let action = element.getAttribute('data-action');
		// if this function is defined
		if(typeof this.functions[action].func === "function") {
			// execute it
			this.functions[action].func();
		} else {
			this.functions[action].objectfunction[this.functions[action].func]();
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
			evt.preventDefault();
			evt.stopPropagation();
			custoMenu.openMenu(el, evt);
		}
	});

	document.body.addEventListener('click', function(evt){
		let el = evt.target;
		while(el != document.body && !el.parentElement.classList.contains('custoMenu') && el.tagName != "LI") {
			el = el.parentElement;
		}

		custoMenu.closeMenu();
		if(el.parentElement.classList.contains('custoMenu') && el.tagName == "LI") {
			custoMenu.openFunction(el);
		}
	});
}, false);