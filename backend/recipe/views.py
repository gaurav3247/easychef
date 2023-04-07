from rest_framework import status
from django.db.models import Count
from accounts.models import UserProfile
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from core.utils import apply_recipe_filters, get_item, get_user_profile
from accounts.serializers import UpdateUserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound, AuthenticationFailed
from recipe.models import Rating, Recipe, Ingredient, Favorite, Cuisine, Diet, Comment
from rest_framework.generics import CreateAPIView, DestroyAPIView, ListAPIView, RetrieveAPIView
from recipe.serializers import RatingSerializer, RecipeSerializers, IngredientAutocompleteSerializer, \
    RecipeListSerializer, CreatorSerializer, CuisineSerializer, DietSerializer, CookingTimeSerializer, \
    FavoriteSerializer, AddCommentSerializer, RecipePreviewPictureUploadSerializers


class RecipeView(APIView):
    serializer_class = RecipeSerializers
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        new_recipe = request.data.copy()
        new_recipe['user'] = request.user.id
        serializer = self.serializer_class(data=new_recipe)

        if serializer.is_valid():
            serializer.create(serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        recipe_id = request.data.get('id')
        if not Recipe.objects.filter(id=recipe_id).exists():
            return Response({"error": "Recipe not found."}, status=status.HTTP_404_NOT_FOUND)

        recipe = Recipe.objects.get(id=recipe_id)
        if recipe.user.id != request.user.id:
            return Response({"error": "You can't edit this recipe."}, status=status.HTTP_403_FORBIDDEN)

        serializer = self.serializer_class(recipe, data=request.data)
        if serializer.is_valid():
            serializer.update(recipe, serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RecipePreviewPictureUploadView(APIView):
    serializer_class = RecipePreviewPictureUploadSerializers
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        recipe_id = kwargs['id']
        if not Recipe.objects.filter(id=recipe_id).exists():
            return Response({"error": "Recipe not found."}, status=status.HTTP_404_NOT_FOUND)

        recipe = Recipe.objects.get(id=recipe_id)
        if recipe.user.id != request.user.id:
            return Response({"error": "You can't edit this recipe."}, status=status.HTTP_403_FORBIDDEN)

        serializer = self.serializer_class(recipe, data=request.data)
        if serializer.is_valid():
            serializer.update(recipe, serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RecipeDetailsView(APIView):
    serializer_class = RecipeSerializers

    def get(self, request, *args, **kwargs):
        recipe_id = kwargs['id']
        if not Recipe.objects.filter(id=recipe_id).exists():
            return Response({"error": "Recipe not found."}, status=status.HTTP_404_NOT_FOUND)

        recipe = Recipe.objects.get(id=recipe_id)
        serializer = self.serializer_class(recipe)

        return Response(serializer.data, status=status.HTTP_200_OK)


class AddRatingView(CreateAPIView, ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = RatingSerializer

    def get_queryset(self):
        return Rating.objects.filter(user=self.request.user)


class DuplicateRecipeView(RetrieveAPIView):
    serializer_class = RecipeSerializers
    permission_classes = [IsAuthenticated]

    def get_object(self):
        recipe_id = self.kwargs['id']
        return get_object_or_404(Recipe, id=recipe_id)


class IngredientsAutocomplete(APIView):
    serializer_class = IngredientAutocompleteSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        ingredient_name = kwargs['name']
        query = "SELECT DISTINCT id, name " \
                "FROM recipe_ingredient " \
                "WHERE name LIKE {name}" \
                "GROUP BY name"

        ingredients = Ingredient.objects.raw(query.format(name=f"'%{ingredient_name}%'"))
        serializer = self.serializer_class(ingredients, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class RecipeListView(ListAPIView):
    serializer_class = RecipeListSerializer

    def get_queryset(self):
        query = Recipe.objects.all()
        query = apply_recipe_filters(query, self.request.query_params)
        return query


class RecipeFavoriteListView(ListAPIView):
    serializer_class = RecipeListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        favorite_recipes = Favorite.objects \
            .filter(user=self.request.user).select_related('recipe') \
            .values_list('recipe', flat=True).distinct()

        query = Recipe.objects.filter(id__in=favorite_recipes)
        query = apply_recipe_filters(query, self.request.query_params)
        return query


class AddFavouriteView(APIView):
    serializer_class = RecipeListSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        recipe_id = self.kwargs['id']
        if not Recipe.objects.filter(id=recipe_id).exists():
            return Response({"error": "Recipe not found."}, status=status.HTTP_404_NOT_FOUND)

        user = UserProfile.objects.get(id=self.request.user.id)
        recipe = Recipe.objects.get(id=recipe_id)

        if Favorite.objects.filter(user=user, recipe=recipe).exists():
            return Response({"error": "Recipe already in favourites."}, status=status.HTTP_400_BAD_REQUEST)

        Favorite.objects.create(user=user, recipe=recipe)

        return Response({"success": "Added to favourites"}, status=status.HTTP_201_CREATED)


class RemoveFavouriteView(DestroyAPIView):
    serializer_class = FavoriteSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user_id = self.request.user.id
        user = get_user_profile(user_id)
        recipe_id = self.kwargs['id']
        return get_object_or_404(Favorite, user=user, recipe=recipe_id)

    def delete(self, request, *args, **kwargs):
        item = self.get_object()
        self.perform_destroy(item)
        return Response({"success": f"Removed {item} from favourites"}, status=status.HTTP_200_OK)


class InteractionsView(ListAPIView):
    serializer_class = RecipeListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        favorite_recipes = Favorite.objects \
            .filter(user=self.request.user).select_related('recipe') \
            .values_list('recipe', flat=True).distinct()

        rated_recipes = Rating.objects \
            .filter(user=self.request.user).select_related('recipeID') \
            .values_list('recipeID', flat=True).distinct()

        commented = Comment.objects \
            .filter(user=self.request.user).select_related('recipe') \
            .values_list('recipe', flat=True).distinct()

        created = Recipe.objects \
            .filter(user=self.request.user).select_related('recipe') \
            .values_list('id', flat=True).distinct()

        recipe_ids = list(favorite_recipes) + list(rated_recipes) + list(commented) + list(created)
        recipe_ids = list(set(recipe_ids))

        query = Recipe.objects.filter(id__in=recipe_ids)
        query = apply_recipe_filters(query, self.request.query_params)

        return query


class CreatorsListView(ListAPIView):
    serializer_class = CreatorSerializer

    def get_queryset(self):
        creators = Recipe.objects \
            .all().select_related('user') \
            .values_list('user', flat=True).distinct()

        return User.objects.filter(id__in=creators)


class IngredientsListView(ListAPIView):
    serializer_class = IngredientAutocompleteSerializer

    def get_queryset(self):
        query = "SELECT DISTINCT id, name " \
                "FROM recipe_ingredient " \
                "GROUP BY name"

        return Ingredient.objects.raw(query)


class CuisineListView(ListAPIView):
    serializer_class = CuisineSerializer

    def get_queryset(self):
        return Cuisine.objects.all()


class DietListView(ListAPIView):
    serializer_class = DietSerializer

    def get_queryset(self):
        return Diet.objects.all()


class AddDietView(CreateAPIView):
    serializer_class = DietSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        new_diet = request.data.copy()
        serializer = self.serializer_class(data=new_diet)
        if 'name' not in new_diet or new_diet['name'] is None:
            return Response({"error": "Diet name cannot be empty."}, status=status.HTTP_400_BAD_REQUEST)
        if Diet.objects.filter(name=new_diet['name']).exists():
            return Response({"error": "Diet already exists."}, status=status.HTTP_400_BAD_REQUEST)

        if serializer.is_valid():
            serializer.create(serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AddCuisineView(CreateAPIView):
    serializer_class = CuisineSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        new_cuisine = request.data.copy()
        serializer = self.serializer_class(data=new_cuisine)
        if 'name' not in new_cuisine or new_cuisine['name'] is None:
            return Response({"error": "Cuisine name cannot be empty."}, status=status.HTTP_400_BAD_REQUEST)
        if Cuisine.objects.filter(name=new_cuisine['name']).exists():
            return Response({"error": "Cuisine already exists."}, status=status.HTTP_400_BAD_REQUEST)

        if serializer.is_valid():
            serializer.create(serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AddCommentView(CreateAPIView):
    serializer_class = AddCommentSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        new_comment = request.data.copy()
        new_comment['user'] = request.user.id
        new_comment['recipe'] = self.kwargs['id']
        serializer = self.serializer_class(data=new_comment)

        if serializer.is_valid():
            serializer.create(serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AllCommentsView(ListAPIView):
    serializer_class = AddCommentSerializer

    def get_queryset(self):
        if not Recipe.objects.filter(id=self.kwargs['id']).exists():
            raise NotFound("Recipe does not exist")
        else:
            return Comment.objects.filter(recipe=self.kwargs['id']).all().order_by('date_created')


class DeleteRecipeView(DestroyAPIView):
    serializer_class = RecipeSerializers
    permission_classes = [IsAuthenticated]

    def get_object(self):
        recipe_id = self.kwargs['id']
        user_id = self.request.user.id
        if not Recipe.objects.filter(id=recipe_id, user=user_id).exists():
            raise AuthenticationFailed("You do not have permission to delete this recipe")
        else:
            return get_object_or_404(Recipe, id=recipe_id)

    def destroy(self, request, *args, **kwargs):
        recipe = self.get_object()
        self.perform_destroy(recipe)
        return Response({"success": "Recipe deleted"}, status=status.HTTP_200_OK)


class PopularRecipesView(ListAPIView):
    serializer_class = RecipeListSerializer

    def get_queryset(self):
        take = self.request.query_params.get('take', None)
        query = Recipe.objects \
            .all().annotate(number_of_saves=Count('favorites')) \
            .order_by('-number_of_saves')

        if take:
            query = query[:int(take)]

        return query


class TopCreatorsView(ListAPIView):
    serializer_class = UpdateUserSerializer

    def get_queryset(self):
        take = self.request.query_params.get('take', None)
        query = UserProfile.objects \
            .all().annotate(number_of_recipes_created=Count('recipe')) \
            .order_by('-number_of_recipes_created')

        if take:
            query = query[:int(take)]

        return query
