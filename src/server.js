import http from "node:http"
import { json } from "./middlewares/json.js"
import { routes } from "./routes.js"

const server = http.createServer(async(req, res)=>{
    const { method, url } = req
    console.log(url);
    await json(req, res)

    const route = routes.find(route => {
        return route.method == method && route.path == url
    })

    if(!route){
        return res.writeHead(404).end()
    }

    route.handler(req, res)
})

server.listen(3333)