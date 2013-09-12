(function() {
	"use strict";

	var grid;
	var columns = [{
		id: "unixTimeStamp",
		name: "Unix Time Stamp",
		field: "unixTimeStamp",
		format: {
			type: 'guriddo',
			to: 'Raw'
		}
	}, {
		id: "unixTimeStamp",
		name: "Unix YYYYMMDD",
		field: "unixTimeStamp",
		format: {
			type: 'datetime',
			to: 'YYYYMMDD'
		}
	}, {
		id: "unixTimeStamp",
		name: "YYYY-MM-DD HH:mm Z",
		field: "unixTimeStamp",
		format: {
			type: 'datetime',
			to: 'YYYY-MM-DD HH:mm Z'
		}
	}, {
		id: "unixTimeStamp",
		name: "YYYY-MM-DD",
		field: "unixTimeStamp",
		format: {
			type: 'datetime',
			to: 'YYYY-MM-DD'
		}
	}];

	var options = {
		enableColumnReorder: false,
		defaultColumnWidth: 300,
		formatterFactory: Guriddo.FormatterFactory
	};

	var data = [];
	for (var i = 0; i < 500; i++) {
		data[i] = {
			unixTimeStamp: Math.round(Math.random() * 1000) * 1000000
		};
	}

	grid = new Slick.Grid("#test-grid", data, columns, options);
	window.grid = grid;
})();