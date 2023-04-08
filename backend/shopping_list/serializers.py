from rest_framework import serializers
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import ValidationError

from core.utils import get_user_profile
from recipe.models import Recipe, Ingredient
from shopping_list.models import ShoppingListItem


class ShoppingListSerializer(serializers.ModelSerializer):
    recipe_name = serializers.CharField(source='recipeID.name', read_only=True)
    recipe_img = serializers.CharField(source='recipeID.preview_picture',
                                       read_only=True)

    class Meta:
        model = ShoppingListItem
        fields = ('servingSize', 'recipe_name', 'recipeID', 'recipe_img')

    def create(self, validated_data):
        request = self.context['request']
        user = get_user_profile(request.user.id)
        recipe_id = request.POST.get('recipeID', '')
        recipe = get_object_or_404(Recipe, id=recipe_id)
        if ShoppingListItem.objects.filter(user=user, recipeID=recipe_id):
            raise ValidationError("Recipe already in shopping list")

        valid_data = validated_data | {'user': user, 'recipeID': recipe}
        return super().create(valid_data)


class ShippingListIngredientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ('name', 'quantity')


class ChangeServingSerializer(serializers.ModelSerializer):
    recipe_name = serializers.CharField(source='recipeID.name', read_only=True)

    class Meta:
        model = ShoppingListItem
        fields = ('servingSize', 'recipe_name', 'recipeID')

    def update(self, instance, validated_data):
        instance.servingSize = validated_data.get('servingSize', instance.servingSize)
        instance.save()
        return instance
