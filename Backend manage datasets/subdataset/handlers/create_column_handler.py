from ..models import SubDataset
from django.http import JsonResponse
import json
import pandas as pd
from ..services.data_modification_service import add_new_column
from django.utils import timezone


def handle(request):
    dataset_request = json.loads(request.body)
    dataset_id = dataset_request["id"]
    columns = dataset_request["columns"]
    operation = dataset_request["operation"]
    parameter = dataset_request["parameter"]
    sub_dataset = list(SubDataset.objects.filter(pk=dataset_id))[0]
    data = pd.read_csv(sub_dataset.url)
    data, name, errors = add_new_column(data, operation, columns, parameter)
    if name != '':
        data.to_csv(sub_dataset.url, index=False)
        sub_dataset.last_modified_date = timezone.now()
        sub_dataset.save()

    result = {
        "new_column_names": name,
        "columns": columns,
        "apply_operation": operation,
        "errors": errors
    }
    return JsonResponse(result, safe=False, content_type="application/json")


