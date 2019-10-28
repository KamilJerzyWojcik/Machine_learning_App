from django.core.files.storage import FileSystemStorage
import time
import math
from django.http import JsonResponse
from ..models import Dataset


def handle(request):
    if request.method == 'POST' and request.FILES['file']:
        upload_file = request.FILES['file']
        new_dataset = Dataset(name=upload_file.name.split('.')[0], url="None", size=upload_file.size)
        new_dataset.save()
        file_system_storage = FileSystemStorage()
        filename = file_system_storage.save(f"data/{math.ceil(time.time())}_{new_dataset.id}_or_{upload_file.name}", upload_file)
        uploaded_file_url = file_system_storage.url(filename)
        new_dataset.url = uploaded_file_url
        new_dataset.save()
        return JsonResponse({'file_name': upload_file.name})
    return JsonResponse({'uploaded_file_url': 'none'})
