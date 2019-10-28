from django.db import models
from django.utils import timezone


class Dataset(models.Model):
    name = models.CharField(max_length=255)
    url = models.CharField(max_length=255)
    upload_date = models.DateField(default=timezone.now)
    last_modified_date = models.DateField(default=timezone.now)
    size = models.FloatField(default=0)

