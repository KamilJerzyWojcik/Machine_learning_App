from ..models import SubDataset
from django.http import JsonResponse
import json
import pandas as pd
from django.utils import timezone


def handle(request):
    dataset_request = json.loads(request.body)
    dataset_id = dataset_request["id"]
    dataset_columns = dataset_request["columns"]
    sub_dataset = list(SubDataset.objects.filter(pk=dataset_id))[0]
    file = pd.read_csv(sub_dataset.url)
    keep_col = dataset_columns
    new_f = file[keep_col]
    new_f.to_csv(sub_dataset.url, index=False)
    sub_dataset.last_modified_date = timezone.now()
    sub_dataset.save()
    return JsonResponse({"id": dataset_id, "cols": str(dataset_columns)}, safe=False, content_type="application/json")
