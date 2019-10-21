from ..models import Dataset
from django.http import JsonResponse
import json
from django.forms.models import model_to_dict


def handle(request):
    try:
        dataset_id = json.loads(request.body)
        dataset = Dataset.objects.get(pk=dataset_id)
        response = model_to_dict(dataset)
    except:
        response = None

    return JsonResponse(response, safe=False, content_type="application/json")
