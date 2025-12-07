import ProfilePageClient from "./ProfilePageClient";

export default function ProfilePage({ searchParams }: { searchParams: { success?: string } }) {
    const successFlag = searchParams.success;

    return <ProfilePageClient successFlag={successFlag} />;
}