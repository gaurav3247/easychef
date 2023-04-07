from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

from core.core import EntityBase, EntityOwner


class Recipe(EntityBase, EntityOwner):
    steps = models.TextField()
    name = models.CharField(max_length=200)
    prep_time = models.CharField(max_length=200, null=True)
    cooking_time = models.CharField(max_length=200, null=True)
    serving = models.IntegerField(validators=[MinValueValidator(1)])
    preview_picture = models.ImageField(upload_to='recipe/preview_picture', null=True)

    diets = models.ManyToManyField('Diet', through='RecipeDiets')
    cuisine = models.ForeignKey('Cuisine', on_delete=models.CASCADE, null=True)
    base_recipe = models.ForeignKey('self', on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name


class Diet(EntityBase):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class RecipeDiets(EntityBase):
    diet = models.ForeignKey(Diet, on_delete=models.PROTECT)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)

    def __str__(self):
        return self.recipe.name + " - " + self.diet.name


class Favorite(EntityBase, EntityOwner):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='favorites')

    def __str__(self):
        return self.recipe.name


class Comment(EntityBase, EntityOwner):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    text = models.TextField()

    def __str__(self):
        return self.recipe.name + " - " + self.user.username


class CommentAttachment(EntityBase):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name='attachments')
    attachment = models.FileField(upload_to='recipe/comment_attachment')

    def __str__(self):
        return self.comment.recipe.name + " - " + self.comment.user.username


class Ingredient(EntityBase):
    name = models.CharField(max_length=200)
    quantity = models.FloatField()
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='ingredients')

    def __str__(self):
        return self.name


class Cuisine(EntityBase):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Rating(EntityBase, EntityOwner):
    rating = models.DecimalField(max_digits=2, decimal_places=1,
                                 validators=[MinValueValidator(0),
                                             MaxValueValidator(5)])
    recipeID = models.ForeignKey(to=Recipe, on_delete=models.CASCADE)


# class Interactions(EntityBase, EntityOwner):
#     recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
#     interaction_type = models.IntegerField(choices=InteractionType.choices(), default=InteractionType.UNKNOWN)
#
#     def __str__(self):
#         return self.recipe.name + " - " + self.user.username

