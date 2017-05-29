guriddo-formatfactory
=====================

[![Greenkeeper badge](https://badges.greenkeeper.io/kahwee/guriddo-formatfactory.svg)](https://greenkeeper.io/)
Guriddo FormatFactory is a FormatFactory that is made for Michael Leibman's [SlickGrid](https://github.com/mleibman/SlickGrid). The intention is to make it simpler to change the cell output. Gurrido Formatters are a set of convenient formatters for your SlickGrid application.

### Prerequisites

* SlickGrid 2.1 (Latest in GitHub)
* Moment.js (only required if you specified column formatLibrary 'moment')
* Numeral.js (only required if you specified column formatLibrary 'numeral')

### When should you not use Guriddo FormatFactory

While Guriddo FormatFactory does format for you, it is not tested on cases where editing for the SlickGrid spreadsheet is involved.

### Getting started

To install using Bower:

```bash
bower install --save guriddo-formatfactory
```

Load gurrido-formatfactory:

```html
<script src="guriddo-formatfactory.min.js"></script>
```

You have to specify formatterFactory in your SlickGrid options:

```javascript
var options = {
	enableColumnReorder: false,
	defaultColumnWidth: 300,
	formatterFactory: Guriddo.FormatterFactory
};
```

### Sample code

```javascript
var columns = [{
	id: "unixTimeStamp",
	name: "Unix Time Stamp",
	field: "unixTimeStamp",
	formatLibrary: "guriddo",
	formatTo: 'Raw'
}, {
	id: "unixTimeStamp",
	name: "Unix YYYYMMDD",
	field: "unixTimeStamp",
	formatLibrary: "moment",
	formatTo: "YYYYMMDD"
}, {
	id: "unixTimeStamp",
	name: "YYYY-MM-DD HH:mm Z",
	field: "unixTimeStamp",
	formatLibrary: "moment",
	formatTo: "YYYY-MM-DD HH:mm Z"
}, {
	id: "unixTimeStamp",
	name: "YYYY-MM-DD",
	field: "unixTimeStamp",
	formatLibrary: "moment",
	formatTo: "YYYY-MM-DD"
}];

var options = {
	enableColumnReorder: false,
	defaultColumnWidth: 300,
	formatterFactory: Guriddo.FormatterFactory
};

var data = [];
for (var i = 0; i < 500; i++) {
	data[i] = {
		unixTimeStamp: Math.round(Math.random() * 1000) * 1000000000
	};
}

grid = new Slick.Grid("#test-grid", data, columns, options);
```

You can also learn more through reading the examples in `./examples`.

### Format definitions

Each column has additional keys you can use to customize your format output.

* formatLibrary: Supports 'moment', 'numeral' and 'guriddo'
* formatFrom: If you are using 'moment' or 'numeral' as the formatLibrary, this should correspond to moment(string, formatFrom).format(formatTo). For more information on Moment, look at http://momentjs.com/docs/#/parsing/
* formatTo: The output format as supported by 'guriddo', 'moment' or 'numeral'.

### Gurrido Formatters

Currently, the only valid formatTo in Guriddo is 'Raw'. It just doesn't escape HTML for you.

### More information

Guriddo FormatFactory is written specifically for the latest version of SlickGrid. It is written in CoffeeScript, the build process is committed as well.

Uses the following libraries.

* SlickGrid: https://github.com/mleibman/SlickGrid
* Moment.js: http://momentjs.com/docs/#/parsing/
* Numeral.js: http://numeraljs.com/
