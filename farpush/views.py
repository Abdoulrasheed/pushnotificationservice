from .models import Message
from .forms import MessageForm
from django.shortcuts import render
from django.contrib import messages
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

import onesignal as onesignal_sdk
from onesignalkeys import APP_AUTH_KEY, APP_ID

def send_message(title, message):
	# create a onesignal client
	onesignal_client = onesignal_sdk.Client(app_auth_key=APP_AUTH_KEY, app_id=APP_ID)

	# create a notification
	new_notification = onesignal_sdk.Notification(post_body={
		"headings": {"en": title},
	    "contents": {"en": message},
	    "included_segments": ["Subscribed Users"]
	})

	# send notification, it will return a response
	try:
		onesignal_response = onesignal_client.send_notification(new_notification)
		print(onesignal_response.status_code)
		print(onesignal_response.json())
	except:
		print("err")
		return False

@login_required
def home(request):
	temp = 'farpush/home.html'
	if request.method == 'POST':
		form = MessageForm(request.POST)
		if form.is_valid():
			title = form.cleaned_data.get('title')
			body = form.cleaned_data.get('body')
			form.save()
			status = send_message(title, body)

			if status:
				messages.success(request, 'Successfully send !')
			else:
				messages.success(request, 'No Internet connection')
			return redirect('home')
		else:
			form = MessageForm(request.POST)
			context = {'form': form}
			return render(request, temp, context)
	all_messages = Message.objects.all().order_by('-id')
	return render(request, temp, {'all_messages': all_messages})

def messages_api(request):
	return JsonResponse(list(Message.objects.values().order_by('-id')), safe=False)
