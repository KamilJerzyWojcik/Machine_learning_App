from django.http import JsonResponse
import json
import sklearn.impute as impute
import pandas as pd
from subdataset.models import SubDataset


def handle(request):
    dataset_id = json.loads(request.body)
    imputer = impute.SimpleImputer(strategy="median")
    sub_dataset = list(SubDataset.objects.filter(pk=dataset_id))[0]
    dataframe_all = pd.read_csv(sub_dataset.url)
    print(dataframe_all.head())
    dataframe_no_label = dataframe_all.drop([sub_dataset.label])
    dataframe_numeric = dataframe_no_label.select_dtypes(include=['float64'])
    dataframe_cat = dataframe_no_label.select_dtypes(exclude=['float64'])
    imputer.fit(dataframe_numeric)
    X = imputer.transform(dataframe_numeric)
    dataframe_numeric_tr = pd.DataFrame(X, columns=dataframe_numeric.columns)
    dataset_result = pd.concat([dataframe_numeric_tr, dataframe_cat], axis=1, sort=False)
    dataset_result.to_csv(sub_dataset.url, index=False)
    return JsonResponse({"data": dataset_id}, safe=False, content_type="application/json")
