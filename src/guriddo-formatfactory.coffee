class FormatterFactory
	@getFormatter: (column) ->
		if not column.format?
			return Guriddo.Formatters.Raw
		else if column.formatLibrary is 'guriddo'
			return Guriddo.Formatters[column.format]
		else if column.formatLibrary is 'moment'
			if not moment?
				throw "Guriddo FormatterFactory cannot locate the moment module"
			return Guriddo.Formatters.Raw
		else if column.formatLibrary is 'numeral'
			if not numeral?
				throw "Guriddo FormatterFactory cannot locate the numeral module"
			return Guriddo.Formatters.Raw
		else
			return null
		return null

$.extend(true, window, {
	"Guriddo":
		"FormatterFactory": FormatterFactory
		"Formatters":
			"Raw": (row, cell, value, columnDef, dataContext) ->
				return value
			"YesNo": (row, cell, value, columnDef, dataContext) ->
				if value
					return "Yes"
				"No"
})
