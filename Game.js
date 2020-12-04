class Game {
    constructor(player1, idroom) {
        this._Roomname = 'Room'+idroom;
        this._player1 = player1;
        this._player2 = null;
        this._sdeck = null;
        this.winner = null;
        this.turnof = null;
    }

    set player2(player2) {
        this._player2 = player2;
    }

    set sdeck(sdeck) {
        this._sdeck = sdeck;
    }

    get player2(){
        return this._player2;
    }

    get sdeck(){
        return this._sdeck;
    }

    get Roomname(){
        return this._Roomname;
    }
}

module.exports = Game
