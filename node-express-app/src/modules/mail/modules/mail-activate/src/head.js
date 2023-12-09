const css = require('./css')
module.exports = (data = {}) => `<meta name="viewport" content="width=device-width" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>${data.title}</title>
 ${css(data)}
`