from ..models import SubDataset
from django.http import JsonResponse
import json
import pandas as pd
from ..services.data_modification_service import add_new_column


def handle(request):
    dataset_request = json.loads(request.body)
    dataset_id = dataset_request["id"]
    columns = dataset_request["columns"]
    operation = dataset_request["operation"]
    parameter = dataset_request["parameter"]
    sub_dataset = SubDataset.objects.filter(pk=dataset_id)
    data = pd.read_csv(sub_dataset[0].url)
    data, name, errors = add_new_column(data, operation, columns, parameter)
    if name != '':
        data.to_csv(sub_dataset[0].url, index=False)

    result = {
        "new_column_names": name,
        "columns": columns,
        "apply_operation": operation,
        "errors": errors
    }
    return JsonResponse(result, safe=False, content_type="application/json")


