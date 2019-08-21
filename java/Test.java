class Test {
    int age;
    String name="jmz";
    byte sex= 128;

    public static void main(String[] args) {
        Test t = new Test();
        t.say();
    }

    void say() {
        int num = (int)this.sex;
        System.out.println(this.age + this.name+num);
    }
}