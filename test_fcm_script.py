import os
# pyrefly: ignore [missing-import]
import django
import sys

# Add waiverserver to sys.path so django can find the settings module
sys.path.append("/home/robin-john-varghese/Desktop/waiverserver")
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'waiver.settings')
django.setup()

from firebase_admin import messaging
from app.staff.tasks import get_firebase_app

def test():
    app = get_firebase_app("DRIVER")
    if not app:
        print("Driver app not initialized")
        return
    
    from fcm_django.models import FCMDevice
    devices = FCMDevice.objects.filter(active=True).exclude(registration_id__isnull=True).exclude(registration_id__startswith='dummy')
    
    print(f"Testing DRIVER APP with {devices.count()} devices")
    if devices.count() == 0:
        return
        
    messages = [
        messaging.Message(
            notification=messaging.Notification(
                title="Waiver",
                body="Testing DRIVER",
            ),
            token=device.registration_id,
        )
        for device in devices[:10]
    ]
    
    if messages:
        response = messaging.send_each(messages, app=app)
        print(f"DRIVER APP Success: {response.success_count}, Failure: {response.failure_count}")
        for idx, resp in enumerate(response.responses):
            if not resp.success:
                print(f"Error for device {idx}: {resp.exception}")

    print("\n----------------\n")
    
    app_client = get_firebase_app("CLIENT")
    if not app_client:
        print("Client app not initialized")
        return
        
    devices = FCMDevice.objects.filter(active=True).exclude(registration_id__isnull=True).exclude(registration_id__startswith='dummy')
    print(f"Testing CLIENT APP with {devices.count()} devices")
    if devices.count() == 0:
        return
        
    messages = [
        messaging.Message(
            notification=messaging.Notification(
                title="Waiver",
                body="Testing CLIENT",
            ),
            token=device.registration_id,
        )
        for device in devices[:10]
    ]
    
    if messages:
        response = messaging.send_each(messages, app=app_client)
        print(f"CLIENT APP Success: {response.success_count}, Failure: {response.failure_count}")
        for idx, resp in enumerate(response.responses):
            if not resp.success:
                print(f"Error for device {idx}: {resp.exception}")

if __name__ == '__main__':
    test()
