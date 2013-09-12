(function() {
  var FormatterFactory;

  FormatterFactory = (function() {
    function FormatterFactory() {}

    FormatterFactory.getFormatter = function(column) {
      console.log(column);
      if (column.format == null) {
        return Guriddo.Formatters.Raw;
      }
      if (column.format.to == null) {
        return Guriddo.Formatters.Raw;
      } else if (column.format.type === 'guriddo') {
        return Guriddo.Formatters[column.format.to];
      } else if (column.format.type === 'datetime') {
        if (typeof moment === "undefined" || moment === null) {
          throw "Guriddo FormatterFactory cannot locate the moment module";
        }
        return Guriddo.Formatters.Moment;
      } else if (column.format.type === 'number') {
        if (typeof numeral === "undefined" || numeral === null) {
          throw "Guriddo FormatterFactory cannot locate the numeral module";
        }
        return Guriddo.Formatters.Numeral;
      } else {
        return null;
      }
      return null;
    };

    return FormatterFactory;

  })();

  $.extend(true, window, {
    "Guriddo": {
      "FormatterFactory": FormatterFactory,
      "Formatters": {
        "Raw": function(row, cell, value, columnDef, dataContext) {
          return value;
        },
        "Moment": function(row, cell, value, columnDef, dataContext) {
          var formatFrom, formatTo;
          value = typeof value === "string" ? value : value.toString();
          formatFrom = columnDef.format.from != null ? columnDef.format.from : 'X';
          formatTo = columnDef.format.to != null ? columnDef.format.to : 'YYYY-MM-DD';
          return moment(value, formatFrom).format(formatTo);
        },
        "Numeral": function(row, cell, value, columnDef, dataContext) {
          var formatFrom, formatTo;
          value = typeof value === "string" ? value : value.toString();
          formatFrom = columnDef.format.from != null ? columnDef.format.from : '0';
          formatTo = columnDef.format.to != null ? columnDef.format.to : '0.00';
          return numeral(value, formatFrom).format(formatTo);
        },
        "YesNo": function(row, cell, value, columnDef, dataContext) {
          if (value) {
            return "Yes";
          }
          return "No";
        }
      }
    }
  });

}).call(this);

/*
//@ sourceMappingURL=guriddo-formatfactory.js.map
*/