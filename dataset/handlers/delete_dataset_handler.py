from ..models import Dataset
from django.http import JsonResponse
import json
import os


def handle(request):
    dataset_id = json.loads(request.body)
    dataset_to_delete = Dataset.objects.filter(pk=dataset_id)
    name_deleted = list(dataset_to_delete)[0].name
    path = list(dataset_to_delete)[0].url
    if os.path.isfile(path):
        os.remove(path)
    dataset_to_delete.delete()
    return JsonResponse({"deleted_dataset": f'{name_deleted}'})
