# custoMenu
![](https://img.shields.io/github/release/therolffr/custoMenu.svg?style=flat-square)
![Drop, enjoy](https://img.shields.io/badge/Drop,-Enjoy%20!-red.svg?style=flat-square)
[![Author](https://img.shields.io/badge/Author-TheRolfFR-%2331a589.svg?style=flat-square)](http://bit.ly/therolf-website)
![License: LGPL--3.0](https://img.shields.io/badge/license-LGPL--3.0-lightgrey.svg?style=flat-square) 
![Repo Size](https://img.shields.io/github/languages/code-size/TheRolfFR/custoMenu.svg?style=flat-square)
[![jsDelivr Hits](https://data.jsdelivr.com/v1/package/gh/TheRolfFR/custoMenu/badge?style=flat-square)](https://www.jsdelivr.com/package/gh/TheRolfFR/custoMenu)

Create custom context menus easily

## Usage
### 1. Import js and css
Import custoMenu :
```html
<script src="path/to/custoMenu.js"></script>
<link  href="path/to/custoMenu.css" rel="stylesheet" />
```
You can use jsDelivr links to keep updated your custoMenu : https://www.jsdelivr.com/package/gh/TheRolfFR/custoMenu 

### 2. Create your context menu object
The menu itself has this these properties :

|      | Required |Type          | Desc |
| ---- |:--------:|------------- | ---- |
| name | X        | String       | Name of the custoMenu |
| items| X        | Object       | Contains your items |

And each item has these properties :

|      | Required |Type          | Desc |
| ---- |:--------:|------------- | ---- |
| text | X        | HTML         | Text of the custoMenu item |
| desc |          | String       | Description of the custoMenu item |
| func | X        | Function | Function associated to the custoMenu item |

Example :

```javascript
var filectxmenu = {
	name: 'file',
	items: {
		'openfile' : { // function name must be unique throught every object. If not the last function will be choosed
			text: '<i class="material-icons">&#xE254;</i>',
			desc: 'Open',
			func: function() {
				// your function
			} // etc...
		}
  }
}
  ```
### 3. Add your object to CustoMenu in your script
```javascript
custoMenu.addMenu(filectxmenu);
```
### 4. Add class and data attributes to your elements
  * class : custoMe
  * data-name: file (name of your function)
```html
<div class="custoMe" data-name="file">file.txt</div>
```
### 5. Enjoy !

License: GNU Lesser General Public License v3.0
