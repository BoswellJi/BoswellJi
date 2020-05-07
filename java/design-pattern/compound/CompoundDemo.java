import java.util.ArrayList;
import java.util.Iterator;
import java.util.Observer1;

/**
 * 鸭子接口
 */
interface Quackable {
  public void quack();
}

/**
 * mallard类型鸭子
 */
class MallardDucK implements Quackable {
  @Override
  public void quack() {
    System.out.println("quack");
  }
}

/**
 * redHead类型鸭子
 */
class RedheadDucK implements Quackable {
  @Override
  public void quack() {
    System.out.println("redhead");
  }
}

class Goose {
  public void honk() {
    System.out.println("hook");
  }
}

/**
 * 适配器类，将两个实例的接口拉到统一
 */
class GooseAdapter implements Quackable {
  Goose goose;

  GooseAdapter(Goose goose) {
    this.goose = goose;
  }

  @Override
  public void quack() {
    goose.honk();
  }
}

/**
 * 装饰器模式，对鸭子实例进行装饰（添加其他行为 1. 给鸭子添加叫声的计数器
 */
class QuackCounter implements Quackable {
  Quackable duck;
  static int numberOfQuacks;

  QuackCounter(Quackable duck) {
    this.duck = duck;
  }

  @Override
  public void quack() {
    duck.quack();
    numberOfQuacks++;
  }

  static int getQuacks() {
    return numberOfQuacks;
  }
}

abstract class AbstractDuckFactory {
  abstract Quackable createMallardDuck();

  abstract Quackable createRedHeadDuck();

  abstract Quackable createDuckCall();

  abstract Quackable createRubberDuck();
}

/**
 * 抽象工厂
 */
class CountingDuckFactory extends AbstractDuckFactory {

  @Override
  Quackable createMallardDuck() {
    return new QuackCounter(new MallardDucK());
  }

  @Override
  Quackable createRedHeadDuck() {
    return new QuackCounter(new RedheadDucK());
  }
}

/**
 * 组合模式
 */
class Flock implements Quackable {
  ArrayList<Quackable> quackers = new ArrayList<Quackable>();

  void add(Quackable quacker) {
    this.quackers.add(quacker);
  }

  @Override
  public void quack() {
    Iterator<Quackable> iterator = quackers.iterator();

    while (iterator.hasNext()) {
      Quackable quacker = (Quackable) iterator.next();
      quacker.quack();
    }
  }
}

interface QuackObservable {
  public void registerObserver1(Observer1 observer);

  public void registerObserver1(Observer1[] observers);

  public void notifyObserver1s();
}

/**
 * 观察者模式， 可观察者（主体）
 */
class Observable implements QuackObservable {

  ArrayList<Observer1> observers = new ArrayList<>();
  QuackObservable duck;

  // 将鸭子实例转变为可观察者
  public Observable(QuackObservable duck) {
    this.duck = duck;
  }

  @Override
  public void registerObserver1(Observer1 observer) {
    // TODO Auto-generated method stub
    observers.add(observer);
  }

  @Override
  public void registerObserver1(Observer1[] observers) {
    // TODO Auto-generated method stub
    for (int i = 0, len = observers.length; i < len; i++) {
      this.observers.add(observers[i]);
    }
  }

  @Override
  public void notifyObserver1s() {
    Iterator<Observer1> iterator = observers.iterator();
    while (iterator.hasNext()) {
      Observer1 observer = (Observer1) iterator.next();
      observer.update(duck);
    }
  }

}

/**
 * 观察者
 */
interface Observer1 {
  void update(QuackObservable duck);
}

class QuackLogist implements Observer1 {

  public void update(QuackObservable duck) {

  }
}

public class CompoundDemo {
  public static void main(String[] args) {
    simulate();
  }

  static void simulate() {
    Quackable mallard = new MallardDucK();
    Quackable desMallard = new QuackCounter(mallard);

    Quackable redHead = new RedheadDucK();
    Quackable desRedHead = new QuackCounter(redHead);

    Quackable gooseDuck = new GooseAdapter(new Goose());

    simulate(desMallard);
    simulate(desRedHead);
    simulate(gooseDuck);
  }

  static void simulate(Quackable quack) {
    quack.quack();
  }
}