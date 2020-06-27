import java.awt.event.ActionEvent;
import java.util.ArrayList;
import javax.sound.midi.MetaEventListener;
import javax.sound.midi.MetaMessage;
import javax.sound.midi.Sequencer;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JMenu;
import javax.swing.JMenuItem;
import javax.swing.JTextField;

import sun.net.httpserver.HttpServerImpl;

import java.awt.event.ActionListener;
import java.io.IOException;
import java.net.InetSocketAddress;


/**
 * Model-View-Controller
 * 
 * 1. Mvc是一种范型 2. 构造代码成为功能段 3. 为达到复用，你必须让边界干净
 * 
 * Model: 1. 模型对视图和控制器没有依赖； 2. 视图和控制器都会向模型注册成为观察者； 3. 系统核心，实现了模型处理的所有逻辑； 4.
 * 负责维护所有的数据，状态和应用逻辑；
 * 
 * View: 1. 委托控制器，处理用户动作； 2. 对视图来说，控制器是策略，也就是知道如何处理用户动作的对象； 3.
 * 视图只关注表现，控制器关注把用户输入转为模型上的行为； 4. 视图是GUI组件的组合，顶层组件包含其他组件直到叶子节点； 5.
 * 视图的所有动作都不会被送到控制器；
 * 
 * Controller 1. 获取输入，然后对模型做出请求；
 * 
 * 
 * 使用模式： 1. 使用观察者模式来观察模型的状态，让控制器和视图可以随最新的状态改变而更新；（观察者模式提供信号通知 2.
 * 控制器和视图实现策略模式，控制器是视图的行为，如果希望有不同的行为，可以直接换一个控制器；（策略模式提供策略选择 3.
 * 视图内部使用组合模式来管理窗口，按钮，以及其他显示组件；（组合模式管理大量对象
 */

public class Mvc {
  public static void main(String[] args) {
    BeatModelInterface model = new BeatModel();
    new BeatController(model);
  }
}

/**
 * 模型接口
 */
interface BeatModelInterface {
  // 控制器本身使用
  void initialize();

  void on();

  void off();

  void setBPM(int bpm);

  // 视图与控制器访问
  int getBPM();

  void registerObserver(BeatObserver o);

  void removeObserver(BeatObserver o);

  void registerObserver(BPMObserver o);

  void removeObserver(BPMObserver o);
}

/**
 * 模型类
 */
class BeatModel implements BeatModelInterface, MetaEventListener {

  Sequencer sequencer;
  ArrayList<BeatObserver> beatObservers = new ArrayList<>();
  ArrayList<BPMObserver> bpmObservers = new ArrayList<>();
  int bpm = 90;

  @Override
  public void meta(MetaMessage meta) {
    // TODO Auto-generated method stub

  }

  @Override
  public void initialize() {
    // TODO Auto-generated method stub

  }

  @Override
  public void on() {
    // TODO Auto-generated method stub

  }

  @Override
  public void off() {
    // TODO Auto-generated method stub

  }

  @Override
  public void setBPM(int bpm) {
    // TODO Auto-generated method stub

  }

  @Override
  public int getBPM() {
    // TODO Auto-generated method stub
    return 0;
  }

  @Override
  public void registerObserver(BeatObserver o) {
    // TODO Auto-generated method stub

  }

  @Override
  public void removeObserver(BeatObserver o) {
    // TODO Auto-generated method stub

  }

  @Override
  public void registerObserver(BPMObserver o) {
    // TODO Auto-generated method stub

  }

  @Override
  public void removeObserver(BPMObserver o) {
    // TODO Auto-generated method stub

  }

}

interface BeatObserver {

}

interface BPMObserver {

}

/**
 * 视图类
 */
class DJView implements ActionListener, BeatObserver, BPMObserver {
  BeatModelInterface model;
  ControllerInterface controller;

  JLabel bpmLabel;
  JTextField bpmTextField;
  JButton setBPMButton;
  JButton increaseBPMButton;
  JButton decreaseBPMButton;
  JMenu menu;
  JMenuItem startMenuItem;
  JMenuItem stopMenuItem;

  DJView(ControllerInterface controller, BeatModelInterface model) {
    this.controller = controller;
    this.model = model;
  }

  void createControls() {
  }

  void disableStopMenuItem() {
    stopMenuItem.setEnabled(false);
  }

  void enableStartMenuItem() {
    startMenuItem.setEnabled(true);
  }

  void disableStartMenuItem() {
    startMenuItem.setEnabled(false);
  }

  @Override
  public void actionPerformed(ActionEvent e) {
    if (e.getSource() == setBPMButton) {
      int bpm = Integer.parseInt(bpmTextField.getText());
      controller.setBPM(bpm);
    } else if (e.getSource() == increaseBPMButton) {
      controller.increaseBPM();
    } else if (e.getSource() == decreaseBPMButton) {
      controller.decreaseBPM();
    }
  }
}

/**
 * 控制器接口
 */
interface ControllerInterface {
  void start();

  void stop();

  void increaseBPM();

  void decreaseBPM();

  void setBPM(int bpm);
}

/**
 * 控制器类
 */
class BeatController implements ControllerInterface {

  BeatModelInterface model;
  DJView view;

  BeatController(BeatModelInterface model) {
    // 实例化模型
    this.model = model;
    // 实例化视图
    view = new DJView(this, model);
    // view.createView();
    view.createControls();
    view.disableStartMenuItem();
    view.enableStartMenuItem();
    view.disableStartMenuItem();
    // 初始化模型
    model.initialize();
  }

  @Override
  public void start() {
    // TODO Auto-generated method stub

  }

  @Override
  public void stop() {
    // TODO Auto-generated method stub

  }

  @Override
  public void increaseBPM() {
    // TODO Auto-generated method stub

  }

  @Override
  public void decreaseBPM() {
    // TODO Auto-generated method stub

  }

  @Override
  public void setBPM(int bpm) {
    // TODO Auto-generated method stub

  }

}

/**
 * Heart模型接口
 */
interface HeartModelInterface {
  int getHeartRate();

  void registerObserver();
}

/**
 * 适配器类 1. 为了将其他的模型接口与当前接口进行适配； 2. 同一个视图展示不同的模型，所以需要将模型接口进行适配；
 */
class HeartAdapter implements BeatModelInterface {
  HeartModelInterface heart;

  /**
   * 实例化时，获取模型实例，对模型接口进行适配
   * 
   * @param heart
   */
  HeartAdapter(HeartModelInterface heart) {
    this.heart = heart;
  }

  @Override
  public void initialize() {
    // TODO Auto-generated method stub

  }

  @Override
  public void on() {
    // TODO Auto-generated method stub

  }

  @Override
  public void off() {
    // TODO Auto-generated method stub

  }

  @Override
  public void setBPM(int bpm) {
    // TODO Auto-generated method stub

  }

  @Override
  public int getBPM() {
    // TODO Auto-generated method stub
    return 0;
  }

  @Override
  public void registerObserver(BeatObserver o) {
    // TODO Auto-generated method stub

  }

  @Override
  public void removeObserver(BeatObserver o) {
    // TODO Auto-generated method stub

  }

  @Override
  public void registerObserver(BPMObserver o) {
    // TODO Auto-generated method stub

  }

  @Override
  public void removeObserver(BPMObserver o) {
    // TODO Auto-generated method stub

  }
}

/**
 * Heart 模型的控制器
 */
class HeartController implements ControllerInterface {
  HeartModelInterface model;
  DJView view;

  HeartController(HeartModelInterface model) {
    this.model = model;
    view = new DJView(this, new HeartAdapter(model));
  }

  @Override
  public void start() {
    // TODO Auto-generated method stub

  }

  @Override
  public void stop() {
    // TODO Auto-generated method stub

  }

  @Override
  public void increaseBPM() {
    // TODO Auto-generated method stub

  }

  @Override
  public void decreaseBPM() {
    // TODO Auto-generated method stub

  }

  @Override
  public void setBPM(int bpm) {
    // TODO Auto-generated method stub

  }
}

class DJView1 extends HttpServerImpl {

  DJView1(InetSocketAddress arg0, int arg1) throws IOException {
    super(arg0, arg1);
    
  }

}