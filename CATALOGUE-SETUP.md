# 🌱 Finca Natural Farm Catalogue - Setup Guide

## What You Have

I've created a beautiful, bilingual farm catalogue that:
- ✅ Auto-updates from your Airtable database
- ✅ Features search and filtering (category, growing method, availability)
- ✅ Displays product images, prices, stock, harvest dates, and more
- ✅ Has a shopping cart that sends orders via WhatsApp
- ✅ Matches your website's design perfectly
- ✅ Works on mobile and desktop
- ✅ Is ready for future email integration

## Files Created

1. **catalogue.html** - English version
2. **catalogue-es.html** - Spanish version

---

## Setup Instructions

### Step 1: Add Your Airtable Credentials

1. Open both `catalogue.html` and `catalogue-es.html` in a text editor
2. Find this line (around line 224):
   ```javascript
   apiKey: '', // ADD YOUR AIRTABLE API CREDENTIALS HERE
   ```
3. Replace the empty string with your actual Airtable Personal Access Token
4. Save both files

**Your configuration is already set:**
- Base ID: `appS6Wqg52SEanUjH` ✅
- Table ID: `tblsjbC8tkBbCIuz9` ✅

### Step 2: Upload to Your Website

Upload both files to your website's root directory (same folder as `index.html`)

### Step 3: Test

Visit: `https://yourwebsite.com/catalogue.html`

If you see products loading, you're done! 🎉

---

## Features Built In

### 🔍 **Smart Filters**
- Search by product name, description, or variety
- Filter by category (Plant, Tree, Eggs, etc.)
- Filter by growing method (Organic, Permaculture, etc.)
- Filter by availability (In Stock / Out of Stock)

### 🛒 **Shopping Cart**
- Add products to cart
- Cart persists across page reloads (localStorage)
- Click cart icon to send order via WhatsApp
- Pre-formatted order message with totals

### 📱 **Responsive Design**
- Works perfectly on mobile, tablet, and desktop
- Matches your website's green/dark aesthetic
- Beautiful hover effects and animations

### 🔄 **Auto-Updates**
When you update Airtable:
- Add new products → They appear instantly
- Change prices → Updates immediately
- Mark out of stock → Shows "Unavailable" badge
- Upload images → They display automatically

---

## Current Shopping Cart Flow

**When user clicks cart icon:**
1. Order summary is formatted
2. WhatsApp opens with pre-filled message
3. Message includes:
   - Each product with quantity and price
   - Total amount
   - Request for pickup/delivery time

**WhatsApp Message Format:**
```
🌱 Finca Natural Order

• Organic Tomatoes
  3 × $2.50 = $7.50

• Fresh Eggs
  2 × $5.00 = $10.00

Total: $17.50

Please confirm your order and let us know your preferred pickup/delivery time.
```

---

## Future Enhancements (Ready to Add)

### 📧 **Email Integration**
The cart is structured to easily add email sending:
- Could send copy to your email
- Could send receipt to customer
- Just need to connect to email service (Formspree, SendGrid, etc.)

### 💳 **Payment Processing**
Cart structure is ready for:
- Stripe integration
- PayPal buttons
- Local payment gateways

### 📦 **Advanced Features**
Easy to add later:
- Delivery/pickup time selector
- Customer notes field
- Multiple delivery locations
- Order tracking
- Customer accounts

---

## Airtable Field Mapping

The catalogue displays these Airtable fields:

| Airtable Field | Where It Shows |
|---------------|----------------|
| Name | Product title |
| Images | Product photo |
| Category | Badge on image |
| Variety/Breed | Subtitle under name |
| Description | Main product text |
| Unit Price | Large price display |
| Unit Type | "per LB" text |
| Stock Quantity | Stock info |
| Is Available | Availability badge/button |
| Harvest/Production Date | Metadata row |
| Shelf Life/Expiration | Metadata row |
| Growing Method | Badge + metadata |
| Notes | (Not displayed yet - easy to add) |
| Link | (Not displayed yet - easy to add) |

---

## Testing Checklist

- [ ] Products load correctly
- [ ] Images display (or placeholder shows if no image)
- [ ] Prices show correctly
- [ ] Search works
- [ ] Category filter works
- [ ] Growing method filter works
- [ ] Availability filter works
- [ ] Add to cart button works
- [ ] Cart count updates
- [ ] Cart icon appears when items added
- [ ] WhatsApp message opens correctly
- [ ] Spanish version works
- [ ] Mobile view looks good

---

## Troubleshooting

**Products won't load?**
- Check that you added your Airtable credentials to the apiKey field
- Check browser console for errors (F12 → Console)
- Verify your credentials have `data.records:read` permission
- Verify your credentials have access to the base

**Images won't show?**
- Make sure images are uploaded to Airtable "Images" field
- Check that images are attachments, not URLs

**Cart not working?**
- Make sure JavaScript is enabled
- Check browser console for errors
- Try clearing localStorage

**WhatsApp not opening?**
- Check phone number: +507-6562-9220
- Make sure WhatsApp is installed (mobile)
- Desktop users need WhatsApp Web or app

---

## Need Help?

Common next steps:
1. Want to add more fields to display?
2. Need to customize the design?
3. Want to add email notifications?
4. Ready to add payment processing?
5. Need delivery/pickup scheduling?

Just let me know what you'd like to add next!

---

## Security Note

⚠️ **Important:** Your Airtable credentials are visible in the page source. This is generally okay for read-only catalogs, but:

- The credentials should only have read permissions (no write access)
- Consider using a server-side proxy if you want to hide them completely
- Don't use credentials with write/delete permissions in client-side code

For production, I can help you set up a backend API that keeps the credentials secure if needed.
