var http = require('http')
var sessionkey = "sessionkey3"
http.createServer(function (req, res) {
    if (req.url == "/") {
        session(req, res)
        req.session.count = (req.session.count + 1) || 1
        res.end('hi' + req.session.count)
    } else
        res.end('')
}).listen(3000)
console.log('listen on 3000')
function session(req, res) {
    if (req.session)
        return
    var answer, id
    if (isSessionOk(req)) {
        id = getCookie(req)
        answer = getSessionById(id)
    } else {
        answer = {}
        id = createSession(answer)
        setCookie(res, id)
    }
    req.session = answer
    res.on('finish', function () {
        saveSession(id, req.session)
    });
}
function hasCookie(req) {
    return (getCookie(req) != '')
}
function getCookie(req) {
    try {
        var c = req.headers['cookie']
        var arr = c.split(';')
        for (var i = 0; i < arr.length; i++) {
            var kv = arr[i]
            var a = kv.split('=')
            if (a[0].trim() == sessionkey)
                return a[1]
        }
    } catch (error) {
        return ''
    }
    return ''
}
function setCookie(res, id) {
    res.setHeader("set-cookie", sessionkey + "=" + id)
}
var sessions = {}
var sid = 0
function getSessionById(sid) {
    return sessions[sid]
}
function getSessionByReq(req) {
    var sid = getCookie(req)
    return sessions[sid]
}
function createSession(session) {
    sessions[sid++ , session]
    return sid
}
function saveSession(sid, session) {
    sessions[sid] = session
}
function isSessionOk(req) {
    return hasCookie(req) && getSessionByReq(req) !== undefined
}
