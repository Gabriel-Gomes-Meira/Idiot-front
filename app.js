const Express = require("express");
const Http = require("http").Server(Express);
const io = require("socket.io")(Http, {
    cors: {
      origin: '*',
    }
  });


var clients = [];
var UserCon = new Object;

io.on("connection", socket =>{
    socket.on('new-user-conect', (data) =>
    {     
        if(clients.indexOf(data.id) == -1){
            UserCon = data;
            UserCon['socketid'] = socket.id;
            clients.push(UserCon); // getting all users conecteds in server;
        }
        
        console.log('a user connected');
        console.log(clients);
    })
    

    socket.on('disconnect', function ()
    {
        socket.emit('disconnected');
        console.log('a user was disconnected');
        clients.splice(clients.indexOf(UserCon.id), 1);
        console.log(clients);
    });

    // a private message to another socket
    socket.on('send-mensage', (msg) =>{
        if(socket.id == clients[0].socketid){
            console.log("IF 1");
            socket.to(clients[1].socketid).emit('receive-mensage', msg);
        }
        else if (socket.id == clients[1].socketid){
            console.log("IF 2");
            socket.to(clients[0].socketid).emit('receive-mensage', msg);
        }
    })
        
})

Http.listen(3000, () =>{
    console.log("Listening at :3000");
})