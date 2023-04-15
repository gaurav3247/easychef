from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.db.models import SET_NULL

from core.core import EntityBase, EntityOwner
from recipe.models import Recipe


# Create your models here.
class ShoppingListItem(EntityBase, EntityOwner):
    servingSize = models.PositiveIntegerField(validators=[MinValueValidator(1),
                                                          MaxValueValidator(100)])
    recipeID = models.ForeignKey(to=Recipe, on_delete=models.CASCADE, null=True)

    def __str__(self):
        recipe_name = self.recipeID.name
        return f'{self.servingSize} serving/s of {recipe_name}'
