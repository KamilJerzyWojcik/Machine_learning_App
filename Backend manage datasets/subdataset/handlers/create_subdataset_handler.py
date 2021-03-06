from django.http import JsonResponse
import shutil
import json
from dataset.models import Dataset
from ..models import SubDataset
import time
import math
import pandas as pd


def handle(request):
    subdataset = json.loads(request.body)
    dataset = Dataset.objects.get(pk=subdataset['dataset_id'])
    oryginalDataset = pd.read_csv(dataset.url)
    subdataset_name = subdataset['dataset_name']
    subdataset_url = f"data/{math.ceil(time.time())}_{subdataset['dataset_id']}_sub_{dataset.name}"
    subdatasetObject = SubDataset(dataset_id=subdataset['dataset_id'],
                                  label=oryginalDataset.columns.values[0],
                                  name=subdataset_name,
                                  url=subdataset_url)
    shutil.copy2(dataset.url, subdataset_url)
    subdatasetObject.save()
    return JsonResponse({"new_subdataset_id": f"{subdataset['dataset_name']}"}, safe=False, content_type="application/json")
