from django.urls import path
from . import views

app_name = "dataset"

urlpatterns = [
    path('upload_data', views.upload_data, name='upload_data'),
    path('get_list_dataset', views.get_list_dataset, name='get_list_dataset'),
    path('delete_dataset', views.delete_dataset, name='delete_dataset'),
    path('edit_dataset', views.edit_dataset, name="edit_dataset"),
    path('get_names_dataset', views.get_names_dataset, name="get_names_dataset"),
    path('get_dataset_by_id', views.get_dataset_by_id, name="get_dataset_by_id"),
]
