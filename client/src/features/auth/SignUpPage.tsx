import { SignUp } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import './auth.scss';

const SignUpPage = () => {
  return (
    <div className="auth-container">
      <SignUp 
        appearance={{ baseTheme: dark }} 
        routing="path" 
        path="/sign-up" 
        signInUrl="/sign-in"
        forceRedirectUrl="/"
      />
    </div>
  );
}

export default SignUpPage;
