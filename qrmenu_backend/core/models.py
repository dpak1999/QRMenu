from django.db import models
from django.contrib.auth.models import User


class Place(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    image = models.CharField(max_length=255)
    number_of_tables = models.IntegerField(default=1)

    def __str__(self) -> str:
        return "{}/{}".format(self.owner.username, self.name)
