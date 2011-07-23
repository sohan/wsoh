#!/usr/bin/python
import urllib2
import simplejson

REDDIT_URL = 'http://www.reddit.com/'

def get_posts(subreddit = None):
  return get_posts_from_json(get_reddit_frontpage_json(subreddit))

def get_reddit_frontpage_json(subreddit):
  return simplejson.loads(get_page(get_json_url(REDDIT_URL, subreddit)))

def get_page(url):
  page = urllib2.urlopen(url)
  return page.read()

def get_json_url(url, subreddit):
  return '%s/r/%s%s' % (url, subreddit, '.json')

def get_posts_from_json(reddit_json):
  posts = map(lambda x: x.get('data'),
    reddit_json.get('data').get('children'))
  return posts 
