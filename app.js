new Vue({
    el: '#app',
    data: {
        playerEnergy: 100,
        monsterEnergy: 100,
        gameInit: false,
        hitTurn: false,
        log: []

    },

    methods: {
        startGame: function () {
            this.gameInit = true

            this.playerEnergy = 100
            this.monsterEnergy = 100
            this.log = []
        },
        reset: function () {
            this.gameInit = false

            this.playerEnergy = 100
            this.monsterEnergy = 100
            this.log = []
        },
        attack: function () {
            var hitPlayer = randomPower(3, 15)
            var hitMonster = randomPower(3, 20)
            this.monsterAttack(hitMonster)
            if (this.playerEnergy <= 0) {
                if (confirm("You Lost New Game?") == true) {
                    this.startGame()
                } else {
                    this.reset()
                }

                return;
            }
            this.playerAttack(hitPlayer);
            if (this.monsterEnergy <= 0) {
                if (confirm("You Wong New Game?") == true) {
                    this.startGame()
                } else {
                    this.reset()
                }
                return;
            }

        },
        playerAttack: function (hitPlayer) {
            this.monsterEnergy -= hitPlayer;
            this.log.unshift({
                isPlayer: true,
                action: "Player Hits Monster For " + hitPlayer
            })
        },
        monsterAttack: function (hitMonster) {
            this.playerEnergy -= hitMonster;
            this.log.unshift({
                isPlayer: false,
                action: "Monster Hits Player For " + hitMonster
            })
        },
        heal: function () {
            var hitMonster = randomPower(3, 20)
            if (this.playerEnergy != 100) {
                this.playerEnergy = this.playerEnergy + 10
                if (this.playerEnergy > 100) {
                    this.playerEnergy = this.playerEnergy - (this.playerEnergy - 100)
                }
            }
            this.log.unshift({
                isPlayer: true,
                action: "Player Heals For " + 10
            })
            this.monsterAttack(hitMonster)

        },
        special: function () {
            var hitPlayer = randomPower(3, 35)
            var hitMonster = randomPower(3, 20)
            this.monsterAttack(hitMonster)
            if (this.playerEnergy <= 0) {
                if (confirm("You Lost New Game?") == true) {
                    this.startGame()
                } else {
                    this.reset()
                }
            }
            this.playerAttack(hitPlayer);
            if (this.monsterEnergy <= 0) {
                if (confirm("You Wong New Game?") == true) {
                    this.startGame()
                } else {
                    this.reset()
                }
                return;
            }
        },
        giveup: function () {
            this.gameInit = false;
            this.playerEnergy = 100
            this.monsterEnergy = 100
            this.log = [];
        },


    }
})


function randomPower(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
