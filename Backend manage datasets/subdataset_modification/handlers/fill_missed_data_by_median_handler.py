from django.http import JsonResponse
import json
import pandas as pd
from subdataset.models import SubDataset


def handle(request):
    dataset_request = json.loads(request.body)
    dataset_id = dataset_request["id"]
    dataset_columns = dataset_request["column"]
    sub_dataset = list(SubDataset.objects.filter(pk=dataset_id))[0]
    dataframe = pd.read_csv(sub_dataset.url)
    median = dataframe[dataset_columns].median()
    dataframe[dataset_columns].fillna(median, inplace=True)
    dataframe.to_csv(sub_dataset.url, index=False)
    return JsonResponse({"data": "ok"}, safe=False, content_type="application/json")

