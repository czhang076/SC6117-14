# 🚀 C++ Introduction

## 1. Overview and Core Features
* **Paradigm:** Multi-paradigm (Object-Oriented, Procedural, Generic).
* **History:** An extension of the C language, adding classes and OOP features.
* **Memory Management:** Allows for **manual memory management** using pointers (`*`) and operators `new` and `delete`.
* **Syntax:** Heavily relies on **semicolons** and curly braces `{}`.

## 2. Object-Oriented Programming (OOP)
* **Classes & Structs:** Used to define user-defined data types.
* **Encapsulation:** Achieved using `private`, `public`, and `protected` access specifiers.
* **Inheritance:** Allows classes to derive properties and behavior from other classes.
* **Polymorphism:** Achieved via **Function Overloading**, **Operator Overloading**, and **Virtual Functions** (for runtime polymorphism). 
* **Example:**
    ```cpp
    #include <iostream>

    class Animal {
    public:
        void speak() {
            std::cout << "Generic sound." << std::endl;
        }
    };

    class Cat : public Animal {
    public:
        void speak() {
            std::cout << "Meow!" << std::endl; // Overrides base method
        }
    };
    ```

## 3. System Calls Interface
* **Definition:** System calls are the programmatic way a computer program requests a service from the kernel of the operating system.
* **C++ Interface:** While C++ does not define its own system call interface, it inherits and uses the standard C library functions, which often serve as wrappers for OS-specific system calls (e.g., `fork()`, `open()`, `read()`, `write()`).
* **Portability:** Using C++ standard library components (like streams) is preferred for portability over direct system calls.
* **Header Files:** System-level operations usually require C-style headers like `<unistd.h>` (for POSIX systems) or platform-specific libraries.