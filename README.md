# OBS Automation with Puppeteer

This project automates login and navigation for [Amasya University OBS](https://obs.amasya.edu.tr/oibs/std/login.aspx) using Puppeteer.

## 🚀 Features
- Opens the OBS login page.
- Captures the CAPTCHA image.
- Attempts to solve the CAPTCHA using Google.
- Logs in with credentials from `.env`.
- Navigates to the "Ders Kayıt" section.
- (WIP) Handles interaction with iframes.

## 🛠️ Setup

### 1. Install Dependencies
Ensure you have [Node.js](https://nodejs.org/) installed. Then, run:

```sh
npm install
```

### 2. Create a `.env` File
Add your credentials to a `.env` file:

```
usrname=your_username
password=your_password
```

### 3. Run the Script
Execute the script with:

```sh
node index.js
```

## 🏗️ TODO
- Properly handle CAPTCHA solving.
- Interact with iframe content after navigation.

## ⚠️ Disclaimer
This script is for educational purposes only. Use responsibly and ensure compliance with the website's policies.

---

✉️ Feel free to contribute or raise issues!