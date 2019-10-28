from .handlers import get_list_subdataset_handler,\
                      create_subdataset_handler,\
                      delete_subdataset_handler, \
                      get_by_id_subdataset_handler, \
                      get_max_pages_by_id_handler, \
                      delete_columns_handler, \
                      create_column_handler
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def get_list_subdataset(request):
    return get_list_subdataset_handler.handle(request)


@csrf_exempt
def create_subdataset(request):
    return create_subdataset_handler.handle(request)


@csrf_exempt
def delete_subdataset(request):
    return delete_subdataset_handler.handle(request)

@csrf_exempt
def get_by_id_subdataset(request):
    return get_by_id_subdataset_handler.handle(request)


@csrf_exempt
def get_max_pages_by_id(request):
    return get_max_pages_by_id_handler.handle(request)


@csrf_exempt
def delete_columns(request):
    return delete_columns_handler.handle(request)


@csrf_exempt
def create_column(request):
    return create_column_handler.handle(request)
