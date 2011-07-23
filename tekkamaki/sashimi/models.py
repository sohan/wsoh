from django.db import models
from django import forms
from django.forms import ModelForm

#storing session name in cookie for now, because don't have logins
#note: this way of storing sessions is completely unsafe, as anyone can then update a session if they know the name
class Session(models.Model):
  name = models.CharField(max_length=200, unique=True, db_index=True)

  def __unicode__(self):
    return self.name

# Create your models here.
class Click(models.Model):
  session = models.ForeignKey(Session)
  x = models.IntegerField()
  y = models.IntegerField()

  def __unicode__(self):
    return '%s: (%d, %d)' % (self.session.name, self.x, self.y)

class CreateSessionForm(ModelForm):
  class Meta:
    model = Session

class UrlCaptureForm(forms.Form):
  url = forms.CharField(max_length=400)

