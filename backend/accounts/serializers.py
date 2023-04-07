from django.db.models import Avg
from rest_framework import serializers
from accounts.models import UserProfile
from recipe.models import Recipe, Favorite, Rating


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)
    avatar = serializers.ImageField(required=False)
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    username = serializers.CharField(required=False)

    class Meta:
        model = UserProfile
        fields = ('username', 'password', 'password2',
                  'email', 'first_name', 'last_name',
                  'avatar', 'phone_number')
        extra_kwargs = {
            'phone_number': {'required': False},
            'first_name': {'required': True},
            'last_name': {'required': True},
        }

    def validate(self, attrs):
        if attrs['email'] and UserProfile.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError({"email": "Email address already exists."})
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = UserProfile.objects.create(
            username=validated_data.get('email', ''),
            email=validated_data.get('email', ''),
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            avatar=validated_data.get('avatar', ''),
            phone_number=validated_data.get('phone_number', '')
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class UpdateUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=False, allow_blank=True)
    first_name = serializers.CharField(required=False, allow_blank=True)
    last_name = serializers.CharField(required=False, allow_blank=True)
    avatar = serializers.ImageField(required=False)
    phone_number = serializers.CharField(required=False, allow_blank=True)
    number_of_recipes_saved = serializers.SerializerMethodField('get_number_of_recipes_saved')
    average_rating = serializers.SerializerMethodField('get_average_rating')
    number_of_recipes_created = serializers.SerializerMethodField('get_number_of_recipes_created')

    @staticmethod
    def get_number_of_recipes_created(foo):
        return Recipe.objects.filter(user=foo.id).count()

    @staticmethod
    def get_number_of_recipes_saved(foo):
        return Favorite.objects.filter(user=foo.id).count()

    @staticmethod
    def get_average_rating(foo):
        rating = Rating.objects.filter(user=foo.id).aggregate(Avg('rating'))
        return rating['rating__avg'] if rating['rating__avg'] else 0

    class Meta:
        model = UserProfile
        fields = ("id", "username", 'first_name', 'last_name', 'email', 'avatar',
                  'phone_number', 'number_of_recipes_created', 'number_of_recipes_saved', 'average_rating')

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        instance.avatar = validated_data.get('avatar', instance.avatar)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)

        instance.save()

        return instance


class ChangePasswordSerializer(serializers.ModelSerializer):
    old_password = serializers.CharField(write_only=True, required=True)
    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = UserProfile
        fields = ('old_password', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"Password fields do not match."})

        return attrs

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError({"Old password is incorrect"})

        return value

    def update(self, instance, validated_data):
        instance.set_password(validated_data['password'])
        instance.save()

        return instance
