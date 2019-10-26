from django.http import JsonResponse
import json
from subdataset.models import SubDataset
import pandas as pd
import pandas_profiling
import time
import os


def handle(request):
    dataset_id = json.loads(request.body)
    sub_dataset = list(SubDataset.objects.filter(pk=dataset_id))[0]
    last_report = sub_dataset.raport_url

    dataframe = pd.read_csv(sub_dataset.url)
    raport_name = f'report_{sub_dataset.id}_{time.time()}.html'
    sub_dataset.raport_url = raport_name

    try:
        pandas_profiling.ProfileReport(dataframe).to_file(output_file=f"./templates/reports/{raport_name}")
        sub_dataset.save()
    except:
        return JsonResponse({"error": "500"}, safe=False, content_type="application/json")

    if last_report is not "":
        os.remove(f"./templates/reports/{last_report}")
    return JsonResponse({"urlReport": raport_name}, safe=False, content_type="application/json")
