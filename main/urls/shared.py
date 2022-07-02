"""
main URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
"""
from django.urls import path, re_path
from main import views
from graphene_django.views import GraphQLView
from django.conf import settings

urlpatterns = [
    path('graphql', GraphQLView.as_view(graphiql=settings.DEBUG)),
    re_path('^.*$', views.index),
]
