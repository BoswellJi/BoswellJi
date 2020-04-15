
public class VisitorDemo {
  public static void main(String[] args) {

    ComputerPart computer = new Computer();
    computer.accept(new ComputerPartDisplayVisitor());
  }
}

interface ComputerPart {
  public void accept(ComputerPartVisitor computerPartVisitor);
}

class keyBoard implements ComputerPart {

  @Override
  public void accept(ComputerPartVisitor computerPartVisitor) {
    // TODO Auto-generated method stub

  }

}

class Monitor implements ComputerPart {

  @Override
  public void accept(ComputerPartVisitor computerPartVisitor) {
    // TODO Auto-generated method stub

  }

}

class Keyboard implements ComputerPart {

  @Override
  public void accept(ComputerPartVisitor computerPartVisitor) {
    // TODO Auto-generated method stub

  }

}

class Computer implements ComputerPart {

  ComputerPart[] part;

  public Computer() {
    part = new ComputerPart[] { new Monitor(), new Mouse(), new Keyboard() };
  }

  @Override
  public void accept(ComputerPartVisitor computerPartVisitor) {
    for (int i = 0, len = part.length; i < len; i++) {
      part[i].accept(computerPartVisitor);
    }
    computerPartVisitor.visit(this);
  }

}

class Mouse implements ComputerPart {

  @Override
  public void accept(ComputerPartVisitor computerPartVisitor) {
    // TODO Auto-generated method stub

  }

}

interface ComputerPartVisitor {
  public void visit(Computer computer);

  public void visit(Mouse mouse);

  public void visit(Keyboard keyBoard);

  public void visit(Monitor monitor);
}

// 访问者类
class ComputerPartDisplayVisitor implements ComputerPartVisitor {

  @Override
  public void visit(Computer computer) {
    System.out.println("Displaying Computer.");
  }

  @Override
  public void visit(Mouse mouse) {
    System.out.println("Displaying Mouse.");
  }

  @Override
  public void visit(Keyboard keyboard) {
    System.out.println("Displaying Keyboard.");
  }

  @Override
  public void visit(Monitor monitor) {
    System.out.println("Displaying Monitor.");
  }
}