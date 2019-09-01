
class SubdatasetRouter:
    """
    A router to control all database operations on models in the
    subdataset application.
    """
    def db_for_read(self, model, **hints):
        """
        Attempts to read subdataset models go to db.subdata.
        """
        if model._meta.app_label == 'subdata':
            return 'subdata_db'
        return None

    def db_for_write(self, model, **hints):
        """
        Attempts to write subdataset models go to db.subdata.
        """
        if model._meta.app_label == 'subdata':
            return 'subdata_db'
        return None

    def allow_relation(self, obj1, obj2, **hints):
        """
        Allow relations if a model in the subdata app is involved.
        """
        if obj1._meta.app_label == 'subdata' or \
           obj2._meta.app_label == 'subdata':
           return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """
        Make sure the subdataset app only appears in the 'db.subdata'
        database.
        """
        if app_label == 'subdata':
            return db == 'subdata_db'
        return None