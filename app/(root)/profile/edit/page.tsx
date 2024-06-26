import Profile from "@/components/forms/Profile";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import React from "react";

const page = async () => {
    const {userId} = auth()

    if(!userId)  return null;

    const mongoUser = await getUserById({userId})

  return (
    <>
      <h1 className="h1-bold text-dark-100_light-900">Edit Profile</h1>

      <div className="mt-9">
        <Profile 
        clerkId = {userId}
        user = {JSON.stringify(mongoUser)}
          />
      </div>
    </>
  );
};

export default page;
