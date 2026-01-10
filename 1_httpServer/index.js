const http = require('http')

const server = http.createServer((req, res)=>{
    if(req.url==='/')
        res.end('hello shahid')
    if(req.url==='/home')
        res.end('this is home')
})

server.listen(3000, ()=>{ console.log('✅ Created server');
})

