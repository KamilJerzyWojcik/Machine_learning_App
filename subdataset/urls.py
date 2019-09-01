from django.urls import path
from . import views

app_name = "subdataset"

urlpatterns = [
    path('get_list_subdataset', views.get_list_subdataset, name='get_list_subdataset'),
    path('create_subdataset', views.create_subdataset, name='create_subdataset'),
    path('delete_subdataset', views.delete_subdataset, name='delete_subdataset'),
    path('get_by_id_subdataset', views.get_by_id_subdataset, name="get_by_id_subdataset"),
    path('get_max_pages_by_id', views.get_max_pages_by_id, name="get_max_pages_by_id"),
    path('delete_columns', views.delete_columns, name="delete_columns"),
    path('create_column', views.create_column, name="create_column"),
    path('create_all_combinations', views.create_all_combinations, name="create_all_combinations")
]
