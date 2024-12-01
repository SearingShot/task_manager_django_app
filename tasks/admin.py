from django.contrib import admin
from django.contrib.sites.models import Site
from allauth.socialaccount.models import SocialApp
from .models import Task

# Register your models here.

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'created_at', 'updated_at')
    list_filter = ('user', 'created_at')
    search_fields = ('title', 'description', 'user__email')

# Register the SocialApp model if it's not already registered
try:
    admin.site.register(SocialApp)
except admin.sites.AlreadyRegistered:
    pass
