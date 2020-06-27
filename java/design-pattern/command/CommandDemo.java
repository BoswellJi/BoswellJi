import java.util.ArrayList;
import java.util.Stack;

/**
 * 请求发出者（客户）， 请求调用者，请求接收者
 * 
 * 使用场景
 * 1. 工作队列
 * 在调用者类中，执行命令对象的excute方法，任务依次执行；
 * 工作队列类和计算对象之间解耦；
 * 
 * 2. 日志请求
 * 希望将所有动作都记录在日志中，在系统死机后，重新恢复到之前的状态
 * 
 * 
 * 知识点：
 * 1. 序列化，最好只用在对象的持久化上；
 */

/**
 * 客户类 创建命令类，并设置接收者
 */
public class CommandDemo {
  public static void main(String[] args) {
    // 女招待类
    SimpleRemoteControl remote = new SimpleRemoteControl();
    // 厨师类
    Light light = new Light();
    // 命令类
    LightCommand lightOn = new LightCommand(light);

    // 参数化命令
    // 给女招待设置命令
    // 不在乎传入什么命令对象，但是需要实现Command接口
    remote.setCommand(lightOn);

    // 女招待执行命令
    remote.buttonWasPressed();
  }
}

/**
 * 命令对象的统一接口，调用excute就可以让接收者进行相关动作
 */
interface Command {
  void excute();

  void undo();
}

/**
 * 接收者类
 */
class Light {
  /**
   * 行为
   */
  void on() {
  }

  /**
   * 行为
   */
  void off() {
  }
}

/**
 * 命令类 定义了动作和接收者之间的绑定关系
 */
class LightCommand implements Command {
  Light light;

  LightCommand(Light light) {
    this.light = light;
  }

  // 动作
  public void excute() {
    light.on();
  }

  public void undo() {
    light.off();
  }
}

/**
 * 关闭命令类
 */
class LightOffCommand implements Command {
  Light light;

  // 定义接收者
  LightOffCommand(Light light) {
    this.light = light;
  }

  // 定义执行动作
  public void excute() {
    light.off();
  }

  public void undo() {

  }
}

class GarageDoor {
  void on() {
  }

  void off() {
  }
}

class GarageDoorOpenCommand implements Command {

  GarageDoor gd;

  GarageDoorOpenCommand(GarageDoor gd) {
    this.gd = gd;
  }

  public void excute() {
    gd.on();
  }

  public void undo() {
  }
}

class Stereo {
  void on() {
  }

  void setCD() {
  }

  void setVolum() {
  }
}

class StereoCommand implements Command {
  Stereo stereo;

  // 定义接收者
  StereoCommand(Stereo sterro) {
    this.stereo = sterro;
  }

  // 定义接收者动作
  public void excute() {
    stereo.on();
    stereo.setCD();
    stereo.setCD();
  }

  public void undo() {
    // stereo.off();
  }
}

/**
 * 调用者类 持有命令对象，再某个时间点调用命令对象的excute方法，将请求付诸实践
 */
class SimpleRemoteControl {
  Command slot;

  SimpleRemoteControl() {

  }

  /**
   * 客户端，将命令对象设置给调用者
   * 
   * @param command
   */
  void setCommand(Command command) {
    slot = command;
  }

  /**
   * 调用者调用命令对象，执行命令
   */
  void buttonWasPressed() {
    slot.excute();
  }
}

class RemoteControl {
  Command[] onCommands;
  Command[] offCommands;
  Command undoCommand;
  ArrayList<Command> undoCommands = new ArrayList<Command>();
  Stack<Command> undos = new Stack<Command>();

  public RemoteControl() {
    onCommands = new Command[7];
    offCommands = new Command[7];
    Command noCommand = new NoCommand();

    for (int i = 0; i < 7; i++) {
      onCommands[i] = noCommand;
      offCommands[i] = noCommand;
    }
    undoCommand = noCommand;
  }

  // 设置命令
  void setCommand(int slot, Command onCommand, Command offCommand) {
    onCommands[slot] = onCommand;
    offCommands[slot] = offCommand;
  }

  // 执行开始命令
  void onButtonWasPushed(int slot) {
    onCommands[slot].excute();
    // 最后一次执行的命令
    undoCommand = onCommands[slot];
    undoCommands.add(onCommands[slot]);
    undos.add(onCommands[slot]);
  }

  // 执行关闭命令
  void offButtonWasPushed(int slot) {
    offCommands[slot].excute();
    // 组后一次执行的命令
    undoCommand = offCommands[slot];
    undoCommands.add(onCommands[slot]);
    undos.add(onCommands[slot]);
  }

  // 取消命令
  void undoButtonWasPushed() {
    undoCommand.undo();
    undos.pop().excute();
  }

  public String toString() {
    StringBuffer stringBuff = new StringBuffer();
    stringBuff.append("\n-------\n");
    stringBuff.append("");
    return stringBuff.toString();
  }
}

/**
 * 一个空的命令对象，将每个调用者对象都指定命令对象，不需要判断对象是否加载了excute方法 转移处理对象为null的责任
 */
class NoCommand implements Command {
  public void excute() {

  }

  public void undo() {
  }
}

/**
 * 接收者，第三方自定义的类
 */
class CeilingFan {
  static final int HIGH = 3;
  static final int MEDIUM = 2;
  static final int LOW = 1;
  static final int OFF = 0;

  String location;
  int speed;

  CeilingFan(String location) {
    this.location = location;
    this.speed = OFF;
  }

  void high() {
    speed = HIGH;
  }

  void medium() {
    speed = MEDIUM;
  }

  void low() {
    speed = LOW;
  }

  void off() {
    speed = OFF;
  }

  int getSpeed() {
    return speed;
  }
}

/**
 * 对于控制吊扇的高速度的命令
 */
class CeilingFanHighCommand implements Command {
  CeilingFan ceilingFan;
  int prevSpeed;

  CeilingFanHighCommand(CeilingFan ceilingFan) {
    this.ceilingFan = ceilingFan;
  }

  public void excute() {
    prevSpeed = ceilingFan.getSpeed();
    ceilingFan.high();
  }

  public void undo() {

  }
}

/**
 * 对于控制吊扇的低速度的命令
 */
class CeilingFanLowCommand implements Command {
  CeilingFan ceilingFan;
  int prevSpeed;

  CeilingFanLowCommand(CeilingFan ceilingFan) {
    this.ceilingFan = ceilingFan;
  }

  public void excute() {
    prevSpeed = ceilingFan.getSpeed();
    ceilingFan.low();
  }

  public void undo() {

  }
}

/**
 * 宏命令，将其他所有命令都进行执行
 */
class MacroCommand implements Command {
  Command[] commands;

  MacroCommand(Command[] commands) {
    this.commands = commands;
  }

  public void excute() {
    for (int i = 0; i < commands.length; i++) {
      commands[i].excute();
    }
  }

  public void undo() {
    for (int i = 0; i < commands.length; i++) {
      commands[i].undo();
    }
  }
}