let Email = function () {
  let _to = ''
  let _toName = ''
  let _from = ''
  let _fromName = ''
  let _subject = ''
  let _message = ''
  let _sendOn = null

  this.getTo = () => _to
  this.setTo = (to) => _to = to

  this.getToName = () => _toName
  this.setToName = (toName) => _toName = toName

  this.getFrom = () => _from
  this.setFrom = (from) => _from = from

  this.getFromName = () => _fromName
  this.setFromName = (fromName) => _fromName = fromName

  this.getSubject = () => _subject
  this.setSubject = (subject) => _subject = subjet

  this.getMessage = () => _message
  this.setMessage = (mes) => _message = mes

  this.getSendOn = () => _sendOn
  this.setSendOn = (datetime) => _sendOn = datetime
}

module.exports = Email