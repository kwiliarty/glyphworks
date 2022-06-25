"""
main URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
"""
from django.urls import path
from main import views
from graphene_django.views import GraphQLView
from django.conf import settings

urlpatterns = [
    path('', views.index),
    path('graphql', GraphQLView.as_view(graphiql=settings.DEBUG)),
]
