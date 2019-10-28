from django.http import JsonResponse
import json
from statistic_subdataset.models_class.statistics_item import StatisticsItem
from subdataset.models import SubDataset
import pandas as pd


def handle(request):
    dataset_id = json.loads(request.body)
    sub_dataset = list(SubDataset.objects.filter(pk=dataset_id))[0]
    label = sub_dataset.label
    raport_url = sub_dataset.raport_url
    dataframe = pd.read_csv(sub_dataset.url).select_dtypes(include=['float64'])
    keys = dataframe.columns
    statistics_data = []
    corr_matrix = dataframe.corr()
    corr_matrix_label = corr_matrix[label].sort_values(ascending=False)
    for key in keys:
        item = StatisticsItem(key, corr_matrix_label[key])
        statistics_data.append(item)
    statistics_data.sort(key=lambda x: abs(x.value), reverse=True)
    return JsonResponse({"data": json.dumps(statistics_data, default=serialize), "label": label, "raport_url": raport_url}, safe=False, content_type="application/json")


def serialize(obj):
    """JSON serializer for objects not serializable by default json code"""
    return obj.__dict__
