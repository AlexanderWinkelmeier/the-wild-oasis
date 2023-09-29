function ProtectedRoute({ children }) {
  // 1. Load the authenticated user

  // 2. While loading, show a spinner

  // 3. If there is NO user, redirect to the Login-Page

  // 4. If there IS a user, render the app
  return children;
}

export default ProtectedRoute;
