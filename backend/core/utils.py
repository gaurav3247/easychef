from enum import IntEnum

from django.db.models import Count
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import ValidationError

from accounts.models import UserProfile


def apply_recipe_filters(query, query_params):
    recipe_name = query_params.get('name', None)
    skip = query_params.get('skip', None)
    take = query_params.get('take', None)
    users = query_params.getlist('creator', None)
    ingredients = query_params.getlist('ingredient', None)
    cuisines = query_params.getlist('cuisine', None)
    diets = query_params.getlist('diet', None)
    cooking_times = query_params.getlist('cookTime', None)

    if recipe_name:
        query = query.filter(name__icontains=recipe_name)
    if users:
        query = query.filter(user__in=users)
    if ingredients:
        query = query.filter(ingredients__name__in=ingredients)
    if cuisines:
        query = query.filter(cuisine__in=cuisines)
    if diets:
        query = query.filter(recipediets__diet__in=diets)
    if cooking_times:
        query = query.filter(cooking_time__in=cooking_times)

    query = query.annotate(number_of_saves=Count('favorites'))
    query = query.order_by('number_of_saves')

    if skip:
        query = query[int(skip):]
    if take:
        query = query[:int(take)]

    return query


def get_item(item_model, request):
    """Gets instance of type item_model, using user and recipe_id.
    Returns 400 error if recipe_id is not int and 404 if instance not
    found."""

    user = request.user
    recipe = request.POST.get('recipeID')
    try:
        return get_object_or_404(item_model, user=user, recipeID=recipe)
    except ValueError:
        raise ValidationError("RecipeID should be an integer", 400)


def get_user_profile(userid):
    """Returns UserProfile based on User"""
    return get_object_or_404(UserProfile, id=userid)
