from ..models import Dataset
from django.http import JsonResponse
import json
from django.utils import timezone


def handle(request):
    dataset_edited = json.loads(request.body)
    dataset = list(Dataset.objects.filter(pk=dataset_edited["id"]))[0]
    dataset.name = dataset_edited["name"]
    dataset.last_modified_date = timezone.now()
    dataset.save()
    return JsonResponse({"edited_dataset_name": f'{dataset.name}'})
