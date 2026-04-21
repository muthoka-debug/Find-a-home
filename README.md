# FindAHome 🇰🇪

**Verified Rental Marketplace for Kenya. Built solo. Done right.**

---

## The Mission

Fix the fake listing problem in Kenya by building **the most trustworthy rental platform**. Not the biggest. Not the flashiest. **The one agents and house hunters actually trust.**

**Status:** Pre-build (April 2026)  
**Solo Founder:** Yes  
**Timeline:** 4 months (May-August 2026)  
**Budget:** ~$300-500 total (hosting, domain, optional tooling)  
**Goal:** Live with 100+ verified listings, real user inquiries, agent partnerships

## The Reality

**Let's be honest about what this actually is:**

You're one person. You'll wear all hats:
- Architect (deciding how things fit together)
- Engineer (writing the code)
- DevOps (deploying it, keeping it running)
- Operations (verifying listings manually)
- Customer support (responding to agent emails)
- Sales (convincing agents to join)

**This is hard, but doable.** Thousands of founders have shipped solo in 4 months.

**Here's what you can't do:**
- ❌ Build the "perfect" product (good enough wins)
- ❌ Support 50 countries (Kenya only, focus)
- ❌ Hire a team right away (you're the team for Months 1-3)
- ❌ Launch with fancy features (core only)
- ❌ Ignore the business side (code is 50% of the work)

**Here's what you can do:**
- ✅ Ship something real people use
- ✅ Learn what actually matters (from users, not your head)
- ✅ Build quality code (not spaghetti)
- ✅ Own the full stack (design, build, deploy, support)
- ✅ Stay focused (don't add 100 features)

---

## What You're Building (Month 1)

**Core product only. Everything else is Phase 2.**

### Features (MVP)

**For House Hunters:**
- Browse verified rental listings (county, price, amenities)
- Filter by: County, Price Range, Bedrooms, Water, Internet, Parking
- Save listings (simple bookmark)
- Contact agent via WhatsApp (one-click)
- See basic listing details (photos, title, price, utilities)

**For Agents/Landlords:**
- Create listings (title, price, photos, amenities, agent contact)
- See submission status (pending verification → verified)
- View saved count on their listings
- Get notified when someone inquires via WhatsApp

**For You (Admin):**
- Django admin interface (verify listings, review reports)
- Simple moderation (flag/remove fake listings)
- Basic monitoring (errors, uptime)

### What's NOT in Month 1

❌ Recommendations / "Recommended for You" feed  
❌ Chatbot  
❌ Agent analytics dashboard  
❌ Real-time notifications  
❌ Mobile app (responsive web is fine)  
❌ Multi-language (English only)  
❌ Payments / monetization (focus on product)  
❌ Advanced search (filters are enough)  
❌ Maps / locations (text is fine)  
❌ User profiles (keep it minimal)  

**Why not?** You'll have 100 things you want to build. Every single one feels important. **They're not.** Focus on the core: Can a house hunter find a home and contact an agent? That's it. That's the product for now.

---

## 4-Month Timeline

### Month 1: Build (May 2026)

**Weeks 1-2: Setup & Auth**
- Django project (DRF)
- Next.js frontend
- Custom user model (email auth, role field: agent, landlord, house_hunter)
- Basic signup / login
- Protected routes

**Weeks 3-4: Listings**
- Listing model (title, price, county, bedrooms, bathrooms, photo)
- Amenities (water, internet, power, parking, furnished)
- CRUD endpoints (create, read, update, delete)
- Photo upload to Cloudinary
- Django admin for verification (status: draft → pending → verified)

**Weeks 5-6: Search & Save**
- Search/filter API (county, price range, bedrooms, amenities)
- Listing results page (grid, pagination)
- Save listings (simple, no accounts needed)
- WhatsApp inquiry button (deeplink with pre-filled message)

**Weeks 7-8: Polish & Deploy**
- Error handling (proper 400/401/403/404/500 responses)
- Logging (you need to know when things break)
- Deploy to staging (Render free tier)
- Basic tests (happy path for main features)
- Security basics (no hardcoded secrets, rate limiting on auth)

**End of Month 1:**
- ✅ You have a working product
- ✅ You can create a listing and verify it in Django admin
- ✅ A house hunter can search, save, and message an agent
- ✅ It's deployed somewhere (staging is fine)

---

### Month 2: Get Real Users (June 2026)

**Weeks 1-2: Agent Outreach**
- You've already been emailing agents (started in Week 1 of Month 1)
- Now get 10-15 agents to actually commit
- Incentive: Free featured placement, manual help verifying, direct support
- Goal: 100+ listings from these agents

**Weeks 3-4: Verify & Support**
- You personally verify every listing (yes, all 100+)
- This teaches you: What's hard? What's slow? What's confusing?
- Respond to agent questions (they'll have many)
- Fix bugs as they come up (use real data, not test data)

**Weeks 5-6: Monitor & Learn**
- Track: How many house hunters are using it?
- Track: Are agents getting real inquiries?
- What's broken? (Database? Photos? Filters?)
- Collect feedback from agents (what do they need?)

**Weeks 7-8: Quick Wins**
- Ship small fixes based on feedback
- Maybe add: County-specific recommendations (trending listings in county)
- Maybe add: Better photo display
- Don't add: Big features, just improve what exists

**End of Month 2:**
- ✅ 100+ verified listings live
- ✅ 10-15 agents actively using it
- ✅ Real inquiries happening (know the numbers)
- ✅ You know what's broken and what agents need
- ✅ Retention data (are people coming back?)

---

### Month 3: Iterate & Expand (July 2026)

**Weeks 1-2: Feedback Loop**
- Call 3-5 agents weekly (15-30 min calls)
- Ask: What's working? What's not? What would make you use this more?
- Ask house hunters: Why did you save this listing? Why didn't you inquire?
- Document patterns (don't rely on memory)

**Weeks 3-4: Build What Matters**
- Agents want X? Build X. (Not "nice to have," actual requests)
- House hunters are confused about Y? Fix Y.
- You probably won't build what you planned. That's good.
- Examples: Better image display? Clearer amenity icons? Faster search?

**Weeks 5-6: Expand to Second County**
- Nairobi is saturated. Add Mombasa or Kisumu.
- Recruit 5-10 agents in new county
- Verify their listings
- See if patterns hold in different market

**Weeks 7-8: Automate Pain Points**
- You've verified 200+ listings. You know what's slow.
- Maybe: Batch image optimization? Auto-flagging suspicious prices?
- Small automation wins, not full ML

**End of Month 3:**
- ✅ 200+ verified listings across 2 counties
- ✅ 20+ agents actively using it
- ✅ House hunters are returning (retention > 30%)
- ✅ Real inquiries, real conversions
- ✅ You've shipped what agents actually asked for, not what you guessed
- ✅ Product has evolved based on feedback (Month 3 ≠ Month 1)

---

### Month 4: Viability Decision (August 2026)

**Weeks 1-2: Measure Everything**
- Verification time per listing (average)
- Inquiry conversion rate (% of house hunters who contact agent)
- Agent satisfaction (simple NPS: "Would you recommend this to another agent?")
- Cost per listing to verify and support
- Is this sustainable long-term?

**Weeks 3-4: Decision Point**

Three paths:

**Path A: This is working → Go harder**
- Hire a part-time operations person (help with verification)
- Raise money ($50k pre-seed) to scale
- Plan Phase 2: Recommendations, chatbot, monetization
- Timeline: 6 more months to Series A readiness

**Path B: It's okay, but not amazing → Optimize**
- Keep building solo
- Focus on profitability (agent subscriptions, featured listings)
- Stay lean, bootstrap longer
- Timeline: 12+ months to sustainability

**Path C: It's not working → Kill it, learn, move on**
- You've spent 4 months and learned what doesn't work
- That's a win. Most people don't even try.
- You have validation experience to go faster next time
- Timeline: Pivot to new idea

**Weeks 5-8: Execute Your Decision**
- Path A: Start hiring, planning fundraise
- Path B: Build monetization, optimize cost structure
- Path C: Document learnings, celebrate, move on

**End of Month 4:**
- ✅ You have real data (not guesses)
- ✅ You know if this is a business or a nice project
- ✅ You've learned how to ship, iterate, and measure
- ✅ You have options (raise money, bootstrap, or pivot)

---

## Tech Stack (Lean)

Why these choices? **They let you move fast without regret.**

### Backend: Django 4.2+ (Python 3.11+)

**Why?**
- Built-in admin (you verify listings here, no custom UI needed)
- Solid ORM (queries are clean, not error-prone)
- Great for solo devs (batteries included)
- Easy to add features later

**Dependencies:**
- djangorestframework (REST API)
- django-cors-headers (CORS for Next.js)
- python-decouple (environment variables)
- python-cloudinary (image hosting)
- gunicorn (production server)

**Not needed yet:**
- ❌ Celery (background jobs can wait)
- ❌ Redis (caching can wait)
- ❌ GraphQL (REST is fine)

### Frontend: Next.js 14+ (React 18)

**Why?**
- Image optimization built-in (critical in Kenya's low-bandwidth reality)
- API routes (can proxy or do simple logic)
- SSR for SEO (listings should be discoverable)
- Vercel free tier (one-click deploy)
- File-based routing (simple, no config)

**Dependencies:**
- axios (HTTP requests)
- tailwind css (styling)
- react-query (data fetching, caching) — optional, can use fetch

**Not needed yet:**
- ❌ Redux (Context API is fine)
- ❌ TypeScript (can add later)
- ❌ Testing library (add tests in Month 3 if time)

### Database: SQLite (Dev & Prod initially)

**Why SQLite?**
- No external dependencies (just a file)
- Fast for 10k listings (good enough)
- Same SQL as PostgreSQL (easy migration later)
- Free (always)

**When to migrate to PostgreSQL:**
- When you hit 100k listings OR
- When you need concurrent writes OR
- Month 5+ (after you know it works)

**For now:** Ship with SQLite, migrate in Phase 2.

### Image Hosting: Cloudinary

**Why?**
- Free tier: 1GB/month (good for 500-1000 listings)
- Auto-resize/optimize (images look great on slow networks)
- CDN included (fast globally)
- Simple API (5 lines of code to upload)

**Cost:**
- Free tier: 1GB/month (fine for MVP)
- Paid: $10-50/month as you scale

### Hosting: Render or Railway

**Why?**
- Free tier for small apps ($0-7/month)
- Deploy from GitHub (push → live)
- PostgreSQL database included (when you upgrade)
- No DevOps knowledge needed

**Cost:**
- Free tier: $0/month (limited, but works)
- Paid tier: $7-15/month (recommended for Phase 2)

### Monitoring: Sentry (Free Tier)

**Why?**
- Know when things break (errors logged automatically)
- Free tier: 5k events/month (enough for MVP)
- Simple setup (3 lines of code)

**Cost:**
- Free tier: $0/month
- Paid: $29/month as volume grows (much later)

### Email: Gmail API or SendGrid

**Why?**
- Send agent notifications when listings are approved
- Send password reset links
- Simple, proven, free tier exists

**Cost:**
- Gmail API: Free (if you have a Gmail account)
- SendGrid: Free tier (100 emails/day)

### Domain: Namecheap or Google Domains

**Why?**
- Cheap ($12-15/year)
- Simple DNS setup
- Required for professional emails

**Cost:**
- $12-15/year

---

## Project Structure

```
findahome/
├── backend/                          # Django Project
│   ├── manage.py
│   ├── requirements.txt              # Python dependencies
│   ├── .env.example                  # Environment template
│   ├── findahome_backend/
│   │   ├── settings.py               # Django config
│   │   ├── urls.py
│   │   ├── wsgi.py                   # Production server
│   │   └── asgi.py
│   ├── listings/                     # Core app
│   │   ├── models.py                 # Listing, Amenity, Verification
│   │   ├── views.py                  # DRF ViewSets
│   │   ├── serializers.py            # DRF Serializers
│   │   ├── urls.py
│   │   ├── admin.py                  # Verification queue UI
│   │   ├── permissions.py            # Custom permissions (RBAC)
│   │   └── migrations/
│   ├── auth/                         # Authentication
│   │   ├── models.py                 # Custom User
│   │   ├── views.py                  # Signup, login
│   │   ├── serializers.py
│   │   └── urls.py
│   ├── utils/
│   │   ├── cloudinary_utils.py      # Image upload
│   │   ├── email.py                  # Email sending
│   │   └── auth.py
│   └── static/ & media/              # Local storage (dev only)
│
├── frontend/                         # Next.js Project
│   ├── package.json
│   ├── next.config.js
│   ├── .env.local                    # Dev environment
│   ├── app/
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Home page
│   │   ├── (auth)/
│   │   │   ├── signup/page.tsx
│   │   │   ├── login/page.tsx
│   │   │   └── reset-password/page.tsx
│   │   ├── (app)/                    # Protected routes
│   │   │   ├── search/page.tsx       # Browse & filter
│   │   │   ├── listing/[id]/page.tsx # Listing detail
│   │   │   ├── saved/page.tsx        # Saved listings
│   │   │   └── profile/page.tsx      # User settings
│   │   └── api/                      # API proxy routes (optional)
│   ├── components/
│   │   ├── PropertyCard.tsx          # Listing card
│   │   ├── Filters.tsx               # Search filters
│   │   ├── Header.tsx                # Navigation
│   │   ├── AuthForm.tsx              # Login/signup
│   │   └── WhatsAppButton.tsx        # Inquiry button
│   ├── hooks/
│   │   ├── useAuth.ts                # Auth state
│   │   ├── useListings.ts            # Fetch listings
│   │   └── useSavedListings.ts
│   ├── lib/
│   │   ├── api.ts                    # Axios config
│   │   ├── constants.ts              # Counties, amenities
│   │   └── utils.ts
│   ├── styles/
│   │   └── globals.css               # Tailwind config
│   └── public/                       # Static assets
│
├── docker-compose.yml                # Local dev (optional)
├── .env.example                      # Template
├── .gitignore
└── README.md                         # This file

```

---

## Quick Start

### Prerequisites

- Python 3.11+
- Node.js 18+
- Git

### Option 1: Local Setup (Recommended for Development)

**Backend:**
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Run migrations
python manage.py migrate

# Create superuser (for Django admin)
python manage.py createsuperuser

# Start server
python manage.py runserver
```

**Frontend:**
```bash
cd frontend

# Install dependencies
npm install

# Create .env.local
cp .env.example .env.local

# Start dev server
npm run dev
```

**Access:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api
- Django Admin: http://localhost:8000/admin

### Option 2: Docker (Optional)

```bash
docker-compose up
# Wait for containers to start, then:
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py createsuperuser
```

### Environment Variables

**Backend (.env):**
```bash
DEBUG=True
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1

# Database
DATABASE_URL=sqlite:///db.sqlite3

# Cloudinary (image hosting)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email (optional, use Gmail or SendGrid)
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password

# Sentry (error tracking)
SENTRY_DSN=https://your-key@sentry.io/your-project

# JWT
JWT_SECRET=your-jwt-secret
JWT_EXPIRY=3600  # 1 hour
```

**Frontend (.env.local):**
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

---

## Database Schema (Simple)

### Core Tables

**User** (Custom)
```
- id (UUID)
- email (unique)
- password (hashed)
- first_name, last_name
- role (agent, landlord, house_hunter)
- phone (optional)
- created_at, updated_at
```

**Listing**
```
- id (UUID)
- owner (FK User - agent/landlord who created it)
- title (e.g., "Beautiful 2-bed in Karen")
- description
- property_type (maisonette, apartment, bedsitter, etc.)
- bedrooms, bathrooms
- price_per_month (KES)
- county (Nairobi, Mombasa, etc.)
- sub_location (Karen, Westlands, etc.)
- status (draft, pending_verification, verified, removed)
- verified_at, verified_by (when admin approved)
- created_at, published_at
```

**Amenities** (Toggle fields on Listing)
```
- water_source (borehole, council, tank)
- backup_power (generator, solar, none)
- internet_provider (safaricom, zuku, smile, mobile_only)
- furnished (unfurnished, partial, full)
- parking (none, carport, garage)
- security (wall, gate, guard, none)
```

**ListingMedia**
```
- id (UUID)
- listing (FK)
- image_url (Cloudinary URL)
- display_order
- is_primary (cover image)
- uploaded_at
```

**Verification**
```
- id (UUID)
- listing (FK)
- verified_by (FK User/admin)
- status (approved, rejected)
- rejection_reason (if rejected)
- verified_at
- notes (admin notes)
```

**ModerationReport**
```
- id (UUID)
- listing (FK)
- reported_by (FK User)
- reason (fake, misleading, scam, inappropriate)
- description (optional)
- status (open, under_review, resolved)
- resolved_action (warning, suspend, remove)
- created_at, resolved_at
```

**SavedListing**
```
- id (UUID)
- user (FK User - house_hunter)
- listing (FK)
- saved_at
```

### Database Indexes

```sql
CREATE INDEX idx_listing_county ON listings(county);
CREATE INDEX idx_listing_status ON listings(status);
CREATE INDEX idx_listing_owner ON listings(owner_id);
CREATE INDEX idx_saved_user ON saved_listings(user_id);
CREATE INDEX idx_moderation_status ON moderation_reports(status);
```

---

## API Endpoints (Core Only)

### Auth
```
POST   /api/auth/signup/         → Create account
POST   /api/auth/login/          → Get token
POST   /api/auth/logout/         → Revoke token
POST   /api/auth/refresh/        → New access token
GET    /api/auth/me/             → Current user
```

### Listings
```
GET    /api/listings/                        → Browse (paginated)
GET    /api/listings/?county=Nairobi&...     → Filter/search
GET    /api/listings/{id}/                   → Detail
POST   /api/listings/                        → Create (agent/landlord)
PATCH  /api/listings/{id}/                   → Update (owner)
DELETE /api/listings/{id}/                   → Archive (owner)
```

### Save / Inquiries
```
POST   /api/listings/{id}/save/              → Save listing
DELETE /api/listings/{id}/save/              → Unsave
POST   /api/listings/{id}/inquire/           → Create inquiry (WhatsApp)
```

### Moderation
```
POST   /api/listings/{id}/report/            → Report fraud
```

### Admin Only
```
GET    /api/admin/verification-queue/        → Pending listings
PATCH  /api/admin/listings/{id}/verify/      → Approve
PATCH  /api/admin/listings/{id}/reject/      → Reject
GET    /api/admin/moderation-queue/          → Fraud reports
PATCH  /api/admin/reports/{id}/resolve/      → Action on report
```

**Example Response:**
```json
GET /api/listings/?county=Nairobi&price_max=50000

{
  "count": 145,
  "next": "?page=2",
  "previous": null,
  "results": [
    {
      "id": "uuid-1",
      "title": "Cozy 2-bed in Karen",
      "price_per_month": 45000,
      "bedrooms": 2,
      "bathrooms": 1,
      "county": "Nairobi",
      "water_source": "borehole",
      "internet_provider": "safaricom_fiber",
      "photo_url": "https://res.cloudinary.com/...",
      "is_saved": false,
      "verified_at": "2026-05-15T10:30:00Z"
    }
  ]
}
```

---

## Building Month 1

### Week 1-2: Auth & Setup

**What you're doing:**
- Django project + settings
- Custom User model (email auth, role field)
- JWT token setup (djangorestframework-simplejwt)
- Next.js app shell
- Protected routes (middleware)
- Basic signup/login forms

**Key files to create:**
```
backend/
├── auth/models.py        # User model
├── auth/views.py         # Signup, login, refresh endpoints
├── auth/serializers.py   # User serializer
└── findahome_backend/settings.py  # DRF, CORS, JWT config

frontend/
├── app/layout.tsx        # Root layout with Header
├── app/(auth)/signup/page.tsx
├── app/(auth)/login/page.tsx
├── components/AuthForm.tsx
└── hooks/useAuth.ts
```

**Tests to pass:**
- [ ] User can sign up with email/password
- [ ] User can log in and get JWT token
- [ ] Token refresh works
- [ ] Protected routes redirect to login

**By end of Week 2:**
- You have authentication working
- You can create an admin account in Django
- You can log in from the frontend
- Protected routes work

---

### Week 3-4: Listings CRUD

**What you're doing:**
- Listing model (title, price, county, bedrooms, photos, amenities)
- Create/read/update/delete endpoints
- Photo upload to Cloudinary
- Django admin for listing verification
- Permissions (only owner can edit own listings)

**Key files to create:**
```
backend/
├── listings/models.py       # Listing, Amenities, ListingMedia, Verification
├── listings/views.py        # ListingViewSet (CRUD)
├── listings/serializers.py  # ListingSerializer
├── listings/permissions.py  # IsOwnerOrReadOnly
└── listings/admin.py        # Admin verification queue

frontend/
├── components/ListingForm.tsx      # Create/edit form
├── components/PropertyCard.tsx     # Listing preview card
├── app/(app)/listing/[id]/page.tsx # Listing detail
└── hooks/useListings.ts
```

**Tests to pass:**
- [ ] Agent can create a listing (status: pending_verification)
- [ ] Agent can upload photos
- [ ] Admin can see pending listings in Django admin
- [ ] Admin can approve/reject listing
- [ ] Agent can view their own listings
- [ ] Agent cannot edit other agents' listings

**By end of Week 4:**
- You have a working listing creation flow
- Photos upload to Cloudinary
- Django admin shows verification queue
- Admin can approve/reject listings

---

### Week 5-6: Search & Save

**What you're doing:**
- Search/filter API (county, price range, bedrooms, amenities)
- Listing results page
- Save listings (bookmark feature)
- WhatsApp inquiry deeplink

**Key files to create:**
```
backend/
├── listings/filters.py      # django-filter setup
└── listings/views.py        # Add filtering logic

frontend/
├── components/Filters.tsx               # County, price, amenity filters
├── app/(app)/search/page.tsx            # Search results
├── app/(app)/listing/[id]/page.tsx      # Add save button
├── components/WhatsAppButton.tsx        # Inquiry button
└── hooks/useSavedListings.ts
```

**Tests to pass:**
- [ ] User can filter listings by county
- [ ] User can filter by price range
- [ ] User can filter by bedrooms
- [ ] User can filter by amenities (water, internet, etc.)
- [ ] Results show 20 per page
- [ ] User can save listing
- [ ] User can unsave listing
- [ ] Save button shows "Chat on WhatsApp" link

**By end of Week 6:**
- Search and filters work
- House hunters can find listings
- WhatsApp inquiry link works

---

### Week 7-8: Polish & Deploy

**What you're doing:**
- Error handling (proper HTTP responses)
- Logging (know when things break)
- Deploy to Render
- Basic tests (happy path)
- Security (rate limiting, no hardcoded secrets)

**Key files:**
```
backend/
├── findahome_backend/settings.py  # Logging config, SENTRY_DSN
├── utils/exception_handler.py     # Custom error responses
└── requirements.txt               # Add: sentry-sdk, gunicorn

frontend/
├── .env.example                   # Template
└── error boundary / 404 page
```

**Tests to pass:**
- [ ] Logging works (errors appear in Sentry)
- [ ] Rate limiting works (5 login attempts/min max)
- [ ] 404 pages work
- [ ] 500 errors are logged and user sees nice message
- [ ] No secrets in code (.env files are in .gitignore)
- [ ] App deploys to Render

**By end of Week 8:**
- App is live on a real domain
- Errors are logged
- Code is in GitHub (with proper .gitignore)
- You have a staging URL to share with agents

---

## Getting Real Users (Month 2)

### The Hard Part: Agent Outreach

You've been doing this since Week 1. Now you convert.

**Target: 10-15 agents with 100+ total listings**

### How to Get Agents

**Step 1: Find them**
- Google: "property agents in Nairobi" → LinkedIn profiles
- Real estate forums / blogs (Kenya property sites)
- Facebook property groups (find active admins)
- Instagram hashtags (#kenyarealestate, #nairobirentals)
- Direct outreach (cold email/LinkedIn)

**Step 2: Pitch**
```
Subject: Partnership opportunity - Free featured listing platform

Hi [Agent Name],

I'm building a verified rental platform for Kenya (findahome.com). 
We manually verify every listing to prevent scams—something that's 
clearly needed in the market.

I'm looking for 10-15 agents to be early partners. In exchange, you get:
- Free featured placement (top of county for 2 weeks)
- Direct support from me (help with listings, verification, any issues)
- Your listings on a trusted platform (no scams, real inquiries)

This is pre-launch. You'll have access before the market opens. 
The catch: I personally verify each listing (24-48h), so it's a bit slower 
at first. But quality over speed.

Interested? Let's chat: [your number / zoom link]

Cheers,
[Your name]
```

**Step 3: Get commitments**
- Call them (don't just email)
- Ask: "How many listings could you add in first month?"
- Ask: "What would make this valuable vs. OLX/Facebook?"
- Listen (you'll learn more than you expect)
- Get them to add at least 5 listings

**Step 4: Support them heavily**
- When they upload, verify same-day
- When they ask questions, respond immediately
- When you make a change, let them know
- They'll tell others if you're responsive

**By Week 4 of Month 2:**
- You have 10-15 agents
- You have 100+ listings
- You're doing verification manually (expect 30 min per listing first time)
- You're learning what's hard

**By Week 8 of Month 2:**
- You know your verification speed (15-30 min per listing realistically)
- You know which amenities matter (agents will tell you)
- You know if house hunters are actually using it
- You have real inquiry data (X people saved, Y people inquired)

---

## Iterating on Feedback (Month 3)

### Weekly Agent Calls

Pick 3-5 agents. Call them every week (15-30 min).

**Questions to ask:**
- "What's working for you?"
- "What's frustrating?"
- "What would make you list more homes with us?"
- "Are you getting quality inquiries?"
- "What do you see agents on OLX/Facebook doing better?"

**Document the answers.** Look for patterns.

### Common Feedback (You'll Hear These)

**"I need better lead quality"**
→ House hunters aren't serious
→ Solution: Add requirement for account creation (filter out spam)

**"Photos aren't loading fast"**
→ Cloudinary fine-tuning or image size optimization
→ Solution: Reduce image quality slightly, improve caching

**"I need to see who viewed my listings"**
→ Agent wants analytics
→ Solution: Simple counter (views this week, total views) in Django admin

**"The search filters are confusing"**
→ Agents complain that house hunters can't find homes
→ Solution: Simplify filters, add "popular amenities" section

### Build What They Ask For

**Don't build:**
- Fancy features you think are cool
- Recommendations engine (you don't have enough data)
- Chatbot (too complex)
- Advanced analytics (overkill)

**Do build:**
- What agents explicitly asked for (2-3 features max per month)
- Things that are clearly broken
- Things that slow down verification

### Expand to Second County

**Week 5 of Month 3:**
- Pick second county (Mombasa, Kisumi, or Nakuru)
- Find 5-10 agents there
- Repeat agent outreach process
- Verify their listings

**Learn:**
- Does the model work in different markets?
- Do utilities matter differently (water access in coastal Mombasa vs. landlocked Nakuru)?
- Are pricing patterns different?

---

## Scaling Decision (Month 4)

### The Metrics You Need

**By Week 1 of Month 4, measure:**

**Verification:**
- Time per listing (average)
- Rejection rate (% of listings rejected)
- Time from submission to published (SLA)

**Example:** "I verify 20 listings per week, average 25 min each, rejection rate 5%"

**House Hunter Engagement:**
- Weekly active users
- Listings saved per user
- Inquiry rate (% who saved that also inquired)
- Retention D7 (users who return week 2)

**Example:** "300 unique users this week, 150 saved listings, 12 inquiries, 40% return next week"

**Agent Satisfaction:**
- NPS: "On 0-10, how likely to recommend to another agent?"
- Inquiries received per listing per week
- Agent retention (still using after month 1?)

**Example:** "NPS +45 (good!), 0.5 inquiries per listing per week, 80% still active"

**Economics:**
- Cost to verify listing (your time, tools)
- Cost to support agent (your time)
- Revenue potential (can you monetize?)

**Example:** "Each listing costs 25 min to verify ($5-10 value of my time), each agent gets 2 hours support/month ($30-50 value)"

### The Three Paths

**Path A: This is Working (And You're Excited)**

Metrics show:
- ✅ Retention > 40% (people come back)
- ✅ Inquiry rate > 5% (agents getting real inquiries)
- ✅ NPS > 40 (agents would recommend)
- ✅ You could scale (verification is repeatable, not magical)

**Decision:** Hire help, raise money, go bigger

**Next steps:**
- Hire part-time operations person ($500-1000/month) to help verify
- Expand to 5 counties
- Plan Phase 2: Recommendations, chatbot, monetization
- Raise pre-seed ($50-100k)
- Timeline: 6-12 months to Series A readiness

---

**Path B: It's Okay But Slow**

Metrics show:
- ⚠️ Retention 20-40% (people come back sometimes)
- ⚠️ Inquiry rate 2-5% (agents getting some inquiries)
- ⚠️ NPS 20-40 (agents think it's okay, not amazing)
- ⚠️ Verification takes longer than you'd like

**Decision:** Keep building, optimize unit economics, bootstrap

**Next steps:**
- Introduce paid plans ($5-10/month for extra featured listings)
- Focus on profitability (reduce costs, increase revenue)
- Stay solo or hire one person (contractor basis)
- Expand slowly (one county at a time)
- Timeline: 12-18 months to $1k MRR sustainability

---

**Path C: It's Not Clicking**

Metrics show:
- ❌ Retention < 20% (people don't return)
- ❌ Inquiry rate < 2% (agents getting few inquiries)
- ❌ NPS < 20 (agents not interested)
- ❌ You're exhausted (verifying listings all day, no leverage)

**Decision:** Kill it, learn, move on

**Next steps:**
- Document what you learned (why didn't it work?)
- Talk to agents (get honest feedback)
- Celebrate shipping something (most people don't)
- Take 1-2 weeks break
- Start new idea with these insights
- Timeline: Ready for next project

---

### Weeks 5-8: Execute Your Decision

Depending on path, you:
- **Path A:** Start hiring, planning fundraise, building Phase 2
- **Path B:** Launch paid plans, optimize cost structure, keep iterating
- **Path C:** Archive project, document learnings, ideate next thing

---

## Deployment & Monitoring

### Deploying to Render (Free Tier → Paid)

**Steps:**

1. **Connect GitHub**
   - Push code to GitHub (create a repo)
   - Go to Render.com
   - Connect GitHub account
   - Select repository

2. **Create Web Service**
   - Name: findahome-api
   - Build command: `pip install -r requirements.txt`
   - Start command: `gunicorn findahome_backend.wsgi:application`
   - Environment variables: Add all .env variables in Render dashboard

3. **Create PostgreSQL Database** (optional, upgrade from SQLite later)
   - Render → Databases → Create PostgreSQL
   - Copy connection URL to `DATABASE_URL` in service

4. **Deploy**
   - Push to GitHub
   - Render auto-deploys
   - Check logs if it fails

**Cost:**
- Free tier: $0/month (limited, rebuilds when idle)
- Standard: $7-15/month (always on, includes free Postgres)

---

### Monitoring (Simple)

**Setup Sentry for error tracking:**

1. Create account at sentry.io
2. Create project (Django)
3. Add to requirements.txt: `sentry-sdk`
4. In settings.py:
```python
import sentry_sdk
sentry_sdk.init(dsn=os.getenv("SENTRY_DSN"))
```
5. Errors auto-report

**Check weekly:**
- Are there errors? (Sentry dashboard)
- How many users? (Django admin user count)
- How many listings? (Django admin listing count)
- Response time okay? (Render logs)

**Cost:**
- Free tier: 5k events/month ($0)
- Paid: $29/month (much later)

---

## Common Tasks

### Creating a Listing (As Agent)

```
Frontend:
1. Agent logs in
2. Click "Add Listing"
3. Fill form: title, price, county, bedrooms, bathrooms, description, photos, amenities
4. Click submit

Backend API:
POST /api/listings/
{
  "title": "Cozy 2-bed in Karen",
  "price_per_month": 45000,
  "county": "Nairobi",
  "sub_location": "Karen",
  "bedrooms": 2,
  "bathrooms": 1,
  "description": "Beautiful maisonette...",
  "property_type": "maisonette",
  "water_source": "borehole",
  "internet_provider": "safaricom_fiber",
  "furnished": "partial",
  "parking": "carport"
}
→ 201 Created
{
  "id": "uuid",
  "status": "pending_verification",
  "created_at": "2026-05-15T10:00:00Z"
}

Admin verifies:
1. Admin goes to Django admin
2. Sees "Listings" pending verification
3. Clicks listing to see full details + photos
4. Checks: Photos look real? Agent legitimate? Price reasonable?
5. Clicks "Approve" → Status changes to "verified" → Goes live
```

---

### Browsing & Searching (As House Hunter)

```
Frontend:
1. House hunter goes to /search
2. Selects county (dropdown)
3. Sets price range (slider)
4. Checks amenities (water, internet, parking)
5. Clicks "Search"
6. Results show 20 listings
7. Clicks listing to see detail
8. Clicks heart to save
9. Clicks "Chat on WhatsApp" → Opens WhatsApp with agent

Backend:
GET /api/listings/?county=Nairobi&price_min=20000&price_max=50000&bedrooms=2
→ 200 OK
{
  "count": 145,
  "next": "?page=2",
  "results": [...]
}
```

---

### Reporting Fraud (As House Hunter)

```
Frontend:
1. House hunter sees suspicious listing
2. Clicks "Report" button
3. Selects reason: "Fake listing" / "Misleading" / "Scam"
4. Optional: adds description
5. Submits

Backend:
POST /api/listings/{id}/report/
{
  "reason": "fake_listing",
  "description": "Photo doesn't match description"
}
→ 201 Created

Admin:
1. Admin goes to Django admin
2. Sees "Moderation Reports" section
3. Reviews report (reads description, looks at listing)
4. Takes action:
   - Dismiss (false report)
   - Warning (send email to agent)
   - Suspend (taken down, agent notified)
   - Remove (deleted, agent notified)
```

---

## Troubleshooting

### "Django won't start - ModuleNotFoundError"

```bash
# You haven't installed dependencies
pip install -r requirements.txt

# Make sure you're in the virtual environment
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate     # Windows
```

### "Cloudinary images not uploading"

```python
# Check credentials in .env
CLOUDINARY_CLOUD_NAME=your-name
CLOUDINARY_API_KEY=your-key
CLOUDINARY_API_SECRET=your-secret

# Test in Django shell
python manage.py shell
>>> from cloudinary.uploader import upload
>>> upload("image.jpg")
```

### "Next.js can't reach backend API"

```bash
# Check NEXT_PUBLIC_API_URL in .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Check backend has CORS enabled
# In Django settings.py:
INSTALLED_APPS = [
    ...
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Must be first
    ...
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://yourdomain.com",
]
```

### "Database error - table doesn't exist"

```bash
# You haven't run migrations
python manage.py migrate

# Check migration status
python manage.py showmigrations
```

### "Photos are huge and loading slowly"

```python
# Cloudinary auto-optimizes, but be explicit
# In model or serializer:
from cloudinary.models import CloudinaryField

image = CloudinaryField(
    'image',
    transformation=[
        {'width': 800, 'height': 600, 'crop': 'fill'},
        {'quality': 'auto'},
        {'fetch_format': 'auto'}
    ]
)

# Or in template:
<img src={`${image}?w=800&h=600&q=auto&f=auto`} />
```

### "Rate limiting blocks me"

```python
# In settings.py, disable for local dev
RATE_LIMIT_ENABLED = not DEBUG

# Or increase limits
RATE_LIMIT_PER_MINUTE = 1000  # Dev
```

---

## What Success Looks Like

### Month 1: Done

- ✅ App deployed and live
- ✅ You can create a listing and verify it
- ✅ A house hunter can search and save
- ✅ Photos upload and display correctly
- ✅ Code is clean (not perfect, but readable)
- ✅ Errors are logged (Sentry)

### Month 2: Traction

- ✅ 100+ verified listings live
- ✅ 10-15 agents actively using it
- ✅ House hunters are actually inquiring
- ✅ You know your verification speed (realistic SLA)
- ✅ You've learned what agents actually need
- ✅ Product is more polished (Week 1 ≠ Week 8)

### Month 3: Validation

- ✅ 200+ verified listings across 2 counties
- ✅ Agents asking for specific features (you shipped 2-3)
- ✅ Retention data shows people come back
- ✅ Real inquiries happening (you have numbers)
- ✅ You've iterated based on feedback
- ✅ You know if this is viable long-term

### Month 4: Decision

- ✅ You have real data (not guesses)
- ✅ You know if this is a business or a learning project
- ✅ You've made a decision (raise / bootstrap / pivot)
- ✅ You're ready for next phase (or ready to move on)

---

## When to Hire / Raise

### Don't Hire Until:

- ❌ You have at least 100+ verified listings and real traction
- ❌ You know what the job is (what would a second person do?)
- ❌ You're personally bottlenecked (e.g., 40 hours/week on verification)
- ❌ You have money to pay them ($500-1000/month minimum)

### When to Raise Money:

**Good signs for raising:**
- ✅ Real user traction (100+ users, real activity)
- ✅ Agent demand (agents asking "when can I list 50 homes?")
- ✅ Unit economics make sense (or path to profitability is clear)
- ✅ You've proven you can execute (shipped MVP solo)

**Avoid raising when:**
- ❌ You're guessing (no user data)
- ❌ You're tired and think money solves it (it doesn't)
- ❌ You haven't validated the market
- ❌ You don't have a realistic path to profitability

**How much to raise:**
- $50k: Hire 1 person (ops), expand to 5 counties, 6-month runway
- $100k: Hire 2 people (ops + marketing), expand nation-wide, build Phase 2, 12-month runway
- Don't raise more than you need (dilution)

**Who to pitch:**
- Micro-VCs (bet on solo founders)
- Angel investors (Kenya startup community)
- Pre-seed funds (Y Combinator-style)

---

## The Meta-Game: Why This Matters

You're not just building a product. You're learning:

**Technical Skills:**
- How to architect a real system (not a tutorial)
- How to deploy and monitor production code
- How to handle security, errors, edge cases
- How to ship something people use

**Business Skills:**
- How to find and talk to customers
- How to measure what matters (real metrics, not vanity)
- How to iterate based on feedback
- How to make trade-offs (what to build, what to skip)

**Personal Skills:**
- How to stay focused when tired
- How to make decisions alone
- How to ship imperfect work
- How to celebrate wins

**Most founders fail not because code is hard, but because they:**
- Never talk to users (code in isolation)
- Don't measure anything (guessing if it works)
- Can't focus (build 100 features, ship none)
- Give up too early (3 months in, expecting hockey stick growth)

**If you do this right, in 4 months you'll have:**
- Real product (not prototype)
- Real users (not friends)
- Real data (not guesses)
- Real options (raise, bootstrap, or pivot)

That's the game.

---

## One More Thing

**You will get tired. You will doubt yourself. This is normal.**

Week 3 you'll think "This is impossible, why am I doing this?"
Week 8 you'll have real listings and forget why you doubted.
Week 12 you'll have agents asking for features and feel unstoppable.
Week 16 you'll know if you're building a business or a learning project.

Both are wins.

Finish it. Ship it. Learn from it.

---

**Start Date:** May 1, 2026  
**Target Launch:** May 30, 2026 (soft)  
**Real Traction:** August 1, 2026  
**Decision Point:** August 30, 2026

