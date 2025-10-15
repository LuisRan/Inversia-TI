import LoginForm from "@/components/widgets/LoginForm"

export default function LoginPage() {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        height: "calc(100vh - 200px - 200px)", 
      }}
    >
      <LoginForm />
    </div>
  );
}
