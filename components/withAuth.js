import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const WithAuthComponent = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      setIsAuthenticated(false);
      setShowAlert(true);

      // Show alert for a short period then redirect
      const timer = setTimeout(() => {
        router.push('/'); // Redirect to home page
      }, 1000); // 1 second delay

      // Cleanup timer on component unmount
      return () => clearTimeout(timer);
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (isAuthenticated === null) {
    return null; // Render nothing while checking authentication
  }

  if (!isAuthenticated) {
    return (
      <div>
        {showAlert && (
          <div className="alert alert-warning" role="alert">
            Please log in first
          </div>
        )}
      </div>
    );
  }

  return <>{children}</>;
};

// Set a display name for the WithAuthComponent
WithAuthComponent.displayName = 'WithAuthComponent';

// Create the HOC and set its display name
const withAuth = (WrappedComponent) => {
  const EnhancedComponent = (props) => (
    <WithAuthComponent>
      <WrappedComponent {...props} />
    </WithAuthComponent>
  );

  EnhancedComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return EnhancedComponent;
};

export default withAuth;
