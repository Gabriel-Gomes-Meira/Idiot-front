class Player{

    constructor(User){
        this._Atributes = User;
        this._Hand = [];
        this._Revel = [];
        this._Sets = [];
    }

    get Atributes(){
        return this._Atributes;
    }

    get Sets() {
        return this._Sets;
    }

    get Hand() {
        return this._Hand;
    }
    
    get Revel() {
        return this._Revel;
    }

    set Hand(params) {
        this._Hand = params;
    }

    set Sets(params) {
        this._Sets.push(params);
    }

    set Revel(params) {
        this._Revel.push(params);
    }
}

module.exports = Player;