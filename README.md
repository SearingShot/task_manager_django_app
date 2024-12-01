# Task Manager with Google Authentication

A Django-based task management application with Google OAuth authentication.

## Features

- Google Authentication
- Task Management (Create, Read, Update, Delete)
- Admin Panel for OAuth and User Management
- User-specific Task Views
- Email Invitations for New Users

## Setup Instructions

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Configure Google OAuth:
   - Go to Google Cloud Console (https://console.cloud.google.com)
   - Create a new project
   - Enable Google+ API
   - Create OAuth 2.0 credentials (Web application)
   - Add authorized redirect URIs:
     - http://localhost:8000/accounts/google/login/callback/
   - Save your Client ID and Client Secret

3. Configure environment variables:
   Create a `.env` file in the project root with:
```
SECRET_KEY=your-django-secret-key
DEBUG=True
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-email-app-password
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Create a superuser:
```bash
python manage.py createsuperuser
```

6. Configure Google OAuth in Django Admin:
   - Log in to admin panel
   - Add a new Site (if not exists)
   - Add a new Social Application:
     - Provider: Google
     - Name: Google OAuth
     - Client ID: Your Google Client ID
     - Secret Key: Your Google Client Secret
     - Sites: Add your site

7. Run the development server:
```bash
python manage.py runserver
```

## Usage

1. Visit http://localhost:8000
2. Click "Login with Google"
3. Manage your tasks after authentication

## Admin Features

Access the admin panel at http://localhost:8000/admin to:
- Manage Google OAuth settings
- View and manage users
- Send email invitations to new users
- Monitor tasks
