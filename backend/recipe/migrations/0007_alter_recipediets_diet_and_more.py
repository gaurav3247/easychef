# Generated by Django 4.1.7 on 2023-03-08 22:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0006_ingredient_rename_diet_recipe_diets_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipediets',
            name='diet',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='recipe.diet'),
        ),
        migrations.AlterField(
            model_name='recipeingredient',
            name='ingredient',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='recipe.ingredient'),
        ),
    ]
