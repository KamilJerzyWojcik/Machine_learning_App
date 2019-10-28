from .handlers import get_columns_with_missed_values_handler, \
                    delete_rows_with_missed_values_handler, \
                    fill_missed_data_by_median_handler, \
                    apply_imputer_to_fill_missed_values_handler, \
                    delete_one_column_by_name_handler
from django.views.decorators.csrf import csrf_exempt

# TODO zapis metod uzuepłnania
# TODO wyswietlenie kategorialnych kolumn
# TODO utworzenie goracych jedynek
# TODO skalowanie cech

# TODO lista danych do pipeline/potoku i zapis jako obiekt do zaaplikowania na innych datasetach


@csrf_exempt
def get_columns_with_missed_values(request):
    return get_columns_with_missed_values_handler.handle(request)


@csrf_exempt
def delete_rows_with_missed_values(request):
    return delete_rows_with_missed_values_handler.handle(request)


@csrf_exempt
def fill_missed_data_by_median(request):
    return fill_missed_data_by_median_handler.handle(request)


@csrf_exempt
def apply_imputer_to_fill_missed_values(request):
    return apply_imputer_to_fill_missed_values_handler.handle(request)

@csrf_exempt
def delete_one_column_by_name(request):
    return delete_one_column_by_name_handler.handle(request)
