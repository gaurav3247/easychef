# Generated by Django 4.1.7 on 2023-04-15 02:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0019_remove_recipe_number_of_favorite_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='RecipeAttachment',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('last_updated', models.DateTimeField(auto_now=True)),
                ('attachment', models.FileField(upload_to='recipe/attachment')),
                ('recipe', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='attachments', to='recipe.recipe')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
