from ..models import SubDataset
from django.http import JsonResponse
import json
import pandas as pd
from ..services.data_modification_service import add_new_column
import pymongo

def handle(request):
    dataset_request = json.loads(request.body)
    dataset_id = dataset_request["id"]

    sub_dataset = SubDataset.objects.filter(pk=dataset_id)
    data = pd.read_csv(sub_dataset[0].url)

    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    mongoDb = myclient["mydatabase"]
    mycol = mongoDb["longitude"]
    mycol2 = mongoDb["housing-super2.longitude"]

    mycol.drop()
    mycol2.drop()

    # colNames = list(data.columns)
    # tableName = sub_dataset[0].name.replace(".", "")
    # newTable = mongoDb[tableName]
    # row_number, colum_number = data.shape
    # data = data.to_dict()
    # print(colNames[0])
    # print(data["longitude"][0])
    # print(row_number)
    # newcol = newTable[colNames[0]]
    # collection = []
    #
    # for row in range(10):
    #     newcol.insert_one({colNames[0]: data[colNames[0]][row]})
    # print(collection)


    # newcol.insert_many(collection)


    # my_object.save(using='legacy_users')


    # mycol = mydb["customers"]
    # mydict = {"name": "John", "address": "Highway 37"}
    # x = mycol.insert_one(mydict)
    # mylist = [
    #     {"name": "Amy", "address": "Apple st 652"},
    #     {"name": "Hannah", "address": "Mountain 21"},
    #     {"name": "Michael", "address": "Valley 345"},
    #     {"name": "Sandy", "address": "Ocean blvd 2"},
    #     {"name": "Betty", "address": "Green Grass 1"},
    #     {"name": "Richard", "address": "Sky st 331"},
    #     {"name": "Susan", "address": "One way 98"},
    #     {"name": "Vicky", "address": "Yellow Garden 2"},
    #     {"name": "Ben", "address": "Park Lane 38"},
    #     {"name": "William", "address": "Central st 954"},
    #     {"name": "Chuck", "address": "Main Road 989"},
    #     {"name": "Viola", "address": "Sideway 1633"}
    # ]
    #
    # x2 = mycol.insert_many(mylist)


    result = {
        "new_tables_names": "ok"
    }
    return JsonResponse(result, safe=False, content_type="application/json")


