# OBS Automation with Puppeteer

This project automates login and navigation for [Amasya University OBS](https://obs.amasya.edu.tr/oibs/std/login.aspx) using Puppeteer.

## 🚀 Features
- Opens the OBS login page.
- Captures the CAPTCHA image.
- Solves the CAPTCHA using OCR (Optical Character Recognition) with `chrome-lens-ocr`.
- Logs in with credentials from `.env`.
- Navigates to the "Ders Kayıt" section.
- (WIP) Handles interaction with iframes.
- Allows browser session to remain open with a timeout function.

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

This will start the automation process, opening the browser and logging you into the OBS system. It will also attempt to solve the CAPTCHA and navigate to the "Ders Kayıt" section.

### 4. Stop the Browser from Closing
By default, the browser will close after a timeout (roughly 30 seconds, 30*0.8). To stop this from happening, enter `0` in the terminal.

## ⚠️ Disclaimer
This script is for educational purposes only. Use responsibly and ensure compliance with the website's policies.

---

✉️ Feel free to contribute or raise issues!
