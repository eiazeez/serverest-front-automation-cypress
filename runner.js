const cypress = require('cypress')
const tesults = require('cypress-tesults-reporter');

cypress.run({
  browser: 'chrome'
})
.then((results) => {
  const args = {
    target: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjFlZTYxYTYxLWNmZDUtNDkzOS1iNWE0LTE2NzU1NjQ3ZTQyZi0xNzM5NDAyMjM4OTk5IiwiZXhwIjo0MTAyNDQ0ODAwMDAwLCJ2ZXIiOiIwIiwic2VzIjoiMzI2MWQ4OGUtMGIwNi00OThiLWIwNzgtMWIxODU1YTdkZjQzIiwidHlwZSI6InQifQ.FDTTpuaILpYb5G0nFnrt3GgKbEJxOA6z8RZmqUzhBgU',
  }
  tesults.results(results, args);
})
.catch((err) => {
 console.error(err)
})