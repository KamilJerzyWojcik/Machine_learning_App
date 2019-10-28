from ..models import Dataset
from django.http import JsonResponse


def handle():
    dataset_names = Dataset.objects.values("id", "name")
    return JsonResponse(list(dataset_names), safe=False, content_type="application/json")
