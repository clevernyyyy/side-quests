from .models import Score

from djangochannelsrestframework.generics import GenericAsyncAPIConsumer
from djangochannelsrestframework.mixins import ListModelMixin
from djangochannelsrestframework.observer import model_observer
from djangochannelsrestframework import permissions

from channels.generic.websocket import WebsocketConsumer

from .serializers import ScoreSerializer
import json


class ScoreConsumer(ListModelMixin, GenericAsyncAPIConsumer):

    queryset = Score.objects.all()
    serializer_class = ScoreSerializer
    permissions_classes = (permissions.AllowAny)

    async def connect(self, **kwargs):
        await self.model_change.subscribe()
        await super().connect()
        # await self.send_json("{'status': 'test','message': 'success' }")

    @model_observer(Score)
    async def model_change(self, message, observer=None, **kwargs):
        await self.send_json(message)
    
    @model_change.serializer
    def model_serialize(self, instance, action, **kwargs):
        return dict(data=ScoreSerializer(instance=instance).data, action=action.value)