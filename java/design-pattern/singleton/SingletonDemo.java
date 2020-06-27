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

/**
 * java1.2之前的bug,因为单例只有一个实例所以，会被垃圾回收器当作垃圾清除掉，需要用一个全局引用来保护单例
 */
class Singleton {

  // 解决方案1：
  // 直接在静态处理化器中创建单例，可以保证先程安全
  // jmv在加载这个类时，马上创建了唯一的单例，jmv保证在任何先程访问实例之前创建实例，所以可以保证接下来的先程安全
  // private static Singeton instance = new Singleton();

  private volatile static Singleton instance;

  private Singleton() {
  }

  /**
   * 解决方案2： 多线程导致的问题： 1. 线程同时进入方法，导致产生不同的实例
   * 
   * 解决方案： 1. synchronized
   * 关键字迫使每个进入这个方法之前，要先等侯别的先程离开这个方法，这样不会有两个线程可以同时进入这个方法，这样只会产生同一个实例
   * 
   * 带来的问题： 1. 同步会降低性能（只需要在第一次生成实例的时候同步，生成之后就不需要在进行同步处理了
   */
  // synchronized static Singleton getInstance() {
  // if (instance == null) {
  // instance = new Singleton();
  // }
  // return instance;
  // }

  /**
   * 解决方案3：
   * 双重检查加锁
   * 
   * 问题：
   * volatile关键字，在java5以下，会导致双重检查加锁失效
   */
  static Singleton getInstance() {
    if (instance == null) {
      synchronized (Singleton.class) {
        if (instance == null) {
          instance = new Singleton();
        }
      }
    }
    return instance;
  }
}