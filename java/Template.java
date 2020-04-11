
abstract class Game {
  abstract void initilaize();

  abstract void startPlay();

  abstract void endPlay();

  public final void play() {
    initilaize();
    startPlay();
    endPlay();
  }
}

class Circket extends Game {
  @Override
  void startPlay() {
    System.out.println("circket");
  }

  @Override
  void initilaize() {
    // TODO Auto-generated method stub

  }

  @Override
  void endPlay() {
    // TODO Auto-generated method stub

  }
}

class Football extends Game {

  @Override
  void initilaize() {
    // TODO Auto-generated method stub
    System.out.println("Football");
  }

  @Override
  void startPlay() {
    // TODO Auto-generated method stub

  }

  @Override
  void endPlay() {
    // TODO Auto-generated method stub

  }

}

public class Template {
  public static void main(String[] args) {
    Game game = new Circket();
    game.play();
    game = new Football();
    game.play();
  }
}