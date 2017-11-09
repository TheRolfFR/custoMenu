var custoMenu = {
	functions: {},
	element: '',
	
	addMenu : function(array) {
		var menu = $('<ul class="custoMenu" data-name="' + array[0] + '"></ul>').appendTo('body').hide();
		
		for(var key in array) {
			if(isNaN(parseInt(key))) {
				var desc = array[key]['desc'] || ucfirst(key);
				menu.append('<li data-action="' + key + '" title="' + desc + '">' + array[key]['text'] + '</li>');
				if(array[key]['func'] !== undefined) {
					if(typeof array[key]['func'] === "function") {
						this.functions[key] = array[key]['func'];
					}
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
		$('.custoMenu').hide();
	},
	openFunction: function(element) {
		var action = element.attr('data-action');
		if(typeof this.functions[action] === "function") {
			this.functions[action]();
		}
	},
	upElement: function(element) {
		this.element = element;
	},
	getData: function(attribute) {
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
