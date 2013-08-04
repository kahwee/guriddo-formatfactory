(function() {
  var FormatterFactory;

  FormatterFactory = (function() {
    function FormatterFactory() {}

    FormatterFactory.getFormatter = function(column) {
      if (column.format == null) {
        return Guriddo.Formatters.Raw;
      } else if (column.formatLibrary === 'guriddo') {
        return Guriddo.Formatters[column.format];
      } else if (column.formatLibrary === 'moment') {
        if (typeof moment === "undefined" || moment === null) {
          throw "Guriddo FormatterFactory cannot locate the moment module";
        }
        return Guriddo.Formatters.Raw;
      } else if (column.formatLibrary === 'numeral') {
        if (typeof numeral === "undefined" || numeral === null) {
          throw "Guriddo FormatterFactory cannot locate the numeral module";
        }
        return Guriddo.Formatters.Raw;
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
