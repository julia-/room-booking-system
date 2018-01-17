import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const queryPairs = window.location.search.substring(1).split('&')
console.log('queryPairs', queryPairs)
// TODO: maybe use a better query parser
if (!!queryPairs[0] && queryPairs[0].slice(0, 6) === 'token=') {
  const token = queryPairs[0].slice(6)
  window.opener.authenticateCallback(token)
  window.close()
}

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
