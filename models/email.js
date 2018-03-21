let Email = function () {
    let _to = ''
    let _from = ''
    let _fromName = ''
    let _subjet = ''
    let _message = ''

    this.getTo = () => _to
    this.setTo = (to) => _to = to

    this.getFrom = () => _from
    this.setFrom = (from) => _from= from

    this.getFromName = () => _fromName
    this.setFromName = (to) => _fromName = fromName

    this.getSubject = () => _subjet
    this.setSubject = (to) => _subjet = subjet

    this.getMessage = () => _message
    this.setMessage = (to) => _message = messages
}

module.exports = Email