import { SignIn } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import './auth.scss';

const SignInPage = () => {
  return (
    <div className="auth-container">
      <SignIn 
        appearance={{ baseTheme: dark }} 
        routing="path" 
        path="/sign-in" 
        signUpUrl="/sign-up"
        forceRedirectUrl="/"
      />
    </div>
  );
}

export default SignInPage;
