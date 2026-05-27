"use client";

import { getCurrentUserProfile } from "@/lib/actions/profile";
import { useEffect, useState } from "react";

export interface UserProfile {
  id: string;
  full_name: string;
  username: string;
  email: string;
  gender: "male" | "female" | "other";
  birthdate: string;
  bio: string;
  avatar_url: string;
  preferences: UserPreferences;
  location_lat?: number;
  location_lng?: number;
  last_active: string;
  is_verified: boolean;
  is_online: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserPreferences {
  age_range: {
    min: number;
    max: number;
  };
  distance: number;
  gender_preference: ("male" | "female" | "other")[];
}


export default function ProfilePage() {
   const [profile, setProfile] = useState<UserProfile | null>(null);
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(()=>{
      async function loadProfile(){
         try {
            const profileData = await getCurrentUserProfile();
            console.log(profileData);
            
            if(profileData){
               setProfile(profileData);
            } else{
               setError("Failed to load Profile");
            }
         } catch (error) {
            console.error("Error loading profile: ", error);
            setError("Failed to load Profile");
         } finally{
            setLoading(false);
         }
      }

      loadProfile();
   }, []);

   if (error || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">❌</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Profile not found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error || "Unable to load your profile. Please try again."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold py-3 px-6 rounded-full hover:from-pink-600 hover:to-red-600 transition-all duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

   return (
     <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="container mx-auto px-4 py-8">
            <header className="text-center mb-8">
               <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  My Profile
               </h1>

               <p className="text-gray-600 dark:text-gray-400">
                  Manage your profile and preferences
               </p>
            </header> 

             <div className="max-w-4xl mx-auto">
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                     <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                        <div className="flex items-center space-x-6 mb-8">
                            <div className="relative">
                              <div className="w-24 h-24 rounded-full overflow-hidden">
                                 <img
                                    src={profile.avatar_url || "/default-avatar.png"}
                                    alt={profile.full_name}
                                    className="w-full h-full object-cover"
                                 />
                              </div>
                            </div>
                        </div>
                     </div>
                  </div>
               </div>
             </div>
        </div>
    </div>
   ); 
}