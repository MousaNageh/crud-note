from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from note.models import Note 

@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    ordering = ['-created_at']
    search_fields = ['title','user__email']
    list_display = ['title','user','created_at']
    list_select_related = ['user']
    list_filter = ['user__email']
    readonly_fields = ['created_at']
    date_hierarchy = 'created_at'
    list_per_page=50 
    fieldsets = (
        (_('Owner'), {'fields': ('user',)}),
        ((_('Note')),{'fields': ('title', 'description')}),
    )
    