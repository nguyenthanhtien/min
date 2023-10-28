import { memo, useEffect, useMemo, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";

import GOLD_IMAGE from "@/assets/icons/medal-gold.svg";
import SILVER_IMAGE from "@/assets/icons/medal-silver.svg";
import BRONZE_IMAGE from "@/assets/icons/medal-bronze.svg";
import CloseIcon from "@/assets/icons/close-1.svg";
import { ReactComponent as ArrowDown } from "@/assets/icons/arrow-down-2.svg";

import Modal from "@/components/core/Modal";
import ModalHeader from "@/components/core/ModalHeader";
import ProfilePicture from "@/components/core/ProfilePicture";
import Switch from "@/components/core/Switch";
import Checkbox from "@/components/core/Checkbox";
import AuthButton from "@/components/core/AuthButton";

import { getRoleNames } from "@/utils/user";

import useUser from "@/services/hooks/useUser";
import useUserManagement from "@/services/hooks/useUserManagement";
import useToast from "@/services/hooks/useToast";

import "./styles.scss";

const ModalUserDetail = ({ pageNumber }) => {
  const { roles } = useUser();
  const { userDetail, onResetUserDetail, onUpdateUser } = useUserManagement();
  const { data, status } = userDetail;
  const { setToast } = useToast();

  const userRoles = useMemo(() => {
    const r = getRoleNames({ roles, roleIDs: data.roles });
    return r;
  }, [roles, data]);

  const {
    control,
    formState: { dirtyFields },
    reset,
    handleSubmit: onSubmit,
  } = useForm({
    defaultValues: {
      status: false,
      player: "",
      facilitator: "",
      admin: "",
      userName: "",
    },
  });

  useEffect(() => {
    if (status !== "isLoading" && userRoles) {
      userRoles.split(", ").map((role) => {
        document.getElementById(role.toLowerCase()).checked = true;
      });
      reset({
        status: data.isActive,
        player: userRoles.indexOf("Player") !== -1 ? "Player" : "",
        facilitator:
          userRoles.indexOf("Facilitator") !== -1 ? "Facilitator" : "",
        admin: userRoles.indexOf("Administrator") !== -1 ? "Administrator" : "",
        userName: data.userName
      });
    }

    return () => {
      reset({
        status: false,
        player: "",
        facilitator: "",
        admin: "",
        userName: "",
      });
    };
  }, [data, status, userRoles]);

  const handleModalClose = useCallback(() => {
    onResetUserDetail();
  }, []);

  const handleCancelClick = useCallback(() => {
    handleModalClose();
    // setToast({
    //   toastId: "Cancel",
    //   toastTimer: 2000,
    //   toastTemplate: `<div class="mcmc-toast" id="Cancel"><img src="${CloseIcon}" /><div><p class="mcmc-toast__title">Cancel!</p><p class="mcmc-toast__message">The info is not saved</p></div></div>`,
    // });
  }, []);

  const handleSaveClick = useCallback((formData) => {
    const updatedRoles = [
      formData.player,
      formData.facilitator,
      formData.admin,
    ].filter((r) => r !== "");

    onUpdateUser({
      params: {
        userName: formData.userName,
        roles: updatedRoles,
        isActive: formData.status,
      },
      pageNumber: pageNumber,
      callback: () => {
        setToast({
          toastId: "Save",
          toastTitle: "Saved!",
          toastMessage: "The info successfully updated.",
          toastTimer: 2000,
        });
        document.getElementById("mcmc-search-input").value = "";
      },
    });
  }, [pageNumber]);

  return (
    <Modal isShow={status !== "isLoading"}>
      <ModalHeader title={data.fullName} onCloseModal={handleModalClose} />
      <div className="user-detail">
        <div className="user-detail__content">
          <div className="user-detail__content__left">
            <ProfilePicture />
            <div className="user-detail__medals">
              <div className="user-detail__medal">
                <div className="user-detail__medal__img">
                  <img alt="Gold Medal" src={GOLD_IMAGE} />
                </div>
                <p className="user-detail__medal__count">
                  <b>1</b> Gold
                </p>
              </div>
              <div className="user-detail__medal">
                <div className="user-detail__medal__img">
                  <img
                    alt="Silver Medal"
                    src={SILVER_IMAGE}
                    aria-disabled="true"
                  />
                </div>
                <p className="user-detail__medal__count">
                  <b>0</b> Silver
                </p>
              </div>
              <div className="user-detail__medal">
                <div className="user-detail__medal__img">
                  <img
                    alt="Bronze Medal"
                    src={BRONZE_IMAGE}
                    aria-disabled="true"
                  />
                </div>
                <p className="user-detail__medal__count">
                  <b>0</b> Bronze
                </p>
              </div>
            </div>
          </div>
          <div className="user-detail__content__right">
            <div className="user-detail__info">
              <p className="user-detail__info__name">User Name</p>
              <p className="user-detail__info__value">{data.userName}</p>
            </div>
            <div className="user-detail__info">
              <p className="user-detail__info__name">Email</p>
              <p className="user-detail__info__value">{data.email}</p>
            </div>
            <div className="user-detail__info">
              <p className="user-detail__info__name">Gender</p>
              <p className="user-detail__info__value">{data.genderString}</p>
            </div>
            <div className="user-detail__info">
              <p className="user-detail__info__name">Pin Code</p>
              <p className="user-detail__info__value"></p>
            </div>
            <div className="user-detail__info">
              <p className="user-detail__info__name">Status</p>
              <Controller
                name="status"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Switch
                    textChecked="Active"
                    textUnchecked="Not Active"
                    isChecked={value}
                    onChange={onChange}
                  />
                )}
              />
            </div>
            <div className="user-detail__info">
              <p className="user-detail__info__name">Roles</p>
              <div className="user-detail__info__action">
                <input type="checkbox" id="user-detail-roles" />
                <label
                  className="user-detail__info__value"
                  htmlFor="user-detail-roles"
                >
                  {userRoles} <ArrowDown />
                </label>
                <div className="user-detail__roles">
                  <Checkbox cId="player" cTitle="Player" disabled />
                  <Controller
                    name="facilitator"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Checkbox
                        cId="facilitator"
                        cTitle="Facilitator"
                        onChange={onChange}
                      />
                    )}
                  />
                  <Controller
                    name="admin"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Checkbox
                        cId="administrator"
                        cTitle="Admin"
                        onChange={(checkValue) =>
                          onChange(checkValue ? "Administrator" : "")
                        }
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="user-detail__footer">
          <AuthButton
            btnText="CANCEL"
            onClick={handleCancelClick}
          />
          <AuthButton
            btnText="SAVE CHANGES"
            disabled={!Object.keys(dirtyFields).length}
            onClick={onSubmit(handleSaveClick)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default memo(ModalUserDetail);
