(function() {
  var FormatterFactory;

  FormatterFactory = (function() {
    function FormatterFactory() {}

    FormatterFactory.getFormatter = function(column) {
      if (column.formatTo == null) {
        return Guriddo.Formatters.Raw;
      } else if (column.formatLibrary === 'guriddo') {
        return Guriddo.Formatters[column.formatTo];
      } else if (column.formatLibrary === 'moment') {
        if (typeof moment === "undefined" || moment === null) {
          throw "Guriddo FormatterFactory cannot locate the moment module";
        }
        return Guriddo.Formatters.Moment;
      } else if (column.formatLibrary === 'numeral') {
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
          formatFrom = columnDef.formatFrom != null ? columnDef.formatFrom : 'X';
          formatTo = columnDef.formatTo != null ? columnDef.formatTo : 'YYYY-MM-DD';
          return moment(value, formatFrom).format(formatTo);
        },
        "Numeral": function(row, cell, value, columnDef, dataContext) {
          var formatFrom, formatTo;
          value = typeof value === "string" ? value : value.toString();
          formatFrom = columnDef.formatFrom != null ? columnDef.formatFrom : '0';
          formatTo = columnDef.formatTo != null ? columnDef.formatTo : '0.00';
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