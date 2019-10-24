import json
from django.http import JsonResponse
from subdataset.models import SubDataset


def handle(request):
    dataset_request = json.loads(request.body)
    dataset_id = dataset_request["id"]
    new_label = dataset_request["name"]
    sub_dataset = SubDataset.objects.filter(pk=dataset_id)[0]
    if new_label is not None and new_label != '':
        sub_dataset.label = new_label
        sub_dataset.save()
    return JsonResponse({"data": "ok"}, safe=False, content_type="application/json")
