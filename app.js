const Player = require ('./Player');
const Game = require('./Game');
const axios = require("axios");
const Express = require("express");
const Http = require("http").Server(Express);
const io = require("socket.io")(Http, {
    cors: {
      origin: '*',
    }
  });



var Clients = [];
var deck = [];
var Rooms = [];
getDeck();

io.on("connection", (socket) =>{
    var UserCon = new Object;

    socket.on('new-user-connect', (data) =>
    {
        if(!Clients[Clients.findIndex(e => e.id == data.id)]){
            UserCon = data; 
            UserCon['socketid'] = socket.id;
            Clients.push(UserCon); // getting all users conecteds in server;
        }else{
            console.log("chegou a ver que tinha usuário no array")
            Clients.splice(Clients.indexOf(data.id),1);
            console.log("saiu um do array");
            UserCon['socketid'] = socket.id;
            Clients.push(UserCon);
            console.log("entrou o novo no array")
        }

        console.log('a user connected');
        console.log(Clients);
    });

    socket.on('conect-room', (room) =>
    {
        Conectiontoroom(room,socket,UserCon);
    });

    socket.on('givesettopilha', (data) =>
    {
        var theroom = Rooms[Rooms.findIndex(e => e.Roomname == 'Room'+data[2])];
        var theplayer = null;
        var anotherplayer = null;

        if(theroom._player1._Atributes.id = data[1]){
            theplayer = theroom._player1;
            anotherplayer = theroom._player2;
        } else{
            theplayer = theroom._player2;
            anotherplayer = theroom._player1;
        }
        
        var thecard = theplayer._Sets[data[0]];
        io.to(theplayer._Atributes.socketid).emit("receive-setcard", [data[0], thecard]);  
        io.to(anotherplayer._Atributes.socketid).emit("see-setopca", thecard);
    })

    socket.on('giverevtopilha', (data) =>
    {
        var theroom = Rooms[Rooms.findIndex(e => e.Roomname == 'Room'+data[1])];

        theroom._pilha.push(data[0]);

        io.to(theroom._Roomname).emit("see-pilha", theroom._pilha);
    })

    socket.on('disconnect', function ()
    {
        console.log('a user was disconnected');
        Clients.splice(Clients.indexOf(UserCon.id), 1);
        console.log(Clients);
    });

    socket.on('exit-room', (room) =>
    {
        if(room){
            var CurrentRoom = Rooms[Rooms.findIndex(e => e.Roomname == 'Room'+room.id)]
            if(CurrentRoom){
                io.to('Room'+room.id).emit('exited-room','End Game');
            }
        }
    })
        
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

    var varar = [...array];

    return varar;
}

function Conectiontoroom(room, socket, UserCon)
{
    
    var CurrentRoom = Rooms[Rooms.findIndex(e => e.Roomname == 'Room'+room.id)]

    if(CurrentRoom){
        if(CurrentRoom._player2){
            console.log(room);
            if(CurrentRoom._player1._Atributes.id == UserCon.id){
                CurrentRoom._player1._Atributes.socketid = UserCon.socketid;
                socket.join(CurrentRoom._Roomname);
                ReceiveState(CurrentRoom._player1, CurrentRoom._sdeck, CurrentRoom._player2);
            }
            
            else if(CurrentRoom._player2._Atributes.id == UserCon.id){
                CurrentRoom._player2._Atributes.socketid = UserCon.socketid;
                socket.join(CurrentRoom.Roomname);
                ReceiveState(CurrentRoom._player2, CurrentRoom._sdeck, CurrentRoom._player1);
            }
        }
        else {
            socket.join(CurrentRoom.Roomname);
            CurrentRoom._player2 = new Player(UserCon);

            CurrentRoom._sdeck = Shuffle(deck);                             //   deck embaralhado ...

            CurrentRoom._player1.Hand = CurrentRoom.sdeck.splice(-3,3);     //   deck
            CurrentRoom._player1.Revel = CurrentRoom.sdeck.splice(-3,3);    //   embaralhado e
            CurrentRoom._player1.Sets = CurrentRoom.sdeck.splice(-3,3);     //   dividido
            CurrentRoom._player2.Hand = CurrentRoom.sdeck.splice(-3,3);     //   entre
            CurrentRoom._player2.Revel = CurrentRoom.sdeck.splice(-3,3);    //   os
            CurrentRoom._player2.Sets = CurrentRoom.sdeck.splice(-3,3);     //   jogadores
            
            ReceiveState(CurrentRoom._player1, CurrentRoom._sdeck, CurrentRoom._player2);
            ReceiveState(CurrentRoom._player2, CurrentRoom._sdeck, CurrentRoom._player1);
            console.log(Rooms);
        }
    }
    else
    {
        var player1 = new Player(UserCon);
        var NGame = new Game(player1, room.id)
        socket.join(NGame.Roomname);
        Rooms.push(NGame);
        console.log(Rooms)
    }
}


function ReceiveState(PlayerinRoom, DeckfromGame, AnotherPlayerinRoom)
{
    io.to(PlayerinRoom._Atributes.socketid).emit('distribuided-hand', [PlayerinRoom._Hand, AnotherPlayerinRoom._Hand.length]);
    io.to(PlayerinRoom._Atributes.socketid).emit('distribuided-revel', [PlayerinRoom._Revel, AnotherPlayerinRoom._Revel]);
    io.to(PlayerinRoom._Atributes.socketid).emit('distribuided-set', [PlayerinRoom._Sets.length, AnotherPlayerinRoom._Sets.length]);
    io.to(PlayerinRoom._Atributes.socketid).emit("shuffled", DeckfromGame.length);
}