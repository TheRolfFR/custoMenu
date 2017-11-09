# custoMenu
[![Dependency jQuery](https://img.shields.io/badge/Dependency-jQuery-red.svg)](https://jquery.com/)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
[![License: CC BY-NC-SA 4.0](https://licensebuttons.net/l/by-nc-sa/4.0/80x15.png)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

Create custom context menus easily

## Usage
### 1. Import js and css
Import jQuery first :
```html
<script src='path/to/jquery.min.js'></script>
```
Then custoMenu :
```html
<script src='path/to/custoMenu.js'></script>
<link  href="path/to/custoMenu.css" rel="stylesheet" />
```
You can use raw github links to keep updated your custoMenu :
```html
<script src='https://raw.githubusercontent.com/TheRolfFR/custoMenu/master/custoMenu.js'></script>
<link  href="https://raw.githubusercontent.com/TheRolfFR/custoMenu/master/custoMenu.css" rel="stylesheet" />
```
### 2. Create your context menu object
Handles these properties :

|      | Required |Type          | Desc |
| ---- |:--------:|------------- | ---- |
| 0    | X        | String       | Name of the custoMenu |
| text | X        | HTML         | Text of the custoMenu item |
| desc |          | String       | Description of the custoMenu item |
| func | X        | Function     | Function associated to the custoMenu item |
```javascript
var filectxmenu = {
  0: 'file',
  'openfile' : { // function name must be unique throught every object. If not the last function will be choosed
    text: 'Open file',
    desc: 'Open',
    func: function() { 
      // my function
    }
  } // etc...
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


License: <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY 4.0 International</a>
