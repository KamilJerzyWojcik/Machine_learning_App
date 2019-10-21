from ..models import SubDataset
from django.http import JsonResponse
import json


def handle(request):
    try:
        dataset_id = json.loads(request.body)
        sub_datasets = SubDataset.objects.all().filter(dataset_id=dataset_id).values()
        response = list(sub_datasets)
    except:
        response = None
    return JsonResponse(response, safe=False, content_type="application/json")
