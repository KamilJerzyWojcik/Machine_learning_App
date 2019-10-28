from django.http import JsonResponse
from statistic_subdataset.models_class.statistics_item import StatisticsItem
from subdataset.models import SubDataset
import json
import pandas as pd


def handle(request):
    dataset_id = json.loads(request.body)
    sub_dataset = list(SubDataset.objects.filter(pk=dataset_id))[0]
    dataframe = pd.read_csv(sub_dataset.url)
    per = dataframe.count() / len(dataframe)
    keys = per.keys()
    result = []
    for k in keys:
        if per[k] < 1:
            result.append(StatisticsItem(k, per[k]))
    return JsonResponse({"data": json.dumps(result, default=serialize)}, safe=False, content_type="application/json")


def serialize(obj):
    """JSON serializer for objects not serializable by default json code"""
    return obj.__dict__
