# 📚 Note AI: Knowledge Cluster Documentation

## Overview
This repository contains a dataset of Markdown notes covering **Finance**, **Economics**, and **Computer Science**. The goal of this project is to power a clustering AI that allows users to search for a keyword (e.g., "Interest Rate") and retrieve all related notes across different domains.

## 📂 File Structure

### Finance
* `Corporate_Finance.md`: Internal firm decisions (Capital Budgeting, WACC).
* `Financial_Markets.md`: External trading environments (Stocks, Bonds, EMH).
* `Risk_Management.md`: Measuring and mitigating loss (VaR, RWA).
* `Private_Equity.md`: Buying companies using leverage (LBO, PE-specific DCF).

### Economics
* `Macroeconomics.md`: The economy as a whole (GDP, Inflation, Solow Model).
* `International_Economics.md`: Global trade and currency (BoP, Exchange Rates).
* `Banking_Economics.md`: Financial intermediaries and regulation (Basel III, Money Creation).

### Computer Science
* `Python_Introduction.md`: Scripting, OOP, and syntax.
* `Java_Introduction.md`: JVM, strict OOP, and compilation.
* `Cpp_Introduction.md`: Systems programming, memory management, and OOP.
* `C_Introduction.md`: Low-level procedural programming and system calls.
* `Operating_Systems.md`: Process management, memory, and the kernel.

---

## 🔗 Concept Clusters & Overlaps
This section defines the "semantic edges" between files. If a user searches for a keyword in Column A, the AI should recommend notes from Column B.

### 1. The "Interest Rate" Cluster
* **Primary Concept:** The cost of borrowing and the reward for saving.
* **Connections:**
    * **`Macroeconomics.md`:** Describes how Central Banks set base rates (Monetary Policy/LM Curve).
    * **`Banking_Economics.md`:** Explains how those base rates are transmitted to consumers and how banks manage the risk of rate changes (ALM).
    * **`Financial_Markets.md`:** Shows how rates determine Bond Prices (inverse relationship).
    * **`Corporate_Finance.md`:** Uses rates to calculate the Cost of Debt in the WACC formula.
    * **`Private_Equity.md`:** High rates increase the cost of debt in an LBO, lowering returns.

### 2. The "Risk" Cluster
* **Primary Concept:** Uncertainty regarding financial loss.
* **Connections:**
    * **`Risk_Management.md`:** The hub for definitions (Credit, Market, Liquidity Risk) and metrics (VaR).
    * **`Banking_Economics.md`:** Applies these metrics specifically to banks via **Risk Weighted Assets (RWA)** and Capital Adequacy (Basel Accords).
    * **`Financial_Markets.md`:** Discusses "Beta" (Systematic Risk) and the Risk-Free Rate (CAPM).
    * **`Corporate_Finance.md`:** Discusses how riskier projects require a higher discount rate.

### 3. The "Valuation" Cluster
* **Primary Concept:** Determining the worth of an asset.
* **Connections:**
    * **`Corporate_Finance.md`:** Introduces the standard **DCF (Discounted Cash Flow)** model.
    * **`Private_Equity.md`:** Modifies the DCF to focus on Entry Valuation and LBO returns (IRR/MOIC).
    * **`Financial_Markets.md`:** Discusses market efficiency—do prices already reflect true value?

### 4. The "System Architecture" Cluster
* **Primary Concept:** How software interacts with hardware.
* **Connections:**
    * **`Operating_Systems.md`:** The core theory (Kernel, Processes, Memory).
    * **`C_Introduction.md`:** The practical application—writing code that makes **System Calls** (e.g., `open()`, `fork()`) to the OS.
    * **`Cpp_Introduction.md`:** Bridges the gap, offering both low-level system access and high-level OOP abstractions.

### 5. The "Global Economy" Cluster
* **Primary Concept:** How countries interact economically.
* **Connections:**
    * **`International_Economics.md`:** Focuses on Exchange Rates and Balance of Payments.
    * **`Macroeconomics.md`:** Connects these to domestic policy (e.g., how Fiscal Policy is less effective with flexible exchange rates).
    * **`Risk_Management.md`:** Includes currency risk (FX risk) as a form of Market Risk.

---

## 🤖 Search Logic (For AI Developers)

When implementing the vector search or keyword matching:

1.  **Direct Match:** If the user searches "WACC", return `Corporate_Finance.md`.
2.  **Cluster Match:** If the user searches "Capital Requirement":
    * Retrieve `Banking_Economics.md` (Direct mention of Basel/CAR).
    * Retrieve `Risk_Management.md` (Underlying concept of RWA).
3.  **Cross-Domain Match:** If the user searches "Memory Management":
    * Retrieve `Operating_Systems.md` (Virtual Memory/Paging).
    * Retrieve `C_Introduction.md` (`malloc`/`free`).
    * Retrieve `Cpp_Introduction.md` (`new`/`delete`).