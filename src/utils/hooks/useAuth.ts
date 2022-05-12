import React from 'react'

import authContext from '@app/contexts/authContext'

const useAuth = () => {
  return React.useContext(authContext)
}

export default useAuth
