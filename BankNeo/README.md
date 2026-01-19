<h1>🏦 BankNeo — Mini Banking App</h1>

BankNeo is a mini banking web application built with Vue 3, TypeScript, Pinia, and Tailwind CSS.
It simulates core banking functionality such as transfers, deposits, account management, transaction history, and dark mode — without a backend.

This project focuses on realistic banking rules, strong validation, and clean UI/UX.

✨ Features
🏦 Accounts

Two predefined accounts:

Zichtrekening

Spaarrekening

Each account includes:

ID

Owner name

Account type

Card number

Balance

Accounts displayed as cards with formatted balances (€ 1.234,56)

💸 Payments (Transfers)

Transfer money between accounts

Account selection via dropdowns (no manual input)

Live balance preview

Validation rules:

Source and destination account required

Cannot transfer to the same account

Amount must be greater than 0

Amount must not exceed available balance

Maximum 2 decimal places

Success feedback shown after transfer (auto-clears)

Transfer is added to transaction history

🏧 Deposits

Deposit money into an account (ATM-like)

Validation rules:

Account selection required

Amount must be greater than 0

Maximum deposit per transaction: €1000

Maximum 2 decimal places

Success feedback shown after deposit (auto-clears)

Deposit is added to transaction history

📜 Transactions

Unified transaction history for:

Transfers

Deposits

Shows most recent first

Limited to last 10 transactions

Displays:

Transaction type

Date & time

Account name + account type (no raw IDs)

Amount (green for deposits, red for transfers)

🌗 Dark Mode

Global dark mode toggle

Implemented with Tailwind dark: variants

Applies consistently to:

Pages

Cards

Forms

Navigation

🔐 Validation & Safeguards
💰 Money Input

Only numeric input allowed

Uses comma as decimal separator

Automatically limits input to 2 decimal places

Invalid characters are stripped

Values are formatted on blur (0,00 → 10,50)

❌ Invalid Operations Prevented

No negative balances

No transfers to the same account

No empty form submissions

No invalid amounts

No deposits above €1000

Action buttons disabled when input is invalid

🗂 State Management

Centralized with Pinia

Accounts and transactions persisted using LocalStorage

Data survives page refresh

Clean separation between:

Business logic (store)

UI components
