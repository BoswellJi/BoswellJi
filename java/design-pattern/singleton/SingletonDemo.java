public class SingletonDemo {
  public static void main(String[] args) {

  }
}

class MyClass {
  private MyClass() {
  }

  static MyClass getInstance() {
    return new MyClass();
  }
}

class Singleton {
  private static Singleton instance;

  private Singleton() {
  }

  static Singleton getInstance() {
    if (instance == null) {
      instance = new Singleton();
    }
    return instance;
  }
}