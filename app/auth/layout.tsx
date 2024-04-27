const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center bg-custom-gradient-blue">{children}</div>
  );
};

export default AuthLayout;
