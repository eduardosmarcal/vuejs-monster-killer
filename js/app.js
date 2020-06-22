new Vue({
  el: '#app',
  data: {
    isPlaying: false,
    playerLife: 100,
    monsterLife: 100,
    logs: [],
  },
  computed: {
    playerProgressBar() {
      if (this.playerLife < 20) {
        return 'danger';
      }
      if (this.playerLife < 50) {
        return 'warning';
      }
      return '';
    },
    monsterProgressBar() {
      if (this.monsterLife < 20) {
        return 'danger';
      }
      if (this.monsterLife < 50) {
        return 'warning';
      }
      return '';
    },
    gameOver() {
      return this.playerLife === 0 || this.monsterLife === 0;
    },
    gameOverFeedback() {
      if (this.monsterLife === 0) {
        return { status: 'win', message: 'You Win! :)' };
      }
      if (this.playerLife === 0) {
        return { status: 'lose', message: 'You Lose! :(' };
      }
      return {};
    }
  },
  methods: {
    init() {
      this.isPlaying = false;
      this.playerLife = 100;
      this.monsterLife = 100;
      this.logs = [];
    },
    newGame() {
      this.init();
      this.isPlaying = true;
    },
    attack(isSpecial = false) {
      const [min, max] = isSpecial ? [9, 14] : [5, 10];

      const playerAttack = this.getRandomInt(min, max);
      this.monsterLife = Math.max(this.monsterLife - playerAttack, 0);
      this.writeLog('player', `The player hit had a damage of ${playerAttack}.`);

      if (this.monsterLife > 0) {
        const monsterAttack = this.getRandomInt(7, 12);
        this.playerLife = Math.max(this.playerLife - monsterAttack, 0);
        this.writeLog('monster', `The monster hit had a damage of ${monsterAttack}.`);
      }
    },
    heal() {
      const playerHeal = this.getRandomInt(12, 17);
      this.playerLife = Math.min(this.playerLife + playerHeal, 100);
      this.writeLog('player', `The player had a heal of ${playerHeal}.`);

      const monsterAttack = this.getRandomInt(7, 12);
      this.playerLife = Math.max(this.playerLife - monsterAttack, 0);
      this.writeLog('monster', `The monster hit had a damage of ${monsterAttack}.`);
    },
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    writeLog(target, message) {
      this.logs.unshift({ class: target, message });
    },
  },
});