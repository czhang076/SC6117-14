# 🖥️ Operating Systems Notes

## 1. Introduction & Structure
* **Definition:** An OS is system software that manages computer hardware and software resources and provides common services for computer programs.
* **The Kernel:** The core component of the OS that has complete control over everything in the system. It is always resident in memory.
* **Dual Mode Operation:**
    * **User Mode:** Restricted access. Applications run here. They cannot directly access hardware.
    * **Kernel Mode:** Unrestricted access to hardware and memory.

## 2. System Calls Interface
* **Definition:** The programmatic interface used by User Mode applications to request services from the Kernel (e.g., accessing a hard drive, creating a new process).
* **The Mechanism:**
    1.  **User Program:** Calls a wrapper function (e.g., `open()` in C standard library).
    2.  **Trap/Interrupt:** The system switches from User Mode to Kernel Mode via a software interrupt or trap instruction.
    3.  **Kernel Handler:** The OS identifies the requested service number and executes the corresponding kernel routine.
    4.  **Return:** The OS switches back to User Mode and returns the result (or error code) to the application.
    [Image of system call user mode kernel mode diagram]
* **Categories of System Calls:**
    * **Process Control:** `fork()`, `exec()`, `exit()`, `wait()`.
    * **File Management:** `open()`, `read()`, `write()`, `close()`.
    * **Device Management:** `ioctl()`, `read()`, `write()`.
    * **Information Maintenance:** `getpid()`, `time()`.
    * **Communication:** `pipe()`, `shmget()`, `mmap()`.

## 3. Process Management
* **Process:** An instance of a program in execution. It has its own memory space (Stack, Heap, Data, Text).
* **Process Control Block (PCB):** Data structure storing information about a specific process (e.g., Process ID,