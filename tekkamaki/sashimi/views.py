from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render_to_response, get_object_or_404
from django.template import RequestContext
from django.utils import simplejson
from sashimi.models import Click, CreateSessionForm, Session
from util import reddit
import simplejson
import uuid

def index(request, room='all', subreddit = None):
  reddit_posts = reddit.get_posts(subreddit)
  if not request.session.get('session_name'):
    request.session['session_name'] = str(uuid.uuid1())
  return render_to_response('index.html', 
    {
      'reddit_posts': simplejson.dumps(reddit_posts),
      'session_name': request.session['session_name'],
      'room': room,
    }, 
    context_instance=RequestContext(request))

