# FindAHome Backend

FindAHome is a comprehensive, secure backend API for a Kenyan real estate platform, built with Django and Django REST Framework. It is designed to safely connect House Hunters, Landlords, and Agents while providing powerful administration and anti-fraud tools.

## 🚀 Features

- **Role-Based Access Control (RBAC)**: Distinct permissions for ADMIN, AGENT, LANDLORD, and HOUSE_HUNTER.
- **Advanced Authentication**: Powered by dj-rest-auth, django-allauth, and SimpleJWT.
- **Verification Gates**: Standard users (House Hunters) are auto-verified, while Agents and Landlords require Admin verification.
- **Property Listings Directory**: Robust property management allowing Agents/Landlords to manage properties.
- **Fraud Reporting & Moderation**: Users can flag listings (e.g., Fake, Unavailable). Admins get a tailored dashboard to resolve tickets.

## 🛠️ Tech Stack

- Python 3.12, Django, Django REST Framework (DRF), SimpleJWT, django-allauth, SQLite.

## 🏗️ Getting Started

1. **Set up Virtual Environment**
   `ash
   python -m venv .venv
   .venv\Scriptsctivate
   `

2. **Install Dependencies**
   `ash
   pip install -r requirements.txt
   `

3. **Apply Database Migrations**
   `ash
   python manage.py migrate
   `

4. **Run the Development Server**
   `ash
   python manage.py runserver
   `
