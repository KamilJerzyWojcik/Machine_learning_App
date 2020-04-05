# Generated by Django 2.2.1 on 2019-05-30 20:15

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('subdataset', '0006_auto_20190530_1950'),
    ]

    operations = [
        migrations.CreateModel(
            name='ColumnDataset',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('create_date', models.DateField(default=django.utils.timezone.now)),
                ('subdataset', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='subdataset.SubDataset')),
            ],
        ),
        migrations.CreateModel(
            name='Operations',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('create_date', models.DateField(default=django.utils.timezone.now)),
                ('columnDataset', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='subdataset.ColumnDataset')),
            ],
        ),
    ]