import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import queryString from 'query-string'

const parsedQuery = queryString.parse(window.location.search)
const token = queryString.stringify(parsedQuery).slice(6)

if (!!token) {
  window.opener.authenticateCallback(token)
  window.close()
}

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
