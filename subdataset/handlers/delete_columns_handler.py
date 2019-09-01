from ..models import SubDataset
from django.http import JsonResponse
import json
import pandas as pd


def handle(request):
    dataset_request = json.loads(request.body)
    dataset_id = dataset_request["id"]
    dataset_columns = dataset_request["columns"]
    sub_dataset = SubDataset.objects.filter(pk=dataset_id)
    file = pd.read_csv(sub_dataset[0].url)
    keep_col = dataset_columns
    new_f = file[keep_col]
    new_f.to_csv(sub_dataset[0].url, index=False)
    return JsonResponse({"id": dataset_id, "cols": str(dataset_columns)}, safe=False, content_type="application/json")
