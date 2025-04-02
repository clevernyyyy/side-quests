from django.shortcuts import redirect
from django.shortcuts import render
from django.contrib.admin.views.decorators import staff_member_required

import base64
import json


# Create your views here.
def index(request):

    return render(request, "index.html")

def badge_sync(request):
    data ={}

    if 'id' in request.GET:
        #supplied badge param

        if request.user.is_authenticated:
            # Do something for authenticated users.
            data['user'] = "steve"

            # This is where we tie a user to a badge


            data["success"] = "Success: Badge tied to Side-Quests user."
            url = f'/#/?data={ encode_dict_to_base64(data) }'
            return redirect(url)

        else:
            # redirect to login because user is not logged in
            data['error'] = "Error: You must be logged in."
            # return redirect('/#/login')

    else:
        #didn't supply badge param
        data['error'] = "Error: Please visit the Badge village to scan QR code."

    url = f'/#/sync?data={ encode_dict_to_base64(data) }'
    return redirect(url)

def encode_dict_to_base64(data):
    """Encodes a dictionary to a base64 string."""
    json_string = json.dumps(data)
    json_bytes = json_string.encode('utf-8')
    base64_bytes = base64.b64encode(json_bytes)
    base64_string = base64_bytes.decode('utf-8')
    return base64_string