from ..models import Dataset
from django.http import JsonResponse


def handle():
    print("debugger")
    dataset_list = Dataset.objects.all().values()
    return JsonResponse(list(dataset_list), safe=False, content_type="application/json")
