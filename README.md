guriddo-formatfactory
=====================
Guriddo FormatFactory is a FormatFactory that is made for SlickGrid. The intention is to make it simpler to change the cell output. Gurrido Formatters are a set of convenient formatters for your SlickGrid application.

### When should you not use Guriddo FormatFactory

While Guriddo FormatFactory does format for you, it is not tested on cases where editing for the SlickGrid spreadsheet is involved.

### Getting started

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

### Some code

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

### Format definitions

Each column has additional keys you can use to customize your format output.

* formatLibrary: Supports 'moment', 'numeral' and 'guriddo'
* formatFrom: If you are using 'moment' or 'numeral' as the formatLibrary, this should correspond to moment(string, formatFrom).format(formatTo). For more information on Moment, look at http://momentjs.com/docs/#/parsing/
* formatTo: The output format as supported by 'guriddo', 'moment' or 'numeral'.

### Gurrido Formatters

Currently, the only valid formatTo in Guriddo is 'Raw'. It just doesn't escape HTML for you.

### More information

* SlickGrid: https://github.com/mleibman/SlickGrid
* Moment.js: http://momentjs.com/docs/#/parsing/
* Numeral.js: http://numeraljs.com/
