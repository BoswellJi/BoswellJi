
public class Demo {
  public static void main(String[] args) {
    Duck mallard = new MallarDuck();
    mallard.performFly();
    mallard.performQuack();
    // 运行时修改鸭子的飞行模式
    mallard.setFlyBehavior(new FlyNoWay());
  }
}

interface FlyBehavior {
  void fly();
}

interface QuackBehavior {
  void quack();
}

class FlyWings implements FlyBehavior {

  @Override
  public void fly() {
    // TODO Auto-generated method stub

  }

}

class FlyNoWay implements FlyBehavior {

  @Override
  public void fly() {
    // TODO Auto-generated method stub

  }

}

class Quack implements QuackBehavior {

  @Override
  public void quack() {
    // TODO Auto-generated method stub

  }

}

class squeak implements QuackBehavior {

  @Override
  public void quack() {
    // TODO Auto-generated method stub

  }

}

abstract class Duck {

  FlyBehavior flyBehavior;
  QuackBehavior quackBehavior;

  public void swim() {
  }

  public abstract void display();

  /**
   * 因为fly 和quack 动作，每个鸭子的实现都不一样是动态的，
   * 所以，单独作为接口，给不同的子类型进行实现，在运行时进行动态的调用；
   */

  public void performFly() {
    flyBehavior.fly();
  }

  public void performQuack() {
    quackBehavior.quack();
  }

  public void setFlyBehavior(FlyBehavior fb){
    flyBehavior = fb;
  }

  public void setQuackBehavior(QuackBehavior qb){
    quackBehavior = qb;
  }
}

class MallarDuck extends Duck {
  @Override
  public void display() {
    System.out.println("MallarDuck");
  }

  public void mallardDuck(){
    flyBehavior = new FlyWings();
    quackBehavior = new Quack();
  }
}

class RedHeadDuck extends Duck {
  @Override
  public void display() {
    System.out.println("RedHeadDuck");
  }
}

// 鸭鸣器
class Duckcall implements QuackBehavior{

  @Override
  public void quack() {
    // TODO Auto-generated method stub

  }
  
}