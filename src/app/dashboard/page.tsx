"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../supabase/client";
import { useRouter } from "next/navigation";
import ProfileAvatar from "../../components/ProfileAvatar";
import { useWallet } from "../../../contexts/WalletContext"; 
import { walletConnectWallet } from "../../../services/wallets/walletconnect/walletConnectClient";
import { User } from "@supabase/supabase-js";

type UserProfile = {
  id: string;
  email: string;
  full_name: string;
  username: string;
  bio: string;
  avatar_url: string;
  hedera_wallet: string;
  carbon_points: number;
  staked_nfts: string[];
};

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const router = useRouter();
  const { accountId, setAccountId, connectMetamask, connectWalletConnect } = useWallet();

  // ✅ FIX: Added `user` to dependency array
  useEffect(() => {
    const fetchUserSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("❌ Error fetching user:", error);
        return;
      }

      if (!data.session) {
        console.warn("⚠️ No active session found. Skipping profile fetch.");
        return;
      }

      if (data.session.user.id !== user?.id) {
        console.warn("⚠️ New user detected. Clearing previous wallet connection.");
        localStorage.removeItem("hedera-wallet");
        setAccountId(null);

        try {
          await walletConnectWallet.disconnect();
        } catch (err) {
          console.error("❌ Error disconnecting WalletConnect:", err);
        }
      }

      if (!user || data.session.user.id !== user.id) {
        console.log("✅ User session found:", data.session);
        setUser(data.session.user);
        fetchProfile(data.session.user.id);
      }
    };

    fetchUserSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        console.warn("⚠️ User logged out. Redirecting...");
        setUser(null);
        setAccountId(null);
        router.push("/join-the-movement");
      } else {
        setUser(session.user);
        fetchProfile(session.user.id);
      }
    });

    return () => {
      authListener?.subscription.unsubscribe(); 
    };
  }, [user, setAccountId, router]); // ✅ FIX: `user` added to dependency array

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, email, full_name, username, bio, avatar_url, hedera_wallet, carbon_points, staked_nfts")
        .eq("id", userId)
        .single();

      if (error) throw error;
      if (!data) throw new Error("No profile found for user");

      console.log("✅ Fetched profile data:", data);
      setProfile(data);
    } catch (error) {
      console.error("❌ Error fetching profile:", error);
    }
  };



  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-[#6C4C94] text-white py-6 text-center shadow-md">
        <h1 className="text-4xl font-bold">User Dashboard</h1>
      </header>

      <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6 text-center w-full max-w-md">
          <h2 className="text-2xl font-bold text-[#4FC3A1]">Profile</h2>
          <ProfileAvatar avatarPath={profile?.avatar_url || ""} />
          <p className="mt-2 text-lg font-semibold">{profile?.full_name || "User"}</p>
          <p className="text-gray-600">{profile?.bio || "No bio added yet"}</p>
          <p className="text-sm text-gray-500 mt-2">Email: {user?.email}</p>
        </div>

        {/* Wallet Section */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-[#4FC3A1]">Hedera Wallet</h2>
          <p className="mt-2 text-lg">{accountId ? `Connected: ${accountId}` : "No wallet connected"}</p>

          {!accountId && (
            <div className="mt-4 flex flex-col gap-2">
              <button 
                onClick={connectMetamask} 
                className="px-4 py-2 bg-[#f6851b] text-white rounded-lg hover:bg-[#c75b0e] transition"
              >
                Connect Metamask
              </button>

              <button 
                onClick={connectWalletConnect} 
                className="px-4 py-2 bg-[#0a74da] text-white rounded-lg hover:bg-[#085aa3] transition"
              >
                Connect WalletConnect
              </button>
            </div>
          )}

          {accountId && (
            <p className="mt-2 text-sm text-gray-600">Wallet Connected: {accountId}</p>
          )}
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-[#4FC3A1]">Your Impact</h2>
          <p className="mt-2 text-lg font-semibold">Carbon Points: {profile?.carbon_points || 0}</p>
          <p className="text-lg">Staked NFTs: {profile?.staked_nfts?.length || 0}</p>
        </div>

        <button
          onClick={async () => {
            console.log("🔄 Logging out...");
            await supabase.auth.signOut();
            localStorage.removeItem("hedera-wallet"); 
            setAccountId(null);
            setUser(null);
            router.push("/join-the-movement");
          }}
          className="mt-6 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-lg hover:bg-red-600 transition"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
