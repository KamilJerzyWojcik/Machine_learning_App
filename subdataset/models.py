from django.db import models
from django.utils import timezone
from dataset.models import Dataset


class SubDataset(models.Model):
    name = models.CharField(max_length=255)
    url = models.CharField(max_length=255)
    create_date = models.DateField(default=timezone.now)
    last_modified_date = models.DateField(default=timezone.now)
    mongo_collection_name = models.CharField(max_length=255)
    dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE, null=True)


class ColumnDataset(models.Model):
    name = models.CharField(max_length=255)
    create_date = models.DateField(default=timezone.now)
    subdataset = models.ForeignKey(SubDataset, on_delete=models.CASCADE, null=True)


class Operations(models.Model):
    name = models.CharField(max_length=255)
    columnDataset = models.ForeignKey(ColumnDataset, on_delete=models.CASCADE, null=True)
    create_date = models.DateField(default=timezone.now)

