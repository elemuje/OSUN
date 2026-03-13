# RTIFN Osun State Chapter — Official Website

> **Relax, Tinubu Is Fixing Nigeria**  
> Official political media & mobilization platform for RTIFN Osun State Chapter

Built with **Vite + React + Tailwind CSS**, powered by **Notion CMS**, ready for **Vercel** deployment.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Edit .env with your Notion credentials (see below)

# 3. Run development server
npm run dev

# 4. Build for production
npm run build
```

---

## 📝 Connecting Your Notion Database (Blog CMS)

This website fetches blog posts from a Notion database. Follow these steps:

### Step 1: Create a Notion Integration
1. Go to [notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Click **New integration**
3. Name it "RTIFN Website"
4. Select your workspace
5. Copy the **Internal Integration Token** (starts with `secret_`)

### Step 2: Create the Notion Database
Create a new database in Notion with these **exact property names**:

| Property | Type | Notes |
|----------|------|-------|
| `Title` | Title | Post headline |
| `Content` | Rich Text | Short content (for excerpt fallback) |
| `Date` | Date | Publication date |
| `Author` | Rich Text | Author name |
| `Category` | Select | One of: Tinubu Achievements, Economic Reforms, RTIFN Activities, Policy Explainers, Press Releases, Grassroots Mobilization |
| `FeaturedImage` | URL | Direct image URL |
| `Excerpt` | Rich Text | Short summary (shown in listings) |
| `Slug` | Rich Text | URL-friendly ID e.g. `fuel-subsidy-reform` |
| `Published` | Checkbox | ✅ Check this to make post live |

### Step 3: Share Database with Integration
1. Open your database in Notion
2. Click **Share** (top right)
3. Click **Invite** → search for your integration name → **Invite**

### Step 4: Get Your Database ID
From your database URL:
```
notion.so/your-workspace/[DATABASE_ID]?v=...
```
Copy the 32-character ID.

### Step 5: Add to `.env`
```
VITE_NOTION_TOKEN=secret_xxxxxxxxxxxx
VITE_NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Publishing Posts
Simply create a new page in your Notion database, fill in the fields, and **check the Published checkbox**. The post will appear on the website automatically.

---

## 🌐 Deploying to Vercel

### Option A: GitHub + Vercel (Recommended)
1. Push your project to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit — RTIFN Osun Website"
   git remote add origin https://github.com/YOUR_USERNAME/rtifn-osun.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repository
4. Vercel auto-detects Vite — click **Deploy**
5. Add environment variables in Vercel dashboard:
   - **Settings → Environment Variables**
   - Add `VITE_NOTION_TOKEN` and `VITE_NOTION_DATABASE_ID`
6. Redeploy after adding variables

### Option B: Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

### Custom Domain
In Vercel dashboard → **Settings → Domains** → add `rtifnosun.org` or your domain.

---

## ✏️ Customizing the Website

### Update Leadership Details
Edit `src/lib/data.js` — update the `EXECUTIVES` array with real names, positions, photos, and bios.

### Update Contact Information
Edit `src/lib/data.js` — update the `SITE` object with real phone, email, address, and social media links.

### Update WhatsApp Group Link
Replace `https://wa.me/2348000000000` throughout with your real WhatsApp group invite link.

### Add Real Gallery Photos
Edit `src/pages/GalleryPage.jsx` — replace the placeholder items with real photo URLs.

### Add Events
Edit `src/lib/data.js` — update the `EVENTS` array with real upcoming and past events.

---

## 📁 Project Structure

```
rtifn-osun-website/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        # Sticky navigation bar
│   │   ├── Footer.jsx        # Site footer
│   │   ├── PostCard.jsx      # Blog post card
│   │   └── Logo.jsx          # RTIFN SVG logo
│   ├── pages/
│   │   ├── HomePage.jsx      # Landing page
│   │   ├── AboutPage.jsx     # About RTIFN
│   │   ├── ExecutivesPage.jsx # Leadership profiles
│   │   ├── AchievementsPage.jsx # Reform tracker
│   │   ├── BlogPage.jsx      # Blog listing
│   │   ├── BlogPostPage.jsx  # Single post view
│   │   ├── EventsPage.jsx    # Events calendar
│   │   ├── GalleryPage.jsx   # Photo gallery
│   │   ├── JoinPage.jsx      # Membership form
│   │   ├── ContactPage.jsx   # Contact page
│   │   └── NotFoundPage.jsx  # 404 page
│   ├── lib/
│   │   ├── notion.js         # Notion API integration
│   │   └── data.js           # Static site data
│   ├── App.jsx               # Router
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles + Tailwind
├── .env.example              # Environment variables template
├── vercel.json               # Vercel SPA routing config
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Vite** | Build tool & dev server |
| **React 18** | UI framework |
| **React Router v6** | Client-side routing |
| **Tailwind CSS** | Styling |
| **Notion API** | Blog CMS |
| **date-fns** | Date formatting |
| **Vercel** | Hosting & deployment |

---

## 📞 Support

For technical issues with the website, contact the RTIFN Media Team.

**RTIFN Osun State Chapter**  
*Relax, Tinubu Is Fixing Nigeria* 🇳🇬

---

## 📬 Receiving Form Submissions (Membership + Contact)

Both forms use [Formspree](https://formspree.io) — submissions land directly in **Osunrtifn@gmail.com**.

### Setup (5 minutes):

1. Go to **[formspree.io](https://formspree.io)** → sign up free with Osunrtifn@gmail.com
2. Click **New Form** → name it "RTIFN Membership" → copy the **Form ID** (e.g. `xpzgnlrb`)
3. In `src/pages/JoinPage.jsx` find:
   ```
   const FORMSPREE_ID = 'YOUR_FORM_ID'
   ```
   Replace with your real ID: `const FORMSPREE_ID = 'xpzgnlrb'`
4. Create a **second form** called "RTIFN Contact" → copy that ID
5. In `src/pages/ContactPage.jsx` find:
   ```
   const FORMSPREE_ID = 'YOUR_CONTACT_FORM_ID'
   ```
   Replace with the second ID.
6. Redeploy → every form submission arrives in your Gmail, labelled with the member's name and LGA.

### What each membership email contains:
- Full Name, LGA, Ward, Phone Number, Email, Occupation
- Subject line: "New RTIFN Osun Membership — [Name] ([LGA])"

---

## 📱 Social Media — Add Links When Ready

Open `src/lib/data.js` and update the `social` object:

```js
social: {
  facebook:  'https://facebook.com/YOUR_PAGE_NAME',
  twitter:   'https://twitter.com/YOUR_HANDLE',
  instagram: 'https://instagram.com/YOUR_HANDLE',
}
```

Icons will **automatically appear** across the site (hero, footer, contact page) once filled in.
Leave blank (`''`) for any platform you don't use yet.

