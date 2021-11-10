from django.contrib import admin
from .models import Message


admin.site.register(Message)

admin.site.site_header = "Information Tech. Push Notification Service"
admin.site.site_title = "Information Tech. Push Notification System"

