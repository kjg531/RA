from channels import Group


# Connected to websocket.connect
def ws_connect(message):
    Group('deckfeed').add(message.reply_channel)


# Connected to websocket.receive
# def ws_message(message):
#     Group("chat").send({
#         "text": "[user] %s" % message.content['text'],
#     })


# Connected to websocket.disconnect
def ws_disconnect(message):
    Group('deckfeed').discard(message.reply_channel)
