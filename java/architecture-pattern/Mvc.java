// model
 class Student{
  private String rollNo;
  private String name;

  public String getRollNo(){
      return rollNo;
  }

  public void setRollNo(String rollNo){
      this.rollNo = rollNo;
  }

  public String getName(){
      return name;
  }

  public void setName(String name){
      this.name = name;
  }
}

// view
 class StudentView{
    public void printStudentDetails(String studentName,String studentRollNo){
        System.out.printIn("Student"+studentName+"Roll No"+studentRollNo);
    }
}

// controller
 class StudentController{
    private Student model;
    private StudentView view;

    public StudentController(Student model,StudentView view){
        this.model = model;
        this.view = view;
    }

    public void setStudentName(String name){
        model.setName(name);
    }

    public String getStudentName(){
        return model.getName();
    }

    public void setStudentRollNo(String rollNo){
        mode.setRollNo(rollNo);
    }

    public String getStudentRollNo(){
        return model.getRollNo();
    }

    public void updateView(){
        view.printStudentDetails(model.getName(),model.getRollNo());
    }
}

public class Mvc{
    public static void main(String[] args){
        Student model = studentDatabase();
        StudentView view = new StudentView();
        StudentController controller = new StudentController(model,view);
        controller.updateView();
        controller.setName('fff');
        controller.updateView();
    }

    private static Student studentDatabase(){
        Student student = new Student();
        student.setName('mmm');
        student.setRollNo('1');
        return student;
    }
}