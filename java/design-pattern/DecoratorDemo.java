public class DecoratorDemo {
  public static void main(String[] args) {
    Obj1 obj1 = new Obj1();

    // manual decorator
    Desc1 desc1 = new Desc1(obj1);
    Desc2 desc2 = new Desc2(obj1);
    System.out.println(desc2.cost());
  }
}

abstract class Beverage {
  String description = "unknow beverage";

  String getDescription() {
    return description;
  }

  abstract double cost();
}

abstract class Desc extends Beverage {
  abstract String getDescription();
}


// subject class
class Obj1 extends Beverage {

  Obj1() {
    description = "Obj1";
  }

  @Override
  double cost() {
    return 1.9;
  }

}

class Obj2 extends Beverage {

  Obj2() {
    description = "Obj2";
  }

  @Override
  double cost() {
    return 0.9;
  }

}

// decorator class
class Desc1 extends Desc {

  Beverage bev;

  Desc1(Beverage bev) {
    this.bev = bev;
  }

  @Override
  String getDescription() {
    return bev.getDescription() + "desc1";
  }

  @Override
  double cost() {
    return 0.9 + bev.cost();
  }

}

class Desc2 extends Desc {
  Beverage bev;

  Desc2(Beverage bev) {
    this.bev = bev;
  }

  @Override
  String getDescription() {
    return bev.getDescription() + "desc2";
  }

  @Override
  double cost() {
    return bev.cost() + 0.9;
  }

}