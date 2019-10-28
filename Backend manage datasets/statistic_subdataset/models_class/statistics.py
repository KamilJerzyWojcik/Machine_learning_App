
class Statistics:
    def __init__(self, name, items=None):
        self.name = name
        if items is None:
            self.items = []
        else:
            self.items = items
