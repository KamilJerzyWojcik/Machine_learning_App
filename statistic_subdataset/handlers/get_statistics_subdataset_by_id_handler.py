from django.http import JsonResponse
import json
from subdataset.models import SubDataset
import pandas as pd
from django.forms.models import model_to_dict


def handle(request):
    dataset_id = json.loads(request.body)
    sub_dataset = SubDataset.objects.filter(pk=dataset_id)
    dataframe = pd.read_csv(sub_dataset[0].url)
    data = dataframe.describe().to_dict()
    keys = dataframe.columns
    return JsonResponse({"data": data, "keys": list(keys)}, safe=False, content_type="application/json")
