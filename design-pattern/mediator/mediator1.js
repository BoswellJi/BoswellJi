function Player(name){
  this.points = 0;
  this.name = name;
}

Player.prototype = {
  play(){
    this.points+=1;
    mediator.palyed();
  }
};

const scoreBoard = {
  update(score){
    let i,msg ='';
    for(i in score){
      if(score.hasOwnProperty(i)){
        msg +=i;
      }
    }
    console.log(msg);
  }
};

// 中介者
const mediator = {
  players:{},
  setup(){
    const players = this.players;
    players.home = new Player('Home');
    players.guest = new Player('guest');
  },
  keypress(e){
    if(e.which ===48){
      // 通知对象变更
      mediator.players.home.paly();
    }
  }
};