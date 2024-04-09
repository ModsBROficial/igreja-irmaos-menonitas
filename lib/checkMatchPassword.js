export default function checkMatchPassword(newPassword, confirmNewPassword, setMatchPassword ) {
    if (newPassword.length && confirmNewPassword.length) {
      if (newPassword !== confirmNewPassword) {
        setMatchPassword(true)
      } else {
        setMatchPassword(false)
      }
    } else {
        setMatchPassword(false)
    }
}