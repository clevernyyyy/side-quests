from django.contrib import admin
from .models import Score, Badge, CustomUser

class BadgeAdmin(admin.ModelAdmin):
    list_display = ["machine_id", "initials", "added", "updated"]


admin.site.register(CustomUser)
admin.site.register(Score)
admin.site.register(Badge, BadgeAdmin)