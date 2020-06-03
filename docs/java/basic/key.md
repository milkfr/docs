---
title: 关键字
autoPrev: datatype
---

## final
### 声明数据
声明数据为常量，可以是编译时常量，也可以是在运行时被初始化后不能被改变的常量

* 对于基本类型，final使数值不变
* 对于引用类型，final使引用不变，也就不能引用其他对象，但是被引用的对象本身是可以修改的

```java
public class Test {

    private int aa = 1;

    public static void main(String[] args) {
        final int x = 1;
        // x = 2  // cannot
        final Test a = new Test();
        // a = new Test();  // cannot
        a.aa = 2;
    }
}
```

### 声明方法
声明方法不能被子类重写

private方法隐式地被指定为final，如果在子类中定义的方法和基类中的一个private方法签名相同，此时子类的方法不是重写基类方法，而是在子类中定义了一个新的方法

### 声明类
声明类不允许被继承

## static
### 静态变量
static关键字定义的变量又被称为静态变量，又称为类变量，也就是说这个变量属于类，类所有的实例都共享静态变量，可以通过类名直接访问它，静态变量在内存中只存在一份

### 静态方法
静态方法在类加载的时候就存在了，不依赖于任何实例，所以静态方法必须有实现，不能是抽象方法

只能访问所属类的静态字段和静态方法，方法中不能有this和super关键字

### 静态语句块
```java
public class Test {

    public Test() {
        System.out.println("test");
    }

    static {
        System.out.println("123");
    }

    public static void main(String[] args) {
        Test a = new Test();  
        // 123
        // test
    }
}
```

静态语句块在类初始化时运行一次，并且在构造函数之前运行

### 静态内部类
```java
public class Outer {
    class Inner {}
    static class StaticInner {}
    public static void main(String[] args) {
        // Inner inner = new Inner();  // cannot
        Outer outer = new Outer();
        Inner inner = outer.new Inner();
        StaticInner staticInner = new StaticInner();
    }
}
```

静态内部类不能访问外部类的非静态的变量和方法

### 静态导包
在使用静态变量和方法时不用在指明ClassName，从而简化代码，但可读性大大降低

```java
import static com.xxx.ClassName.*
```

### 初始化顺序
静态变量和静态语句块优先于实例变量和普通语句块，静态变量和静态语句块的初始化顺序取决于它们在代码中的顺序

```java
public static String staticField = "静态变量";

static {
    System.out.println("静态语句块");
}

public String field = "实例变量";

{
    System.out.println("普通语句块");
}

public Init() {
    System.out.println("构造函数");
}
```

初始化顺序为

* 父类（静态变量、静态语句块）
* 子类（静态变量、静态语句块）
* 父类（实例变量、普通语句块）
* 父类（构造函数）
* 子类（实例变量、普通语句块）
* 子类（构造函数）

to be continued...
