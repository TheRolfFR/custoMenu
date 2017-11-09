# custoMenu
![Dependency jQuery](https://img.shields.io/badge/Dependency-jQuery-red.svg)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
[![License: CC BY-NC-SA 4.0](https://licensebuttons.net/l/by-nc-sa/4.0/80x15.png)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

Create custom context menus easily

## Usage
---
### 1. Import js and css
```html
<script src='path/to/jquery.min.js'></script>
<script src='path/to/custoMenu.js'></script>
<link href="path/to/custoMenu.css" rel="stylesheet" />
```
### 2. Create your context menu object with his name, the different functions and their properties<br>
```javascript
var filectxmenu = {
  0: 'file',
  'openfile' : { // function name must be unique throught every object. If not the last function will be choosed
    text: 'Open file', // any html or text 
    desc: 'Open', // will be the name of the function if empty or not existing
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
  * data-type: file (name of your function)
  * data-src: path/to/file.txt (path of your file)
```html
<div class="custoMe" data-type="file" data-src="path/to/file.txt">file.txt</div>
```
### 5. Enjoy !
