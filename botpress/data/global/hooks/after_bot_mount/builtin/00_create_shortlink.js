const chatOptions = {
  hideWidget: true,
  config: {
    enableReset: false,
    enableTranscriptDownload: false
  }
}

const params = {
  m: 'channel-web',
  v: 'Fullscreen',
  options: JSON.stringify(chatOptions)
}

setTimeout(() => {
  try {
    bp.http.deleteShortLink(botId)
  } catch (e) {}

  // Bot will be available at $EXTERNAL_URL/s/$BOT_NAME
  bp.http.createShortLink(botId, `${process.EXTERNAL_URL}/lite/${botId}/`, params)
}, 500)