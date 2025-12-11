# ⚙️ C Introduction

## 1. Overview and Memory
* **Paradigm:** Procedural, low-level, compiled language.
* **Use Case:** Operating systems, embedded systems, and performance-critical applications.
* **Pointers:** Fundamental to C, allowing direct manipulation of memory addresses.
    * `&` (address-of operator), `*` (dereference operator).
* **Memory Allocation:** **`malloc()`** and **`free()`** are used for dynamic memory allocation on the **Heap**.
* **Memory Layout:** C programs are typically divided into **Stack**, **Heap**, Data Segment, and Text Segment. 

## 2. Functions and Data Structures
* **Main Function:** `int main(void)` or `int main(int argc, char *argv[])` is the program entry point.
* **Header Files:** Use the `#include` directive to import function declarations (prototypes).
* **Structs:** User-defined composite data types that group related variables (no methods).
    ```c
    struct Point {
        int x;
        int y;
    };
    ```
* **No OOP:** C does not natively support object-oriented concepts like classes, inheritance, or polymorphism.

## 3. System Calls Interface
* **Kernel Interaction:** System calls are the primary means for a C program to interact with the OS kernel (e.g., file I/O, process control).
* **POSIX Standard:** On Unix-like systems, system calls are exposed via the **POSIX API** (Portable Operating System Interface).
* **Common Syscall Wrappers (via libc):**
    * **File Operations:** `open()`, `close()`, `read()`, `write()`.
    * **Process Control:** `fork()` (create new process), `exec()` (execute new program).
    * **Memory:** `sbrk()` or `mmap()`.
* **Direct Invocation:** Syscalls are often invoked indirectly through functions in the C standard library (`libc`).