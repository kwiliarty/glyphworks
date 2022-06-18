"""
dev URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
"""
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from . import shared

# staticfiles_urlpatterns helps us load assets into the styleguide
urlpatterns = shared.urlpatterns + staticfiles_urlpatterns()
