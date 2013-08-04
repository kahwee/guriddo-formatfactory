class FormatterFactory
	@getFormatter: (column) ->
		if not column.formatTo?
			return Guriddo.Formatters.Raw
		else if column.formatLibrary is 'guriddo'
			return Guriddo.Formatters[column.formatTo]
		else if column.formatLibrary is 'moment'
			# Uses the moment() library
			if not moment?
				throw "Guriddo FormatterFactory cannot locate the moment module"
			return Guriddo.Formatters.Moment
		else if column.formatLibrary is 'numeral'
			# Uses the numeral() library
			if not numeral?
				throw "Guriddo FormatterFactory cannot locate the numeral module"
			return Guriddo.Formatters.Numeral
		else
			return null
		return null

$.extend(true, window, {
	"Guriddo":
		"FormatterFactory": FormatterFactory
		"Formatters":
			"Raw": (row, cell, value, columnDef, dataContext) ->
				return value
			"Moment": (row, cell, value, columnDef, dataContext) ->
				value = if typeof value is "string" then value else value.toString()
				formatFrom = if columnDef.formatFrom? then columnDef.formatFrom else 'X'
				formatTo = if columnDef.formatTo? then columnDef.formatTo else 'YYYY-MM-DD'
				return moment(value, formatFrom).format(formatTo)
			"Numeral": (row, cell, value, columnDef, dataContext) ->
				value = if typeof value is "string" then value else value.toString()
				formatFrom = if columnDef.formatFrom? then columnDef.formatFrom else '0'
				formatTo = if columnDef.formatTo? then columnDef.formatTo else '0.00'
				return numeral(value, formatFrom).format(formatTo)
			"YesNo": (row, cell, value, columnDef, dataContext) ->
				if value
					return "Yes"
				"No"
})
