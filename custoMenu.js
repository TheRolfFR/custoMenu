var custoMenu = {
	functions: {},
	element: '',
	
	addMenu : function(array) {
		// append menu
		var menu = $('<ul class="custoMenu" data-name="' + array['name'] + '"></ul>').appendTo('body').hide();
		
		// for each item in array
		for(var key in array['items']) {
			// get desc 
			var desc = array['items'][key]['desc'] || key.charAt(0).toUpperCase() + key.substr(1);
			
			// append item
			menu.append('<li data-action="' + key + '" title="' + desc + '">' + array['items'][key]['text'] + '</li>');
			
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
		var ctxmenu = $('.custoMenu[data-name=' + name + ']');
		
		//display custoMenu
		ctxmenu.show().css({
			top: e.pageY + "px",
			left: e.pageX + "px"
		});

		// adjust position
		if($(window).innerHeight() - e.pageY < ctxmenu.innerHeight()) {
			ctxmenu.css('top', e.pageY-ctxmenu.innerHeight());
		}
	},
	closeMenu: function() {
		// hide menu
		$('.custoMenu').hide();
	},
	openFunction: function(element) {
		// get name of function
		var action = element.attr('data-action');
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
		return this.element.attr(attribute);
	}
}

$(document).on('contextmenu', '.custoMe', function(e){
	e.preventDefault();
	e.stopPropagation();
	custoMenu.openMenu($(this), e);
});
$(document).on('click', '.custoMenu li', function(){
	custoMenu.openFunction($(this));
});
$('body').on('click', function(e){
	custoMenu.closeMenu();
});
