
from django.http import JsonResponse
import json
import pandas as pd
from django.utils import timezone
from subdataset.models import SubDataset


def handle(request):
    dataset_request = json.loads(request.body)
    dataset_id = dataset_request["id"]
    dataset_column = dataset_request["column"]
    sub_dataset = list(SubDataset.objects.filter(pk=dataset_id))[0]
    file = pd.read_csv(sub_dataset.url)
    columns = list(file.columns)
    columns.remove(dataset_column)
    new_f = file[columns]
    new_f.to_csv(sub_dataset.url, index=False)
    sub_dataset.last_modified_date = timezone.now()
    sub_dataset.save()
    return JsonResponse({"id": dataset_id, "col": dataset_column}, safe=False, content_type="application/json")
