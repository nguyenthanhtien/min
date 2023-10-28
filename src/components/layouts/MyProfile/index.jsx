import { memo } from "react";

import ProfilePicture from "@/components/core/ProfilePicture";

import useUser from "@/services/hooks/useUser";

import "./styles.scss";

const MyProfile = () => {
  const { profile } = useUser();

  return (
    <div className="mcmc-profile">
      <ProfilePicture />
      <div className="mcmc-profile__info">
        <div className="mcmc-profile__detail">
          <p className="mcmc-profile__detail__name">Full Name</p>
          <p className="mcmc-profile__detail__value">
            {profile.data?.fullName}
          </p>
        </div>
        <div className="mcmc-profile__detail">
          <p className="mcmc-profile__detail__name">User Name</p>
          <p className="mcmc-profile__detail__value">
            {profile.data?.userName}
          </p>
        </div>
        <div className="mcmc-profile__detail">
          <p className="mcmc-profile__detail__name">Email</p>
          <p className="mcmc-profile__detail__value">{profile.data?.email}</p>
        </div>
        <div className="mcmc-profile__detail">
          <p className="mcmc-profile__detail__name">Gender</p>
          <p className="mcmc-profile__detail__value">
            {profile.data?.gender === 0 ? "Male" : "Female"}
          </p>
        </div>
        <div className="mcmc-profile__detail">
          <p className="mcmc-profile__detail__name">Pin Code</p>
          <p className="mcmc-profile__detail__value"></p>
        </div>
      </div>
    </div>
  );
};

export default memo(MyProfile);
