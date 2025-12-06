import ChangePasswordForm from "../../components/ChangePasswordForm";

export default function ChangePasswordPage() {
    // In a real app, get token from context or cookies
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Change Password</h1>
            <ChangePasswordForm token={token} />
        </div>
    );
}