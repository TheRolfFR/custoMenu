

var customMenu = {
	functions: {},
	dataSrc: '',
	dataType: '',
	
	addMenu : function(array) {
		var menu = $('<ul class="custom-menu" data-type="' + array[0] + '"></ul>').appendTo('body').hide();
		
		for(var key in array) {
			if(isNaN(parseInt(key))) {
				var desc = array[key]['desc'] || ucfirst(key);
				menu.append('<li data-action="' + key + '" title="' + desc + '">' + array[key]['text'] + '</li>');
				if(array[key]['func'] !== undefined) {
					this.functions[key] = array[key]['func'];
				}
			}
		}
	},
	openMenu : function(element, e) {
		this.upData(element);
		
		// detect type
		var ctxmenu = $('.custom-menu[data-type=' + this.dataType + ']');

		ctxmenu.show().css({
			top: e.pageY + "px",
			left: e.pageX + "px"
		}).attr('data-src', this.dataSrc);

		if($(window).innerHeight() - e.pageY < ctxmenu.innerHeight()) {
			ctxmenu.css('top', e.pageY-ctxmenu.innerHeight());
		}
	},
	closeMenu: function() {
		$('.custom-menu').hide();
	},
	openFunction: function(element) {
		var name = element.attr('data-action');
		this.functions[name]();
	},
	upData: function(element) {
		this.dataType = element.attr('data-type');
		this.dataSrc = element.attr('data-src');
	}
}

customMenu.addMenu(filectxmenu);
customMenu.addMenu(contentmenu);
customMenu.addMenu(foldermenu);

$(document).on('contextmenu', '.context', function(e){
	e.preventDefault();
	e.stopPropagation();
	customMenu.closeMenu();
	customMenu.openMenu($(this), e);
});
$(document).on('click', '.custom-menu li', function(){
	customMenu.openFunction($(this));
});
$('body').on('click', function(e){
	customMenu.closeMenu();
});
