from django.views.decorators.csrf import csrf_exempt
from .handlers import get_description_subdataset_by_id_handler, set_label_subdataset_handler, get_info_subdataset_by_id_handler
from django.shortcuts import render
import json


@csrf_exempt
def get_description_subdataset_by_id(request):
    return get_description_subdataset_by_id_handler.handle(request)


@csrf_exempt
def set_label_subdataset(request):
    return set_label_subdataset_handler.handle(request)

@csrf_exempt
def get_info_subdataset_by_id(request):
    return get_info_subdataset_by_id_handler.handle(request)


def index(request, name):
    return render(request, f'reports/{name}')
