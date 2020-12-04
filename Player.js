class Player{

    // Atributes = {};
    // Hand = [];
    // Revel = [];
    // Sets = [];

    constructor(User){
        this._Atributes = User;
    }

    get Atributes(){
        return this._Atributes;
    }

    get Sets() {
        return this.Sets;
    }

    get Hand() {
        return this.Hand;
    }
    
    get Revel() {
        return this.Revel;
    }

    set Hand(params) {
        this.Hand.push(params);
    }

    set Sets(params) {
        this.Sets.push(params);
    }

    set Revel(params) {
        this.Revel.push(params);
    }
}

module.exports = Player;