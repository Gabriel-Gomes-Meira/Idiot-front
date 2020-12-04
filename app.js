const Player = require ('./Player');
const Game = require('./Game');
const axios = require("axios");
const Express = require("express");
const e = require('express');
const Http = require("http").Server(Express);
const io = require("socket.io")(Http, {
    cors: {
      origin: '*',
    }
  });



var clients = [];
var deck = [];
var Rooms = [];
getDeck();

io.on("connection", socket =>{
    var UserCon = new Object;
    socket.on('new-user-conect', (data, room) =>
    {
        if(clients.indexOf(data.id) == -1){
            UserCon = data; 
            UserCon['socketid'] = socket.id;
            clients.push(UserCon); // getting all users conecteds in server;
        }
        
        var CurrentRoom = Rooms[Rooms.findIndex(e => e.Roomname == 'Room'+room.id)]
        if(CurrentRoom){
            
            console.log(CurrentRoom._player1._Atributes)
            if(CurrentRoom._player1._Atributes.id == UserCon.id){
                CurrentRoom._player1._Atributes.socketid = socket.id
            }
            else if(CurrentRoom._player2){
                if(CurrentRoom._player2._Atributes.id == UserCon.id){
                    CurrentRoom._player2._Atributes.socketid = socket.id
                }
            }
            else if(room.qtdplayer == 2){
                socket.join(CurrentRoom.Roomname);
                CurrentRoom._player2 = new Player(UserCon);
                CurrentRoom._sdeck = Shuffle(deck);
                io.to(CurrentRoom.Roomname).emit("shuffled", CurrentRoom._sdeck)
                CurrentRoom._player1.Hand = CurrentRoom.sdeck.splice(-3,3);
                io.to(CurrentRoom.Roomname).emit('distribuided-hand1',CurrentRoom._player1._Hand);
                CurrentRoom._player2.Hand = CurrentRoom.sdeck.splice(-3,3);
                io.to(CurrentRoom.Roomname).emit('distribuided-hand2',CurrentRoom._player2._Hand);
                console.log(Rooms);  
            }
        }
        else
        {
            var player1 = new Player(UserCon);
            var NGame = new Game(player1, room.id)
            socket.join(NGame.Roomname);
            Rooms.push(NGame);

            console.log(Rooms);
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
    // socket.on('send-mensage', (msg) =>{
    //     if(socket.id == clients[0].socketid){
    //         console.log("IF 1");
    //         socket.to(clients[1].socketid).emit('receive-mensage', msg);
    //     }
    //     else if (socket.id == clients[1].socketid){
    //         console.log("IF 2");
    //         socket.to(clients[0].socketid).emit('receive-mensage', msg);
    //     }
    // })
        
})


Http.listen(3000, () =>{
    console.log("Listening at :3000");
})


function getDeck()
{
    axios.get('http://localhost:8000/api/baralho')
    .then(Response =>{
        deck = Response.data.cards;
    })
}

function Shuffle(array)
{
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (0 !== m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
        
    }

    return array;
}
