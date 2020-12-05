const Configure = {
    serverPort:8081,
    tokenSecret:"Hire_Henry"
}
Configure.serverUrl = `http://localhost:${Configure.serverPort}`
module.exports = { Configure }
