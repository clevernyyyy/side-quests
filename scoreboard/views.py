from django.conf import settings
from django.shortcuts import redirect
from django.shortcuts import render
from django.contrib.admin.views.decorators import staff_member_required
from django.core.exceptions import ValidationError, ObjectDoesNotExist
from .tasks import sync_badge_scores
from .models import Badge

import base64
import json
import requests
from cryptography.fernet import Fernet


BADGE_LEADERBOARD_BASE_URL = settings.BADGE_LEADERBOARD_BASE_URL
TOKEN = settings.BADGE_LEADERBOARD_API_TOKEN
headers = {"X-API-Key": TOKEN}


# Create your views here.
def index(request):

    return render(request, "index.html")

def badge_sync(request):
    data ={}

    if 'id' in request.GET:
        #supplied badge param

        if request.user.is_authenticated:
            # user is authenticated

            if request.user.badge is None:
                # user doesn't have existing badge

                # decrypt machine_id
                key = b'zfxZarKwKMEjK3OLeMO6cOzaGkvZIoRdhHh78A7XYJw=' #this is our shared secret
                fernet = Fernet(key)
                # id='Z0FBQUFBQm4yWWtjZzZOMXFueEJmZHpsOW5jeUx3RmNIY1VMQ3h5azlWc19nejMwbktvUXZ4aTBPTklrQ0EwbldDd3I2VlpES04xc3lnY2tIcjZDdUY0ampsUENtT0ZDR281R1J5V1BQUWI1TVZkdi01YXlocmc9'
                id = request.GET['id']
                machine_id = fernet.decrypt(base64.b64decode(id)).decode()
                # print(machine_id)
                #should print e6635c08cb19a536


                # call leaderboard to get single badge
                params ={}
                params['machine_id'] = machine_id
                response = requests.post(f"{BADGE_LEADERBOARD_BASE_URL}/getSingleBadge", json=params, headers=headers)
                received_badge = response.json()


                try:
                    badge = Badge.objects.get(machine_id=received_badge['machine_id'])

                    # badge exists, update all attributes except machine id
                    for attr, value in received_badge.items():
                        if attr != 'machine_id':
                            setattr(badge, attr, value)
                    
                    badge.full_clean()
                    badge.save()

                    # set relationship to user
                    request.user.badge = badge
                    request.user.save()

                except TypeError as e:
                    raise ValueError(f"Incorrect data format: {e}")
                except ValidationError as e:
                    raise ValueError(f"Validation error: {e}")   
                except ObjectDoesNotExist:

                    try:
                        # badge doesn't exist, add new instance
                        model_instance = Badge(**received_badge)
                        model_instance.full_clean()
                        model_instance.save()

                        # set relationship to user
                        request.user.badge = model_instance
                        request.user.save()

                    except TypeError as e:
                        raise ValueError(f"Incorrect data format: {e}")
                    except ValidationError as e:
                        raise ValueError(f"Validation error: {e}")


                data["success"] = "Success: Badge tied to Side-Quests user."
                url = f'/#/?data={ encode_dict_to_base64(data) }'
                return redirect(url)


            else:
                # already has synced badge
                data['error'] = "Error: Your badge is already synced."

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