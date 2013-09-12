class FormatterFactory
	@getFormatter: (column) ->
		console.log column
		if not column.format?
			return Guriddo.Formatters.Raw
		if not column.format.to?
			return Guriddo.Formatters.Raw
		else if column.format.type is 'guriddo'
			return Guriddo.Formatters[column.format.to]
		else if column.format.type is 'datetime'
			# Uses the moment() library
			if not moment?
				throw "Guriddo FormatterFactory cannot locate the moment module"
			return Guriddo.Formatters.Moment
		else if column.format.type is 'number'
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
				formatFrom = if columnDef.format.from? then columnDef.format.from else 'X'
				formatTo = if columnDef.format.to? then columnDef.format.to else 'YYYY-MM-DD'
				return moment(value, formatFrom).format(formatTo)
			"Numeral": (row, cell, value, columnDef, dataContext) ->
				value = if typeof value is "string" then value else value.toString()
				formatFrom = if columnDef.format.from? then columnDef.format.from else '0'
				formatTo = if columnDef.format.to? then columnDef.format.to else '0.00'
				return numeral(value, formatFrom).format(formatTo)
			"YesNo": (row, cell, value, columnDef, dataContext) ->
				if value
					return "Yes"
				"No"
})
