# Deploy Plan: Portfolio Root Domain + GitHub Actions CI/CD

**Ziel:**
- Portfolio von `https://stefan-helldobler.de/portfolio/` auf `https://stefan-helldobler.de/` verschieben
- FileZilla FTP manuell → automatisches Deployment via GitHub Actions bei jedem Push auf `main`

---

## Analyse des Ist-Zustands

| Was | Wo | Problem |
|-----|----|---------|
| Angular Build Output | `dist/portfolio/browser/` | Angular 17 `application` builder legt Browser-Files in `/browser/` Unterordner |
| `translate.php` Endpoint (prod) | `translation.service.ts:692` | Hardcoded: `return '/portfolio/translate.php'` → muss `/translate.php` werden |
| `sendMail.php` Endpoint | `contact-form.component.ts:57` | Hardcoded: `'https://stefan-helldobler.de/portfolio/sendMail.php'` → muss auf Root umgestellt werden |
| FTP Proxy für Dev | `proxy.conf.json` | Rewrite-Pfad zeigt auf `/portfolio/translate.php` → muss `/translate.php` werden |
| `.htaccess` | nicht vorhanden | Fehlt → Angular Router (HTML5-Routing) funktioniert nicht ohne Fallback auf `index.html` |
| PHP-Dateien in Build | `angular.json` | `translate.php` + `sendMail.php` sind nicht als Assets registriert → landen nicht im `dist/`-Output |
| DEEPL_API_KEY | Hostinger Server | Runtime-Umgebungsvariable auf dem Server (kein GitHub Secret!) |

---

## Änderungen nach Priorität

### 1. `src/app/shared/services/translation.service.ts`

**Datei:** `src/app/shared/services/translation.service.ts`  
**Zeile:** ~692 — `getTranslateEndpoint()`

```typescript
// VORHER
private getTranslateEndpoint(): string {
  if (typeof window === 'undefined') {
    return '/api/translate';
  }
  const hostname = window.location.hostname;
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return '/api/translate';
  }
  return '/portfolio/translate.php'; // ← HARDCODED, muss weg
}

// NACHHER
private getTranslateEndpoint(): string {
  if (typeof window === 'undefined') {
    return '/api/translate';
  }
  const hostname = window.location.hostname;
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return '/api/translate';
  }
  return '/translate.php'; // ← Root-Pfad
}
```

---

### 2. `src/app/main-content/contact-form/contact-form.component.ts`

**Datei:** `src/app/main-content/contact-form/contact-form.component.ts`  
**Zeile:** ~57 — hardcoded absolute URL für `sendMail.php`

```typescript
// VORHER
endPoint: 'https://stefan-helldobler.de/portfolio/sendMail.php',

// NACHHER — relativer Pfad, domainunabhängig
endPoint: '/sendMail.php',
```

> **Warum relativ?** Absolute URLs mit Domain brechen in lokaler Entwicklung durch CORS und sind fragil. Relative Pfade funktionieren in Dev (über Proxy) und Prod gleichermaßen.

---

### 3. `proxy.conf.json`

Rewrite-Pfad für lokale Entwicklung anpassen (translate.php liegt nach Deploy nicht mehr unter `/portfolio/`):

```json
// VORHER
{
  "/api/translate": {
    "target": "https://stefan-helldobler.de",
    "secure": true,
    "changeOrigin": true,
    "pathRewrite": {
      "^/api/translate": "/portfolio/translate.php"
    },
    "logLevel": "debug"
  }
}

// NACHHER
{
  "/api/translate": {
    "target": "https://stefan-helldobler.de",
    "secure": true,
    "changeOrigin": true,
    "pathRewrite": {
      "^/api/translate": "/translate.php"
    },
    "logLevel": "debug"
  }
}
```

> **Hinweis zu sendMail.php in Dev:** Da `sendMail.php` nun relativ als `/sendMail.php` angesprochen wird, muss dafür ebenfalls ein Proxy-Eintrag in `proxy.conf.json` ergänzt werden, damit die lokale Entwicklung funktioniert:
>
> ```json
> "/sendMail.php": {
>   "target": "https://stefan-helldobler.de",
>   "secure": true,
>   "changeOrigin": true,
>   "logLevel": "debug"
> }
> ```

---

### 4. `angular.json` — Assets erweitern

Die PHP-Dateien und `.htaccess` müssen als Angular Assets registriert werden, damit sie beim Build in `dist/portfolio/browser/` landen und automatisch via GitHub Actions deployed werden.

```json
// VORHER
"assets": ["src/favicon.ico", "src/assets"]

// NACHHER
"assets": [
  "src/favicon.ico",
  "src/assets",
  { "glob": ".htaccess",    "input": "src/",      "output": "/" },
  { "glob": "translate.php","input": "src/app/",  "output": "/" },
  { "glob": "sendMail.php", "input": "src/app/",  "output": "/" }
]
```

---

### 5. `src/.htaccess` — neu erstellen

Zwei Aufgaben:
1. Angular HTML5-Routing: Alle nicht-existierenden Pfade auf `index.html` umleiten (ohne das funktionieren Deep-Links und Page Refresh nicht)
2. Optionaler 301-Redirect: Alte `/portfolio/*`-URLs permanent auf Root umleiten (SEO + Lesezeichen)

```apache
Options -Indexes
RewriteEngine On

# 1. Alte /portfolio/-URLs permanent auf Root umleiten (SEO, Lesezeichen)
RewriteCond %{REQUEST_URI} ^/portfolio/(.*)$
RewriteRule ^portfolio/(.*)$ /$1 [R=301,L]

# 2. Statische Dateien und Verzeichnisse direkt ausliefern
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# 3. Angular HTML5-Routing: alles andere → index.html
RewriteRule ^ /index.html [L]
```

> **Warum kein `RewriteBase`?** Bei Deployment im `public_html/`-Root wird kein `RewriteBase` benötigt.

---

### 6. `.github/workflows/deploy.yml` — neu erstellen

```yaml
name: Build & Deploy to Hostinger

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build Angular app (production)
        run: npm run build

      - name: Deploy via FTP to Hostinger
        uses: SamKirkland/FTP-Deploy-Action@4.3.4
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: ./dist/portfolio/browser/
          server-dir: /public_html/
          log-level: standard
          exclude: |
            **/.git*
            **/.git*/**
```

> **Warum `./dist/portfolio/browser/`?** Der Angular 17 `application`-Builder legt die Browser-Files in einen `browser/`-Unterordner.  
> **Warum `dangerous-clean-slate: false` (default)?** Verhindert, dass bestehende Server-Dateien (z.B. `.env`, andere Hostinger-Configs) unbeabsichtigt gelöscht werden.

---

## Manuelle Schritte (einmalig)

### GitHub Secrets anlegen

GitHub → Repository → **Settings → Secrets and variables → Actions → New repository secret**

| Secret Name | Wert | Wo finden? |
|-------------|------|------------|
| `FTP_SERVER` | z.B. `ftp.stefan-helldobler.de` | Hostinger hPanel → Hosting → FTP Accounts |
| `FTP_USERNAME` | FTP-Benutzername | Hostinger hPanel → Hosting → FTP Accounts |
| `FTP_PASSWORD` | FTP-Passwort | Hostinger hPanel → Hosting → FTP Accounts |

### DEEPL_API_KEY auf Hostinger konfigurieren

Der API-Key ist eine **Server-seitige Laufzeitvariable** — gehört NICHT in GitHub Secrets, da `translate.php` auf dem Server läuft, nicht im GitHub Actions Build.

**Option A (empfohlen): `.htaccess` SetEnv**
```apache
# In der .htaccess OBEN einfügen (vor allen RewriteRules):
SetEnv DEEPL_API_KEY "dein-deepl-api-key-hier"
```
> Achtung: Dann liegt der Key in der `.htaccess` — die `.htaccess` sollte NICHT in Git eingecheckt werden (in `.gitignore` aufnehmen) und nur manuell per FTP hochgeladen werden.

**Option B: Hostinger Environment Variables**
Hostinger hPanel → Advanced → PHP Configuration → Environment Variables (falls verfügbar auf deinem Plan).

**Option C (aktuell verwendet): `getenv()` in PHP mit manuell gesetztem Env**
Falls Hostinger kein direktes Env-Setting anbietet: Option A via `.htaccess` ist der einfachste Weg.

> **Wenn DEEPL_API_KEY in `.htaccess` steht:** Die `.htaccess` NICHT als Angular Asset in `angular.json` eintragen. Stattdessen eine separate `.htaccess.routing` (ohne Key) als Asset und die echte `.htaccess` manuell auf dem Server pflegen — oder die Workflows `exclude:` Regel ergänzen, damit die deployed `.htaccess` nicht überschrieben wird.

---

## Ausführungsreihenfolge

```
Schritt 1: translation.service.ts   → /portfolio/translate.php  →  /translate.php
Schritt 2: contact-form.component.ts → absolut  →  relativ /sendMail.php
Schritt 3: proxy.conf.json          → pathRewrite + sendMail-Proxy ergänzen
Schritt 4: angular.json             → assets Array erweitern
Schritt 5: src/.htaccess            → neue Datei anlegen
Schritt 6: .github/workflows/deploy.yml → neue Datei anlegen
           ──────────────────────────────────────────────────
Schritt 7: GitHub Secrets anlegen (manuell im Browser)
Schritt 8: DEEPL_API_KEY auf Server konfigurieren (manuell)
Schritt 9: git add . && git commit && git push origin main
           → GitHub Actions startet automatisch
Schritt 10: Actions-Tab beobachten → grüner Build abwarten
Schritt 11: https://stefan-helldobler.de/ testen
Schritt 12: Alten /portfolio/-Ordner auf Hostinger löschen (via hPanel File Manager)
```

---

## Verifikations-Checkliste

- [ ] `https://stefan-helldobler.de/` → Portfolio lädt korrekt
- [ ] `https://stefan-helldobler.de/privacy-policy` → Direktlink funktioniert (Angular Router + .htaccess)
- [ ] `https://stefan-helldobler.de/legal-notice` → Direktlink funktioniert
- [ ] Sprachumschalter → andere Sprache als EN/DE → DeepL-Übersetzung wird geladen (`/translate.php` erreichbar)
- [ ] Kontaktformular → Absenden → Toast erscheint (`/sendMail.php` erreichbar)
- [ ] `https://stefan-helldobler.de/portfolio/` → 301-Redirect auf `https://stefan-helldobler.de/`
- [ ] GitHub Actions Tab → grüner Haken beim ersten Deployment
- [ ] Kein versehentlicher Upload von `node_modules/` oder `.git/`

---

## Sicherheitshinweise (nicht blockierend für Deploy)

| Thema | Problem | Empfehlung |
|-------|---------|------------|
| `sendMail.php` | Keine Eingabevalidierung — `$params->email`, `$name`, `$message` direkt verwendet | Mindest-Sanitizing mit `filter_var($email, FILTER_VALIDATE_EMAIL)` und `htmlspecialchars()` ergänzen |
| `sendMail.php` | `Access-Control-Allow-Origin: *` | Nach Deploy auf `https://stefan-helldobler.de` einschränken |
| `translate.php` | `Access-Control-Allow-Origin: *` | Ebenso auf Origin einschränken |
| `DEEPL_API_KEY` | Darf nicht in Git eingecheckt werden | Aus `.htaccess` per `.gitignore` ausschließen oder via Hostinger Env setzen |

---

## Nicht betroffen durch diese Änderung

- `astronaut-jan.stefan-helldobler.de` (Subdomain, unabhängig)
- `travel2speak.stefan-helldobler.de` (Subdomain, unabhängig)
- `join-issuecollector.stefan-helldobler.de` (Subdomain, unabhängig)
- DNS-Einstellungen (keine Änderung nötig)
- Hostinger-Plan / PHP-Version
