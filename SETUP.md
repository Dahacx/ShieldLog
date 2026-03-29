# ShieldLog — Deployment Guide

## Files to commit to your GitHub repo

```
index.html        ← rename shieldlog_v4_fixed.html to this
sw.js
manifest.json
white.png.webp    ← your logo file
```

---

## Step 1 — Create a Firebase Project (~5 min)

1. Go to https://console.firebase.google.com
2. Click **Add project** → name it `shieldlog-3618` → Continue
3. Disable Google Analytics (not needed) → **Create project**

### Enable Google Sign-In
4. Left sidebar → **Authentication** → Get started
5. **Sign-in method** tab → Google → Enable → set support email → Save

### Enable Firestore
6. Left sidebar → **Firestore Database** → Create database
7. Choose **Start in production mode** → pick a region (us-central1 is fine) → Done

### Set Firestore security rules
8. Firestore → **Rules** tab → paste this and click Publish:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /shieldlog/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

This means: only you (signed in with your Google account) can read/write your data.

### Get your config keys
9. Project settings (gear icon) → **General** tab → scroll to "Your apps"
10. Click **</>** (web app) → name it `shieldlog` → Register app
11. Copy the `firebaseConfig` object — it looks like:

```js
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "shieldlog-3618.firebaseapp.com",
  projectId: "shieldlog-3618",
  storageBucket: "shieldlog-3618.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### Paste config into index.html
12. Open `index.html`, find this block near the top:

```js
const FIREBASE_CONFIG = {
  apiKey:            "PASTE_HERE",
  authDomain:        "PASTE_HERE",
  projectId:         "PASTE_HERE",
  storageBucket:     "PASTE_HERE",
  messagingSenderId: "PASTE_HERE",
  appId:             "PASTE_HERE"
};
```

Replace each `"PASTE_HERE"` with the values from your Firebase console.

---

## Step 2 — Push to GitHub Pages

```bash
git add index.html sw.js manifest.json white.png.webp
git commit -m "Add ShieldLog PWA with Firebase sync"
git push
```

Then in your repo on GitHub:
- **Settings** → **Pages** → Source: `Deploy from branch` → branch: `main` → folder: `/ (root)` → Save

Your app will be live at:
`https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

---

## Step 3 — Install on Android

1. Open Chrome on your Android phone
2. Navigate to your GitHub Pages URL
3. Chrome will show an **"Add to Home Screen"** banner, or tap the 3-dot menu → **Add to Home screen**
4. It installs like an app — opens full screen, works offline

## Install on iPhone (if needed later)

1. Open Safari (must be Safari, not Chrome)
2. Navigate to the URL
3. Tap the **Share** button → **Add to Home Screen**

---

## How sync works

- Sign in with Google on both your phone and the pit laptop
- Every save (submit entry, add battery, change settings) pushes to Firestore ~1 second later
- The other device gets the update in real time via a live listener
- If you lose signal, writes are queued locally (IndexedDB) and sync automatically when signal returns
- Data is keyed to your Google account UID — no one else can see it
