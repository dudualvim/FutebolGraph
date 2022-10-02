from django.db import models

# Create your models here.

class Jogadores(models.Model):
    JogadorId = models.AutoField(primary_key=True, null=False)
    JogadorNome = models.CharField(max_length=100, null=False)
    JogadorForca = models.IntegerField(null=False)
    JogadorX = models.IntegerField(null=False)
    JogadorY = models.IntegerField(null=False)



