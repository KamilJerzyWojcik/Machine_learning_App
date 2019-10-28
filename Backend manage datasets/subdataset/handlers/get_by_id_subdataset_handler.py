from ..models import SubDataset
from django.http import JsonResponse
import json
import csv


def handle(request):
    dataset_request = json.loads(request.body)
    dataset_id = dataset_request["id"]
    page = 1 if dataset_request["page"] == 0 else dataset_request["page"]
    page_size = dataset_request["page_size"]
    from_index = page_size * (page - 1)
    to_index = page_size * page - 1
    sub_dataset = SubDataset.objects.filter(pk=dataset_id)
    sub_data = []
    with open(sub_dataset[0].url) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        for idx, row in enumerate(csv_reader):
            if idx == 0 or from_index < idx < to_index:
                sub_data.append(row)
    return JsonResponse(sub_data, safe=False, content_type="application/json")
