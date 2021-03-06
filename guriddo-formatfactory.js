(function() {
  var FormatterFactory;

  FormatterFactory = (function() {
    function FormatterFactory() {}

    FormatterFactory.getFormatter = function(column) {
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
      } else if (column.format.type === 'template') {
        if (typeof Handlebars === "undefined" || Handlebars === null) {
          throw "Guriddo FormatterFactory cannot locate the Handlebars module";
        }
        return Guriddo.Formatters.Handlebars;
      } else if (column.format.type === 'number' || column.format.type === 'duration') {
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
          if (value === null) {
            return "NA";
          }
          return value;
        },
        "Moment": function(row, cell, value, columnDef, dataContext) {
          var formatFrom, formatTo;
          if (value === null) {
            return "NA";
          }
          if (value === "NA" || value === "") {
            return value;
          }
          formatFrom = columnDef.format.from != null ? columnDef.format.from : '';
          formatTo = columnDef.format.to != null ? columnDef.format.to : 'YYYY-MM-DD';
          return moment(value, formatFrom).format(formatTo);
        },
        "Handlebars": function(row, cell, value, columnDef, dataContext) {
          var formatTo;
          if (value === null) {
            return "NA";
          }
          value = typeof value === "string" ? value : value.toString();
          if (value === "NA" || value === "") {
            return value;
          }
          formatTo = columnDef.format.to;
          return Handlebars.compile(formatTo)(dataContext);
        },
        "Numeral": function(row, cell, value, columnDef, dataContext) {
          var formatFrom, formatTo, numeralObj;
          if (value === null) {
            return "NA";
          }
          value = typeof value === "string" ? value : value.toString();
          if (value === "NA" || value === "") {
            return value;
          }
          formatFrom = columnDef.format.from != null ? columnDef.format.from : '0';
          formatTo = columnDef.format.to != null ? columnDef.format.to : '0.00';
          numeralObj = numeral(value, formatFrom);
          if (columnDef.format.divide != null) {
            numeralObj = numeralObj.divide(columnDef.format.divide);
          } else if (columnDef.format.multiply != null) {
            numeralObj = numeralObj.multiply(columnDef.format.multiply);
          }
          return numeralObj.format(formatTo);
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