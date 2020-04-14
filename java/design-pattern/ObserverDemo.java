import java.util.ArrayList;
import java.util.Observable;
import java.util.Observer;

public class ObserverDemo {
  public static void main(String[] args) {
    WeatherData weat = new WeatherData();
    weat.registerObserver(new Test1Display());
  }
}

interface Subject {
  void registerObserver(Observer o);

  void removeObserver(Observer o);

  void notifyObserver();
}

interface DisplayElement {
}

class WeatherDataObservable extends Observable {

}

class Test2Observer implements Observer {

  @Override
  public void update(Observable o, Object arg) {
    // TODO Auto-generated method stub

  }

}

// 推模型
class WeatherData implements Subject {

  private ArrayList observers;

  public WeatherData() {
    observers = new ArrayList<Observer>();
  }

  @Override
  public void registerObserver(Observer o) {
    observers.add(o);
  }

  @Override
  public void removeObserver(Observer o) {
    int i = observers.indexOf(o);
    if (i >= 0) {
      observers.remove(i);
    }
    observers.remove(o);
  }

  @Override
  public void notifyObserver() {
    for (int i = 0, len = observers.size(); i < len; i++) {
      Observer o = (Observer) observers.get(i);

    }
  }

  void measurementChanged() {
    notifyObserver();
  }

  void setMeasurement() {
    notifyObserver();
  }
}

class Test1Display implements Observer, DisplayElement {

  public void Test1Display() {
    // 初始化
  }

  void dispaly() {
    System.out.println("天气");
  }

  @Override
  public void update(Observable o, Object arg) {
    // TODO Auto-generated method stub

  }

}

// second
class W1 extends Observable {

  private float temp = 1;
  private float hum = 2;

  public W1() {
  }

  void measure() {
    setChanged();
    notifyObservers();
  }

  void setMeasure() {
    measure();
  }

  float getTemp() {
    return temp;
  }

  float getHum() {
    return hum;
  }

}


// 拉模型
class O1 implements Observer {

  Observable observable;
  private float temp;
  private float hum;

  public O1(Observable o) {
    observable = o;
    observable.addObserver(this);
  }

  @Override
  public void update(Observable o, Object arg) {
    if (o instanceof W1) {
      W1 w1 = (W1) o;
      this.temp = w1.getTemp();
      this.hum = w1.getHum();
      display();
    }
  }

  void display() {
    System.out.println("展示");
  }

}