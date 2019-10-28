from django.urls import path
from . import views

app_name = "subdataset_modification"

urlpatterns = [
        path('get_columns_with_missed_values', views.get_columns_with_missed_values,
             name='get_columns_with_missed_values'),
        path('delete_rows_with_missed_values', views.delete_rows_with_missed_values,
             name='delete_rows_with_missed_values'),
        path('fill_missed_data_by_median', views.fill_missed_data_by_median,
             name='fill_missed_data_by_median'),
        path('apply_imputer_to_fill_missed_values', views.apply_imputer_to_fill_missed_values,
             name='apply_imputer_to_fill_missed_values'),
        path('delete_one_column_by_name', views.delete_one_column_by_name,
             name='delete_one_column_by_name'),
]
