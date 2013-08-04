(function() {
	var grid;
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
	window.grid = grid;
})();