from core.utils import get_item
from recipe.models import Ingredient
from django.http import JsonResponse
from rest_framework.response import Response
from shopping_list.models import ShoppingListItem
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import DestroyAPIView, ListAPIView, CreateAPIView, UpdateAPIView
from shopping_list.serializers import ChangeServingSerializer, ShoppingListSerializer, ShippingListIngredientsSerializer


class ShoppingListView(ListAPIView):
    serializer_class = ShoppingListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ShoppingListItem.objects.filter(user=user)


class AddShoppingItemView(CreateAPIView):
    serializer_class = ShoppingListSerializer
    permission_classes = [IsAuthenticated]


class DeleteShoppingItem(DestroyAPIView):
    serializer_class = ShoppingListSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_item(ShoppingListItem, self.request)

    def delete(self, request, *args, **kwargs):
        item = self.get_object()
        response = 'Removed ' + str(item) + ' from list'
        self.perform_destroy(item)
        return Response(response)


class ChangeServingSizeView(UpdateAPIView):
    serializer_class = ChangeServingSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_item(ShoppingListItem, self.request)


class ShoppingListIngredientsView(ListAPIView):
    serializer_class = ShippingListIngredientsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        recipes_ids = ShoppingListItem.objects.filter(user=user).values_list('recipeID', flat=True).distinct()
        str_recipes_ids = str(tuple(recipes_ids))
        if len(recipes_ids) == 1:
            str_recipes_ids = str_recipes_ids.replace(',', '')

        query = "SELECT * " \
                "FROM recipe_ingredient " \
                "WHERE recipe_id IN {str_recipes_ids}" \

        ingredients = list(Ingredient.objects.raw(query.format(str_recipes_ids=f"{str_recipes_ids}")))
        ingredients_dict = {}

        for ingredient in ingredients:
            recipe_id = ingredient.recipe
            serving_size = ShoppingListItem.objects.get(user=user, recipeID=recipe_id).servingSize
            if ingredient.name not in ingredients_dict:
                ingredients_dict[ingredient.name] = ingredient.quantity * serving_size
            else:
                ingredients_dict[ingredient.name] += ingredient.quantity * serving_size

        return ingredients_dict

    def get(self, request, *args, **kwargs):
        ingredients_dict = self.get_queryset()
        ingredients = [{"Ingredient": ingredient, "Quantity": ingredients_dict[ingredient]} for ingredient in list(ingredients_dict)]

        return JsonResponse({'ingredients': ingredients})
