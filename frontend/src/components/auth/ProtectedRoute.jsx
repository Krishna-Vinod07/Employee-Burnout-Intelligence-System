import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({
  children,
  allowedRole,
}) => {

  const user = JSON.parse(
    localStorage.getItem('user')
  )

  // NOT LOGGED IN
  if (!user) {

    return <Navigate to="/login" />

  }

  // WRONG ROLE
  if (
    allowedRole &&
    user.role !== allowedRole
  ) {

    return <Navigate to="/" />

  }

  return children
}

export default ProtectedRoute