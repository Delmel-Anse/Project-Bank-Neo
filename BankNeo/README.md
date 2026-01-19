<h1>🏦 BankNeo</h1>
<h3>Mini Banking Application (Vue 3 + Pinia + Tailwind)</h3>

<p>
  <strong>BankNeo</strong> is a mini banking web application built with
  <strong>Vue 3</strong>, <strong>TypeScript</strong>, <strong>Pinia</strong>,
  and <strong>Tailwind CSS</strong>.
  It simulates core banking features such as transfers, deposits,
  account management, transaction history, and dark mode —
  <strong>without a backend</strong>.
</p>

<p>
  The project focuses on <strong>realistic banking rules</strong>,
  <strong>strong validation</strong>, and <strong>clean UI/UX</strong>.
</p>

<hr />

<h2>🚀 Features</h2>

<h3>🏦 Accounts</h3>
<ul>
  <li>Two predefined accounts:
    <ul>
      <li><strong>Zichtrekening</strong></li>
      <li><strong>Spaarrekening</strong></li>
    </ul>
  </li>
  <li>Each account contains:
    <ul>
      <li>ID</li>
      <li>Owner name</li>
      <li>Account type</li>
      <li>Card number</li>
      <li>Balance</li>
    </ul>
  </li>
  <li>Accounts are displayed as cards with formatted balances
    (<code>€ 1.234,56</code>)
  </li>
</ul>

<h3>💸 Payments (Transfers)</h3>
<ul>
  <li>Transfer money between accounts</li>
  <li>Account selection via dropdowns (no manual input)</li>
  <li>Live balance preview</li>
  <li>Validation rules:
    <ul>
      <li>Source and destination account required</li>
      <li>Cannot transfer to the same account</li>
      <li>Amount must be greater than 0</li>
      <li>Amount must not exceed available balance</li>
      <li>Maximum <strong>2 decimal places</strong></li>
    </ul>
  </li>
  <li>Success feedback shown after transfer (auto-clears)</li>
  <li>Transfers are added to the transaction history</li>
</ul>

<h3>🏧 Deposits</h3>
<ul>
  <li>Deposit money into an account (ATM-like behavior)</li>
  <li>Validation rules:
    <ul>
      <li>Account selection required</li>
      <li>Amount must be greater than 0</li>
      <li>Maximum deposit per transaction: <strong>€1000</strong></li>
      <li>Maximum <strong>2 decimal places</strong></li>
    </ul>
  </li>
  <li>Success feedback shown after deposit (auto-clears)</li>
  <li>Deposits are added to the transaction history</li>
</ul>

<h3>📜 Transactions</h3>
<ul>
  <li>Unified transaction history for:
    <ul>
      <li>Transfers</li>
      <li>Deposits</li>
    </ul>
  </li>
  <li>Displays <strong>most recent transactions first</strong></li>
  <li>Limited to <strong>last 10 transactions</strong></li>
  <li>Each transaction shows:
    <ul>
      <li>Transaction type</li>
      <li>Date &amp; time</li>
      <li>Account name and account type</li>
      <li>Amount (green for deposits, red for transfers)</li>
    </ul>
  </li>
</ul>

<h3>🌗 Dark Mode</h3>
<ul>
  <li>Global dark mode toggle</li>
  <li>Implemented using Tailwind <code>dark:</code> variants</li>
  <li>Applied consistently across:
    <ul>
      <li>Pages</li>
      <li>Cards</li>
      <li>Forms</li>
      <li>Navigation</li>
    </ul>
  </li>
</ul>

<hr />

<h2>🔐 Validation &amp; Safeguards</h2>

<h3>💰 Money Input Rules</h3>
<ul>
  <li>Only numeric input allowed</li>
  <li>Uses <strong>comma</strong> as decimal separator</li>
  <li>Automatically limited to <strong>2 decimal places</strong></li>
  <li>Invalid characters are stripped</li>
  <li>Values are formatted on blur (<code>0,00</code> → <code>10,50</code>)</li>
</ul>

<h3>❌ Invalid Operations Prevented</h3>
<ul>
  <li>No negative balances</li>
  <li>No transfers to the same account</li>
  <li>No empty form submissions</li>
  <li>No invalid amounts</li>
  <li>No deposits above €1000</li>
  <li>Buttons disabled when forms are invalid</li>
</ul>

<hr />

<h2>🗂 State Management</h2>
<ul>
  <li>Centralized using <strong>Pinia</strong></li>
  <li>Accounts and transactions persisted with <strong>LocalStorage</strong></li>
  <li>Data persists after page refresh</li>
  <li>Clear separation between:
    <ul>
      <li>Business logic (store)</li>
      <li>UI components</li>
    </ul>
  </li>
</ul>

<hr />

<h2>🧭 Pages</h2>

<table>
  <thead>
    <tr>
      <th>Page</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Home</td>
      <td>Overview, total balance, quick actions</td>
    </tr>
    <tr>
      <td>Accounts</td>
      <td>Account cards</td>
    </tr>
    <tr>
      <td>Payments</td>
      <td>Transfer money</td>
    </tr>
    <tr>
      <td>Deposits</td>
      <td>Deposit money</td>
    </tr>
    <tr>
      <td>Transfers</td>
      <td>Transaction history</td>
    </tr>
  </tbody>
</table>

<hr />

<h2>🛠 Tech Stack</h2>
<ul>
  <li>Vue 3 (Composition API)</li>
  <li>TypeScript</li>
  <li>Pinia</li>
  <li>Vue Router</li>
  <li>Tailwind CSS</li>
  <li>LocalStorage</li>
</ul>

<hr />

<h2>🚀 Getting Started</h2>

<pre><code>npm install
npm run dev</code></pre>

<hr />

<h2>📌 Notes</h2>
<ul>
  <li>No backend required</li>
  <li>Designed for learning and demonstration purposes</li>
  <li>Easily extendable with authentication or API integration</li>
</ul>

<hr />

<h2>📚 Learning Outcomes</h2>
<ul>
  <li>Vue 3 Composition API best practice
