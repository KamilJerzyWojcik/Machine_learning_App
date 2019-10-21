from django.db import models
from django.utils import timezone
from dataset.models import Dataset


class SubDataset(models.Model):
    name = models.CharField(max_length=255)
    url = models.CharField(max_length=255)
    create_date = models.DateField(default=timezone.now)
    last_modified_date = models.DateField(default=timezone.now)
    label = models.CharField(max_length=255, default="")
    dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE, null=True)
