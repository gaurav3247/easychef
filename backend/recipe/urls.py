from django.conf.urls.static import static
from django.urls import path
from recipe.views import DuplicateRecipeView, RecipeView, RecipeDetailsView, \
  IngredientsAutocomplete, RecipeListView, AddRatingView, \
  RecipeFavoriteListView, AddCommentView, AllCommentsView, DeleteRecipeView, \
  RemoveFavouriteView, InteractionsView, AddFavouriteView, CreatorsListView, \
  IngredientsListView, CuisineListView, DietListView, \
  TopCreatorsView, PopularRecipesView, RecipePreviewPictureUploadView, AddDietView, AddCuisineView, RecipeListCountView, \
  RecipeFavoriteCountListView, InteractionsCountView, AttachmentUploadView

urlpatterns = [
  path('save/', RecipeView.as_view()),
  path('upload-preview-pricture/<int:id>/', RecipePreviewPictureUploadView.as_view()),
  path('upload-attachment-pricture/<int:id>/', AttachmentUploadView.as_view()),
  path('details/<int:id>/', RecipeDetailsView.as_view()),
  path('rate/<int:id>/', AddRatingView.as_view()),
  path('duplicate/<int:id>/', DuplicateRecipeView.as_view()),
  path('ingredients/atocompleteBy/<str:name>/', IngredientsAutocomplete.as_view()),
  path('list/', RecipeListView.as_view()),
  path('list-count/', RecipeListCountView.as_view()),
  path('favorites/', RecipeFavoriteListView.as_view()),
  path('favorites-count/', RecipeFavoriteCountListView.as_view()),
  path('all-comments/<int:id>/', AllCommentsView.as_view()),
  path('comment/<int:id>/', AddCommentView.as_view()),
  path('delete/<int:id>/', DeleteRecipeView.as_view()),
  path('add-to-favorite/<int:id>/', AddFavouriteView.as_view()),
  path('remove-from-favorite/<int:id>/', RemoveFavouriteView.as_view()),
  path('interactions/', InteractionsView.as_view()),
  path('interactions-count/', InteractionsCountView.as_view()),
  path('filters/creator/', CreatorsListView.as_view()),
  path('filters/ingredients/', IngredientsListView.as_view()),
  path('filters/cuisines/', CuisineListView.as_view()),
  path('filters/diets/', DietListView.as_view()),
  path('popular-recipes/', PopularRecipesView.as_view()),
  path('top-creators/', TopCreatorsView.as_view()),
  path('add-diet/', AddDietView.as_view()),
  path('add-cuisine/', AddCuisineView.as_view()),
] + static('preview_picture/', document_root='recipe/preview_picture') \
              + static('comment_attachment/', document_root='recipe/comment_attachment') \
