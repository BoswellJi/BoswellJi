import java.util.ArrayList;

// orderPizza 只需要知道从工厂中获得一个pizza
// Pizza orderPizza(String type){
// // 生产pizza
// Pizza pizza;

// 这部分随这pizza的种类，会进行不断的变化
// 所以这部分需要放到工厂中去
// if(type.equals("A")){
// pizza = new PizzA();
// }

// // 对pizza的加工
// pizza.prepera();
// pizza.bake();
// pizza.cut();
// }

// 工厂模式

// 抽象pizza
abstract class Pizza {
  String name;
  String dough;
  ArrayList al = new ArrayList<Pizza>();

  void prepera() {
  }

  void bake() {
  }

  void cut() {
  }
}

// 具体pizza
class APizza extends Pizza {
  APizza() {
    name = "A";
  }
}

class BPizza extends Pizza {
  BPizza() {
    name = "B";
  }
}

// pizza商店
class PizzaStore {
  SimplePizzaFactory factory;

  PizzaStore(SimplePizzaFactory factory) {
    this.factory = factory;
  }

  Pizza orderPizza(String type) {
    // 从工厂中获取pizza
    Pizza pizza = factory.createPizza(type);

    // 对pizza进行加工
    pizza.prepera();
    pizza.bake();
    pizza.cut();

    return pizza;
  }
}

// pizza工厂
class SimplePizzaFactory {
  Pizza createPizza(String type) {
    if (type.equals("A")) {
      return new APizza();
    } else {
      return new BPizza();
    }
  }
}

// 抽象工厂模式
// 将createPizza 放回PizzaStore类中，不过要把他设置为抽象方法；
// 为每个加盟店风味创建一个PizzaStore的子类；

abstract class AbsPizzaStore {
  Pizza orderPizza(String type) {
    // Pizza 对象是抽象的，orderPizza并不知道哪些实际的具体类参与进来，这就是‘解耦’
    Pizza pizza;
    pizza = createPizza(type);

    // 对pizza进行加工
    pizza.prepera();
    pizza.bake();
    pizza.cut();

    return pizza;
  }

  // 工厂方法，返回一个产品，抽象产品
  abstract Pizza createPizza(String type);
}

class BJPizzaStore extends AbsPizzaStore {

  // 让每个地方的pizza店，都能够创建自己的pizza
  @Override
  Pizza createPizza(String type) {
    if (type.equals("A")) {
      return new APizza();
    } else {
      return new BPizza();
    }
  }

}

class JSPizzaStore extends AbsPizzaStore {

  // 让每个地方的pizza店，都能够创建自己的pizza
  @Override
  Pizza createPizza(String type) {
    if (type.equals("A")) {
      return new APizza();
    } else {
      return new BPizza();
    }
  }

}

public class FactoryDemo {
  public static void main(String[] args) {
    AbsPizzaStore jSPizzaStore = new JSPizzaStore();
    jSPizzaStore.orderPizza("A");
  }
}