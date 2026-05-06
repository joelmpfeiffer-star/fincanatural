# Cloudflare Worker Setup for Finca Natural Catalogue

## What This Does
Your Cloudflare Worker acts as a secure proxy between your website and Airtable. Your Airtable token stays hidden on Cloudflare's servers (not in your code).

---

## Step 1: Create the Worker

1. Go to https://dash.cloudflare.com/
2. Click **"Workers & Pages"** in the left sidebar
3. Click **"Create application"**
4. Click **"Create Worker"**
5. Name it: `finca-airtable-proxy`
6. Click **"Deploy"**

---

## Step 2: Add the Worker Code

1. After deploying, click **"Edit code"**
2. **Delete all the existing code** in the editor
3. **Copy and paste** the code from `cloudflare-worker.js` (the file I created)
4. Click **"Save and Deploy"**

---

## Step 3: Add Your Airtable Token as a Secret

1. In your Worker dashboard, click **"Settings"**
2. Click **"Variables and Secrets"**
3. Under **"Environment Variables"**, click **"Add variable"**
4. Set:
   - Variable name: `AIRTABLE_TOKEN`
   - Value: `YOUR_AIRTABLE_PERSONAL_ACCESS_TOKEN_HERE` (paste your actual token)
   - Type: **Secret** (encrypt it)
5. Click **"Save"**
6. Click **"Deploy"** at the top

---

## Step 4: Get Your Worker URL

1. Go back to your Worker overview
2. Copy the URL - it looks like: `https://finca-airtable-proxy.YOUR_SUBDOMAIN.workers.dev`
3. **Save this URL** - you'll need it in the next step

---

## Step 5: Update Your Catalogue Files

1. Open `catalogue.html` locally
2. Find line ~223 that says:
   ```javascript
   workerUrl: 'https://YOUR_WORKER_NAME.YOUR_SUBDOMAIN.workers.dev'
   ```
3. Replace with your actual Worker URL:
   ```javascript
   workerUrl: 'https://finca-airtable-proxy.YOUR_SUBDOMAIN.workers.dev'
   ```
4. Do the same in `catalogue-es.html`
5. Save both files

---

## Step 6: Deploy to GitHub

```bash
git add catalogue.html catalogue-es.html
git commit -m "Update catalogue to use Cloudflare Worker proxy"
git push
```

✅ **No token in your code!** GitHub won't block this.

---

## Step 7: Test

1. Wait ~30 seconds for Cloudflare Pages to auto-deploy
2. Visit: `https://fincanatural.com/catalogue.html`
3. Products should load!

---

## How It Works

```
User visits catalogue
    ↓
catalogue.html calls Worker
    ↓
Worker fetches from Airtable (using secret token)
    ↓
Worker returns data to catalogue
    ↓
Products display!
```

Your token never appears in your HTML code - it's safely stored in Cloudflare's encrypted environment variables.

---

## Troubleshooting

**Products won't load?**
1. Open browser console (F12 → Console)
2. Check for errors
3. Verify Worker URL is correct in catalogue files
4. Check Worker logs in Cloudflare dashboard

**Worker errors?**
1. Go to Worker dashboard
2. Click **"Logs"** tab
3. See what errors are happening
4. Common issues:
   - AIRTABLE_TOKEN not set correctly
   - CORS errors (check allowed origins in worker code)

**Still stuck?**
Test your Worker directly:
- Visit your Worker URL in a browser: `https://finca-airtable-proxy.YOUR_SUBDOMAIN.workers.dev`
- You should see JSON data from Airtable
- If you see an error, check Worker logs

---

## Security Notes

✅ **Secure:** Token is encrypted in Cloudflare environment variables
✅ **CORS protected:** Only your domain can call the Worker
✅ **Read-only:** Worker only fetches data, can't modify Airtable
✅ **No GitHub exposure:** Token never appears in your repository

---

## Next Steps

Once working:
- Add more security (rate limiting, authentication)
- Add caching to reduce Airtable API calls
- Monitor Worker usage in Cloudflare dashboard

You're on the free plan which includes:
- 100,000 requests per day
- More than enough for your catalogue!
