from django.urls import path
from shopping_list.views import AddShoppingItemView, ChangeServingSizeView, DeleteShoppingItem, ShoppingListView, \
  ShoppingListIngredientsView
from django.conf.urls.static import static

urlpatterns = [
  path('details/', ShoppingListView.as_view()),
  path('ingredients/', ShoppingListIngredientsView.as_view()),
  path('add-recipe/', AddShoppingItemView.as_view()),
  path('remove-recipe/', DeleteShoppingItem.as_view()),
  path('change-serving-size/', ChangeServingSizeView.as_view())
] + static('preview_picture/', document_root='../recipe/preview_picture')
