# 🐍 Python Introduction

## 1. Overview and Core Syntax
* **Paradigm:** Interpreted, high-level, dynamically typed language.
* **Design Philosophy:** Emphasizes code readability (using significant **whitespace** and indentation).
* **Hello World:**
    ```python
    print("Hello, Python!")
    ```
* **Data Types:** `int`, `float`, `str`, `bool`, `list`, `tuple`, `dict`, `set`.

## 2. Control Flow and Functions
* **Conditionals:** Uses `if`, `elif`, `else`.
* **Loops:** Uses `for` (to iterate over sequences) and `while`.
* **Functions:** Defined using the `def` keyword.
    ```python
    def greet(name):
        return f"Hello, {name}"
    ```


## 3. Object-Oriented Programming (OOP)
* **Class Definition:** Defined using the `class` keyword.
* **Constructor:** The `__init__` method, which is called when an object is instantiated.
* **Self:** The first argument of instance methods, referring to the instance itself.
* **Example Class:**
    ```python
    class Dog:
        def __init__(self, name, age):
            self.name = name  # Attribute
            self.age = age

        def bark(self):
            return f"{self.name} says woof!"
    
    # Inheritance Example
    class Poodle(Dog):
        def bark(self):
            return "Poodle yips!"
    ```
* **Key OOP Concepts:** **Encapsulation** (bundling data and methods), **Inheritance** (new classes inherit properties/methods), **Polymorphism** (objects taking on many forms).