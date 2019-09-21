from django.db import models

# Create your models here.

class Message(models.Model):
	title = models.CharField(max_length=30)
	body = models.TextField()
	timestamp = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.title