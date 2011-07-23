from django.conf.urls.defaults import *

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('sashimi.views',
    # Example:
    # (r'^tekkamaki/', include('tekkamaki.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # (r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # (r'^admin/', include(admin.site.urls)),
    (r'^$', 'index'), 
    (r'^(?P<room>\w+)$', 'index'),
    (r'^(?P<subreddit>\w+)/(?P<room>\w+)$', 'index'),
)
