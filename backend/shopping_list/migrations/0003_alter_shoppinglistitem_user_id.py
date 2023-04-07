# Generated by Django 4.1.7 on 2023-03-08 04:31

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('shopping_list', '0002_remove_shoppinglistitem_userid_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shoppinglistitem',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]