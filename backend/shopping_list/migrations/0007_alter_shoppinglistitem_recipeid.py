# Generated by Django 4.1.7 on 2023-03-10 04:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0013_comment_favorite_commentattachment'),
        ('shopping_list', '0006_alter_shoppinglistitem_recipeid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shoppinglistitem',
            name='recipeID',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='recipe.recipe'),
        ),
    ]
