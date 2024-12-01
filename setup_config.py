import os
import sys
import django

# Set up Django settings before importing models
os.environ['DJANGO_SETTINGS_MODULE'] = 'task_manager.settings'
django.setup()

from django.contrib.sites.models import Site
from allauth.socialaccount.models import SocialApp
from django.core.management import execute_from_command_line

def setup_site():
    try:
        # Try to get the existing site
        site = Site.objects.get(id=1)
        site.domain = 'localhost:8000'
        site.name = 'Task Manager'
        site.save()
        print(f"Updated existing site: {site.domain}")
    except Site.DoesNotExist:
        # Create a new site if it doesn't exist
        site = Site.objects.create(
            id=1,
            domain='localhost:8000',
            name='Task Manager'
        )
        print(f"Created new site: {site.domain}")
    return site

def setup_social_app(site):
    # Get Google OAuth credentials from environment
    client_id = os.getenv('GOOGLE_CLIENT_ID')
    secret = os.getenv('GOOGLE_CLIENT_SECRET')
    
    if not client_id or not secret:
        print("Error: GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be set in .env file")
        return
    
    try:
        # Try to get existing social app
        social_app = SocialApp.objects.get(provider='google')
        social_app.name = 'Google OAuth'
        social_app.client_id = client_id
        social_app.secret = secret
        social_app.save()
        print("Updated existing Google OAuth configuration")
    except SocialApp.DoesNotExist:
        # Create new social app
        social_app = SocialApp.objects.create(
            provider='google',
            name='Google OAuth',
            client_id=client_id,
            secret=secret
        )
        print("Created new Google OAuth configuration")
    
    # Ensure the site is in the social app's sites
    if site not in social_app.sites.all():
        social_app.sites.add(site)
    
    return social_app

if __name__ == '__main__':
    print("Starting configuration...")
    site = setup_site()
    social_app = setup_social_app(site)
    print("Configuration completed successfully!")
