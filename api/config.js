const env = process.env

const nodeEnv = env.NODE.ENV || 'development'

const serverURL = {
  port: env.PORT || 7000,
  host: env.HOST || 'localhost',
  get serverUrl() {
    return `http://${this.host}:${this.port}`
  }
}

module.exports = serverURL
