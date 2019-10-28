from ..models import SubDataset
from django.http import JsonResponse
import json
import csv


def handle(request):
    dataset_request = json.loads(request.body)
    dataset_id = dataset_request["id"]
    sub_dataset = SubDataset.objects.filter(pk=dataset_id)
    with open(sub_dataset[0].url) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        row_count = sum(1 for row in csv_reader)
    return JsonResponse({"row_count": row_count}, safe=False, content_type="application/json")
