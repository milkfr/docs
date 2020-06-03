---
title: 数据类型
---

## 基本类型
### 基本类型资料

| 基本类型 | 大小 | 最小值 | 最大值 | 包装类型 | 初始值 |
| --------|:---:|:-----:|:-----:|:--------:|:-----:|
| boolean | - | - | - | Boolean | false |
| char | 16bits | Unicode 0 | Unicode 2^16-1 | Character | \u0000(null) |
| byte | 8bits | -128 | +127 | Byte | (byte)0 |
| short | 16bits | -2^15 | +2^15-1 | Short | (short)0 |
| int | 32bits | -2^31 | +2^31-1 | Integer | 0 |
| long | 64bits | -2^63 | +2^63-1 | Long | 0L |
| float | 32bits | IEEE754 | IEEE754 | Float | 0.0f |
| double | 64bits | IEEE754 | IEEE754 | Double | 0.0d |
| void | — | — | — | Void | - |

boolean类型的大小没有明确的规定，通常定义为取字面值`true`和`false`，和JVM实现有关，通常是int类型的大小，因为32位对CPU寻址等有高效存取的特点

### 默认值
如果类的成员变量是基本类型，那么在类初始化时，这些类型会被赋予一个初始值

上面类型的默认值仅在Java初始化类的时候才会被赋予，这种方式确保类基本类型的字段始终能被初始化，从而减少了bug的来源

但是这些初始值对程序来说并不一定是合法或者正确的，为了安全，最好始终显式初始化变量

上面说类初始化时候会赋予默认值，所以默认值赋予不适用于局部变量，比如方法中定义的数据，程序员需要主动初始化，编译器会警告报错

### 包装类型
上面基本类型中都有包装类型，基本类型都对应包装类型，基本类型与其对应的包装类型之间的赋值通过自动装箱和拆箱完成

```java
Integer x = 2;  // 装箱
int y = x;  // 拆箱
```

::: danger 未完成
基本类型有自己对应对包装类型，如果希望在堆内存里表示基本类型的数据，就需要用到它们的包装类，原因具体在之后的章节 Java On 8
:::

### 缓存池
```java
Integer x = new Integer(123);
Integer y = new Integer(123);
System.out.println(x == y);  // false
Integer a = Integer.valueOf(123);
Integer b = Integer.valueOf(123);
System.out.println(a == b);  // true
```

`new Integer(123)`和`Integer.valueOf(123)`存在区别

* `new Integer(123)`每次都会新建一个对象
* `Integer.valueOf(123)`会使用缓存池的对象，多次调用会取得同一个对象的引用

我们看一下`Integer.valueOf`方法的实现

```java
public static Integer valueOf(int i) {
    if (i >= IntegerCache.low && i <= IntegerCache.high)
        return IntegerCache.cache[i + (-IntegerCache.low)];
    return new Integer(i);
}
```

判断值在缓存池范围内，就直接返回缓存池内容，不然新建一个对象

我们再来看看Integer缓存池的实现

```java
private static class IntegerCache {
    static final int low = -128;
    static final int high;
    static final Integer cache[];

    static {
        // high value may be configured by property
        int h = 127;
        String integerCacheHighPropValue =
            sun.misc.VM.getSavedProperty("java.lang.Integer.IntegerCache.high");
        if (integerCacheHighPropValue != null) {
            try {
                int i = parseInt(integerCacheHighPropValue);
                i = Math.max(i, 127);
                // Maximum array size is Integer.MAX_VALUE
                h = Math.min(i, Integer.MAX_VALUE - (-low) -1);
            } catch( NumberFormatException nfe) {
                // If the property cannot be parsed into an int, ignore it.
            }
        }
        high = h;

        cache = new Integer[(high - low) + 1];
        int j = low;
        for(int k = 0; k < cache.length; k++)
            cache[k] = new Integer(j++);

        // range [-128, 127] must be interned (JLS7 5.1.7)
        assert IntegerCache.high >= 127;
    }

    private IntegerCache() {}
}
```

大意是将`-128~127`赋值到缓存池中

通过上面的探究，我们可以预计，如果数值在缓存池中，那么`new Integer`和`Integer.valueOf`是一样的

测试一样的确如此，如果199大于127就是一样的

```java
Integer a = Integer.valueOf(199);
Integer b = Integer.valueOf(199);
System.out.println(a == b);  // false
```

编译器在自动装箱的过程中会调用`valueOf`方法，因此多个Integer实例通过自动装箱来创建并且值相同且在缓存池范围中，就会引用相同的对象

```java
Integer m = 113;
Integer n = 113;
System.out.println(m == n);  // true
Integer a = 188;
Integer b = 188;
System.out.println(a == b);  // false
```

不同基本类型的缓存池不一样，但原理应该差不多

## 高精度类型
在Java中有两种类型的数据可用于高精度的计算，是`BigInteger`和`BigDecimal`，尽管它们大致可以划归为"包装类型"，但是它们并没有对应的基本类型

这两个类进行运算需要调用它们的方法而非运算符

BigInteger支持任意精度的整数，可用于精确表示任意大小的整数值，同时运算过程中不会丢失精度，BigDecimal支持任意精度的定点数字，可以进行精确的货币计算

由于涉及到的计算量更多，所以运算速度会慢一些，但换来了精度

::: danger 未完成
基本类型如何丢失精度和原因
:::

## 数组类型
C和C++中的数组是内存块，使用上存在溢出等风险

Java处于安全考虑，数组使用前需要被初始化，并且不能访问数组长度以外的数据

这种范围检查，是以每个数组上少量的内存开销和运行时检查下标的额外时间为代价的，但由此换来的安全性和开发效率的提高是值得的

当创建对象数组时，实际上是创建了一个引用数组，并且每个引用的初始值为null，在使用该数组之前，我们必须为每个引用指定一个对象，如果我们尝试使用null的引用，则会运行时报错，因此，在Java中就防止了数组操作的常规错误

我们还可以创建基本类型的数组，编译器通过将该数组的内存全部置为零来保证初始化

在Java中，数组是相同类型的、用一个标识符名称封装到一起的一个对象序列或基本类型数据序列

```java
int[] a = { 1, 2, 3, 4, 5 };
int[] a = new int[rand.nextInt(20)];
```

### 数组的引用传递
```java
int[] a1 = { 1, 2, 3, 4, 5 };
int[] a2;
a2 = a1;
for (int i = 0; i < a2.length; i++) {
    a2[i] += 1;
}
for (int i = 0; i < a1.length; i++) {
    System.out.println(a1[i]);  // 2,3,4,5,6
}
```

Java中将一个数组赋值给另一个数组，只是复制了一个引用

### 可变参数列表
```
static class A {}

static void printArray(Object... args) {
    for (Object obj: args) {
        System.out.print(obj + " ");
    }
    System.out.println();
}

public static void main(String[] args) {
    printArray(47, (float) 3.14, 11.11);  // 47 3.14 11.11  
    printArray(47, 3.14F, 11.11);  // 47 3.14 11.11 
    printArray("one", "two", "three");  // one two three 
    printArray(new A(), new A(), new A());  // Test$A@61bbe9ba Test$A@610455d6 Test$A@511d50c0 
    printArray((Object[]) new Integer[] { 1, 2, 3, 4, 5 });  // 1 2 3 4 5
    printArray();  // Empty list is ok
}
```

`(Object[]) new Integer[] { 1, 2, 3, 4, 5 })`并不会执行转化，从最后一组案例表明可变参数个数可以为0

可变参数虽然方便，但也增加了方法重载的复杂性

比如如果有多个可变参数的重载时，或者类型可以替代时，或者自动装箱导致类型变化时，就容易出现错误

```java
static void f(float i, Character... args) {
    System.out.println(i);
}

//    static void f(Character... args) {
//        System.out.println("second");
//    }

public static void main(String[] args) {
    f(1, 'a');  // 1.0
    f('a', 'b');  // 97.0
}
```

上面例子编译不通过，所以在注意在重载中使用可变参数

::: danger 未完成
数组需要进一步详细
:::

## 枚举类型
enum也是一个类，可以作为类使用，有自己的一些顺序方法等，常用在switch语句中

```java
static enum Number {
    FIRST, SECOND, THIRD, FOURTH, FIFTH
}

static void test(Number number) {
    switch(number) {
        case FIRST:
            System.out.println("1");
            break;
        case SECOND:
            System.out.println("2");
            break;
        case THIRD:
            System.out.println("3");
            break;
        case FOURTH:
            System.out.println("4");
            break;
        case FIFTH:
            System.out.println("5");
            break;
    }
}

public static void main(String[] args) {
    Number first = Number.FIRST;
    System.out.println(first);
    for (Number n: Number.values()) {
        System.out.println(n + ", ordinal" + n.ordinal());
        test(n);
    }
}
```

输出为

```
FIRST
FIRST, ordinal0
1
SECOND, ordinal1
2
THIRD, ordinal2
3
FOURTH, ordinal3
4
FIFTH, ordinal4
5
```

## String
我们写程序的大部分操作其实都是在操作String，因此String的学习是非常重要的

### String的不可变
查看String类定义

```java
public final class String
    implements java.io.Serializable, Comparable<String>, CharSequence {
    /** The value is used for character storage. */
    private final char value[];
}
```

String被声明为final，不可被继承

内部使用char数据存储数据，该数组被声明为final，意味着value数组初始化之后就不能在引用其他数组，并且String内部没有改变value数组的方法，因此可以保证String不可变

不可变的好处

* 可以缓存hash值
* String Pool的需要
* 线程安全

```java
String s1 = new String("aaa");
String s2 = new String("aaa");
System.out.println(s1 == s2);  // false
String s3 = "aaa";
System.out.println(s1.intern() == s3);  // true
String s4 = "bbb";
String s5 = "bbb";
System.out.println(s4 == s5);  // true
```

例子和上面谈到基础类型的缓存池相似，`String.intern()`方法取得一个对象引用，首先将引用的对象放到String Pool中，然后返回这个对象引用

::: danger 意外递归
Java的类基本上继承自Object，如果`toString`方法中进行`"1" + this`等操作，会强制类型转换，调用`this.toString()`，造成无限递归
:::


::: danger String,StringBuffer,StringBuilder
需要继续详细
:::

to be continued ...
