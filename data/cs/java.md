# ☕ Java Introduction

## 1. Platform and Execution
* **Paradigm:** Object-Oriented, strongly and statically typed.
* **Platform:** "Write once, run anywhere" (WORA) via the **Java Virtual Machine (JVM)**.
* **Compilation:** Java source code (`.java`) is compiled into **bytecode** (`.class`), which is then executed by the JVM.


## 2. Core Syntax
* **Main Method:** The entry point for any Java application.
    ```java
    public class Main {
        public static void main(String[] args) {
            System.out.println("Hello, Java!");
        }
    }
    ```
* **Data Types:** Primitive types (`int`, `char`, `boolean`, `double`, etc.) and Reference types (`String`, arrays, objects).
* **Access Modifiers:** `public`, `private`, `protected`.

## 3. Object-Oriented Programming (OOP)
* **Classes:** Blueprint for objects; defined using the `class` keyword.
* **Objects:** Instances of a class, created using the `new` keyword.
* **Inheritance:** Achieved using the `extends` keyword (single inheritance).
* **Interfaces:** Define a contract of methods that implementing classes must adhere to (achieves multiple inheritance of behavior).
    ```java
    public class Car {
        private String make; // Encapsulated data

        // Constructor
        public Car(String make) {
            this.make = make;
        }

        public String getMake() {
            return this.make;
        }
    }
    ```
* **Polymorphism:** Method **Overloading** (same name, different parameters) and **Overriding** (same name/parameters in subclass).