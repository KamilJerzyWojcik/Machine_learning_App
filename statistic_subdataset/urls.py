from django.urls import path
from . import views

app_name = "statistic_subdataset"

urlpatterns = [
    path('get_statistics_subdataset_by_id',
         views.get_statistics_subdataset_by_id,
         name='get_statistics_subdataset_by_id'),
    path('set_label_subdataset', views.set_label_subdataset, name="set_label_subdataset")
]
