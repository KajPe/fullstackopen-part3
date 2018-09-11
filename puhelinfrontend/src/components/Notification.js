import React from 'react'

const Notification = ({ errormessage, infomessage, clearNotification }) => {
  if (errormessage !== null) {
    setTimeout(() => {
      clearNotification()
    }, 3000)
    return (
      <div className="error">
        {errormessage}
      </div>
    )
  } else if (infomessage !== null) {
    setTimeout(() => {
      clearNotification()
    }, 2000)
    return (
      <div className="info">
        {infomessage}
      </div>
    )
  } else {
    return null
  }
}

export default Notification