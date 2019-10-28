from .handlers import file_upload_handler, \
                      get_list_dataset_handler, \
                      delete_dataset_handler, \
                      edit_dataset_handler, \
                      get_names_datasets_handler, \
                      get_dataset_by_id_handler
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def delete_dataset(request):
    return delete_dataset_handler.handle(request)


@csrf_exempt
def edit_dataset(request):
    return edit_dataset_handler.handle(request)


@csrf_exempt
def upload_data(request):
    return file_upload_handler.handle(request)


@csrf_exempt
def get_dataset_by_id(request):
    return get_dataset_by_id_handler.handle(request)


@csrf_exempt
def get_list_dataset(request):
    return get_list_dataset_handler.handle()


@csrf_exempt
def get_names_dataset(request):
    return get_names_datasets_handler.handle()
