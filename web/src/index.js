import React from 'react'
import ReactDOM from 'react-dom'
import './css/index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import queryString from 'query-string'

// When Google authenticates, it loads our page with a ?token=xxx
const parsedQuery = queryString.parse(window.location.search)
const token = queryString.stringify(parsedQuery).slice(6)

if (!!token) {
  window.opener.authenticateCallback(token)
  window.close()
}

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
