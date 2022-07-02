"""
dev URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
"""
from django.urls import path
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from . import shared

urlpatterns = [
    path('admin/', admin.site.urls),
    *shared.urlpatterns,
    *staticfiles_urlpatterns(),  # for styleguide assets
]
