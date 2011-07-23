from django.conf.urls.defaults import *
from django.conf import settings

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Example:
    # (r'^tekkamaki/', include('tekkamaki.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # (r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # (r'^admin/', include(admin.site.urls)),
    (r'', include('sashimi.urls')),
)

if settings.DEBUG:
  urlpatterns += patterns('django.views.static',
    (r'^%s(?P<path>.*)' % settings.STATIC_URL,
    'serve', {
              'document_root': settings.STATIC_ROOT,
              'show_indexes': False
             }
    ),
    (r'^%s(?P<path>.*)' % settings.MEDIA_URL, 'serve',
         {'document_root': settings.MEDIA_ROOT}),
    )
