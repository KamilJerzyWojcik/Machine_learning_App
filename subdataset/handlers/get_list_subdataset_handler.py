from ..models import SubDataset
from django.http import JsonResponse
import json


def handle(request):
    dataset_id = json.loads(request.body)
    sub_datasets = SubDataset.objects.all().filter(dataset_id=dataset_id).values()
    return JsonResponse(list(sub_datasets), safe=False, content_type="application/json")
