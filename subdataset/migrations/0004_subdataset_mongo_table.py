# Generated by Django 2.2.1 on 2019-05-30 18:50

from django.db import migrations, models
from django.utils import timezone


class Migration(migrations.Migration):

    dependencies = [
        ('subdataset', '0003_remove_subdataset_size'),
    ]

    operations = [
        migrations.AddField(
            model_name='subdataset',
            name='mongo_table',
            field=models.DateField(default=timezone.now),
        ),
    ]