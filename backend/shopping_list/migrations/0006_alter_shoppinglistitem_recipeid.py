# Generated by Django 4.1.7 on 2023-03-09 22:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0012_rating'),
        ('shopping_list', '0005_alter_shoppinglistitem_recipeid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shoppinglistitem',
            name='recipeID',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='recipe.recipe'),
        ),
    ]