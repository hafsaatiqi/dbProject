import { useLocation } from 'react-router-dom';

function CurrentRoute() {
  const location = useLocation();
  console.log(location.pathname);  // Logs the current route in the console
  return null;  // This component doesn't need to render anything
}

export default CurrentRoute;
