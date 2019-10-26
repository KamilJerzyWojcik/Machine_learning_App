from django.http import JsonResponse
import json
from statistic_subdataset.models_class.statistics import Statistics
from statistic_subdataset.models_class.statistics_item import StatisticsItem
from subdataset.models import SubDataset
import pandas as pd


def handle(request):
    dataset_id = json.loads(request.body)
    sub_dataset = SubDataset.objects.filter(pk=dataset_id)
    label = sub_dataset[0].label
    raport_url = sub_dataset[0].raport_url
    dataframe = pd.read_csv(sub_dataset[0].url)
    data = dataframe.describe().to_dict()
    keys = dataframe.columns
    statistics_data = []
    for key in keys:
        values = data.get(key, -1)
        if values != -1:
            stat = Statistics(key)
            for val_key in values:
                item = StatisticsItem(
                    name=val_key,
                    value=values[val_key]
                )
                stat.items.append(item)
            statistics_data.append(stat)
    return JsonResponse({"data": json.dumps(statistics_data, default=serialize), "label": label, "raport_url": raport_url}, safe=False, content_type="application/json")


def serialize(obj):
    """JSON serializer for objects not serializable by default json code"""
    return obj.__dict__
