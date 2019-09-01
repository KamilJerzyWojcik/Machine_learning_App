import pymongo
import pandas as pd

mongo_client = pymongo.MongoClient("mongodb://localhost:27017/")
mongo_database = mongo_client["LM_App_Db"]


def __create_collection(collection_name):
    '''
    :param collection_name: name of new table
    :return: new collection reference, if collection exist raise exception
    '''
    collections = mongo_database.list_collection_names()
    if collection_name not in collections:
        new_collection = mongo_database[collection_name]
    else:
        raise ValueError('Collection exist.')
    return new_collection


def add_dataframe_to_collection(dataframe, collection_name):
    '''
    :param dataframe: dataframe to save in database
    :param collection_name: name of new collection for dataframe
    :return:
    '''
    new_collection = __create_collection(collection_name)
    column_Names = list(dataframe.columns)
    rows, columns = dataframe.shape
    dictionary_dataframe = dataframe.to_dict()
    for row in range(rows):
        for c in range(len(column_Names)):
            new_collection.insert_one({
                column_Names[0]: dictionary_dataframe[column_Names[0]][row]
            })


def delete_collection(collection_name):
    '''
        :param collection_name: name collection to delete
        :return: raise exception if collection not exist
    '''
    collections = mongo_database.list_collection_names()
    if collection_name in collections:
        collection = mongo_database[collection_name]
        collection.drop()
    else:
        raise ValueError('Collection exist.')


def __is_in_collections(collection_name):
    collections = mongo_database.list_collection_names()
    if collection_name in collections:
        return True
    else:
        raise ValueError('Collection exist.')


def __init_dict_dataframe(columns):
    dict = {}
    for column in columns:
        dict[column] = []
    return dict


def __create_dict_for_dataframe(init_dict, columns, documents):
    for document in documents:
        for column in columns:
            init_dict[column].append(document[column])
    return init_dict


def get_all_dataframe_by_collection_name(collection_name, columns):
    __is_in_collections(collection_name)
    collection = mongo_database[collection_name]
    documents = collection.find()
    init_dict = __init_dict_dataframe(columns)
    dict_for_dataframe = __create_dict_for_dataframe(init_dict, columns, documents)
    return pd.DataFrame(dict_for_dataframe, columns=columns)


def __is_correct_range(from_row, limit_row):
    if from_row == 0 or limit_row == 0:
        raise ValueError('rows can not be 0')
    if from_row < 1 or limit_row < 1:
        raise ValueError('from_row and limit_row can not be lower than 1')



def get_range_dataframe_by_collection_name(collection_name, columns, from_row, limit_row):
    __is_in_collections(collection_name)
    __is_correct_range(from_row, limit_row)
    collection = mongo_database[collection_name]
    documents = collection.find().skip(from_row).limit(limit_row)
    init_dict = __init_dict_dataframe(columns)
    dict_for_dataframe = __create_dict_for_dataframe(init_dict, columns, documents)
    return pd.DataFrame(dict_for_dataframe, columns=columns)
