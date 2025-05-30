# 📥 KoboToolbox Submissions to Google Sheets Integration

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Last Updated](https://img.shields.io/badge/last%20updated-April%202025-blue)
![Status](https://img.shields.io/badge/status-active-brightgreen)

This project uses **Google Apps Script** to integrate **KoboToolbox submitted responses** into **Google Sheets**, utilizing the official **API v2**.

Each form's responses are automatically saved into a separate sheet within the same spreadsheet, titled **Kobo Toolbox imported questions**.

---

## 🚀 Features
- Connects to **KoboToolbox API v2**.
- Imports **responded questionnaires** (submissions), not just the form structure.
- Writes each form's submissions into a specific Google Sheets tab.
- Clears old data before importing new submissions.
- Includes logging of successes and warnings.
- Simple structure, easy to expand for more forms.
- Automatic hourly updates using Google Apps Script Triggers.

---

<img width="1283" alt="gscript" src="https://github.com/user-attachments/assets/edd62a9a-bb1f-4119-b229-634ecae1e6b4" />


## ⚙️ Setup

### 1. Configure Google Apps Script

- In your Google Sheet named **Kobo Toolbox imported questions**, click **Extensions → Apps Script**.
- Paste the content of the `importKoboSubmissions` script into the editor.

### 2. Add Your Authorization Token

- Go to **Extensions → Apps Script → Project Settings → Script Properties**.
- Add a new property:
  - **Key**: `Authorization`
  - **Value**: Your **KoboToolbox API Token** *(do not include the word `Token`, only the value)*.

 
 Howto get the token: 
 - login in KoboToolbox account.
 - Get the token : https://eu.kobotoolbox.org/token/?format=json

### 3. Define Forms to Import

In the script, edit the constant `FORMS` to list your forms:

```javascript
const FORMS = [
  { asset_uid: "aqsanfCTzw3Ut4eYn93hpp", sheet_name: "responses_formulario1" },
  { asset_uid: "aWv4QZNmBmnkP5PwueZJcl", sheet_name: "responses_formulario2" }
];
```

Each `asset_uid` is the form ID in KoboToolbox, and `sheet_name` is the name of the Google Sheets tab where the data will be saved.

#### How can you check the UID?

1. Start by going to your Kobo account to locate the form ID (uuid). Select the project you wish to query from your list of deployed forms. From here you can get the form ID (uuid) from the URL. The URL of the page you are currently on will follow this format:

https://www.kobo.unhcr.org/#/forms/{uuid}/landing

Copy the string of characters between the two slashes. See below for an example below:

![uid](https://github.com/user-attachments/assets/7dc79372-6ac8-47ef-94a4-bc7fc6055ac6)

### 4. Set Up the Sheets

- Manually create the tabs if needed, or the script will create them automatically.

---

## 🛠️ Run the Import

- In the Apps Script editor, run the `importKoboSubmissions()` function.

This will:
- Fetch the submitted responses from KoboToolbox.
- Write the data into each respective tab in the Google Sheets file.
- Clear old data before each new import.

---

## ⏰ Schedule Automatic Updates

To schedule automatic hourly updates:
- Go to **Triggers → Add Trigger**.
- Choose the function `importKoboSubmissions`.
- Choose event source as **Time-driven**.
- Select type as **Hour timer**.
- Set to **Every hour**.

---

## 📋 Example Table

| Form | Asset UID | Sheet Tab |
|:----|:---------|:---------|
| Form 1 | `aqsanfCTzw3Ut4eYn93hpp` | `responses_formulario1` |
| Form 2 | `aWv4QZNmBmnkP5PwueZJcl` | `responses_formulario2` |

---

## 🛡️ Notes
- The script will automatically create the tab if it does not exist.
- It uses a clean refresh (clear and re-import) every time.
- No submissions will be duplicated.

---

## 📚 Project Architecture

```plaintext
KoboToolbox (Forms + Submissions)
          ↓
    API v2 (Authenticated)
          ↓
 Google Apps Script
          ↓
Google Sheets ("Kobo Toolbox imported questions")
    ├─ responses_formulario1
    └─ responses_formulario2
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

**Made with ❤️ to automate KoboToolbox data collection into Google Sheets easily.**

