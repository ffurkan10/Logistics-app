import React, { useEffect, useState } from "react";
import * as AiIcons from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Style from "./style.module.scss";
import Card from "../../card";
import Button from "../../button/index";
import Modal from "../../modal";
import PopUp from "../../popup";
import { deleteData, updateData } from "../../../features/formSlice";
import { toast } from "react-toastify";

const LandingPageTable = () => {
  const route = useSelector((state) => state.formState);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const [totalKm, setTotalKm] = useState(0);
  const [edit, setEdit] = useState(false);

  const toggleModal = () => {
    setOpenModal((prevModal) => !prevModal);
    if (openModal === true) {
      setEdit(false);
    }
  };

  const handleSilClick = (index) => {
    dispatch(deleteData(index));
  };

  const handleEditClick = (index) => {
    dispatch(updateData(index));
    setOpenModal((prevModal) => !prevModal);
    setEdit((prevModal) => !prevModal);
  };

  const submitButton = () => {
    if (
      route?.addedData.length === 0 ||
      route?.addedData[0].tur !== "Yükleme" ||
      route?.addedData[route?.addedData.length - 1].tur !== "Boşaltma"
    ) {
      toast.info(
        `Rotanızın ilk seçimi yükleme son seçimi ise boşaltma olmalıdır.`,
        { position: toast.POSITION.TOP_CENTER }
      );
    } else {
      toast.success("Rotanız oluşturuldu.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  useEffect(() => {
    setTotalKm(0);
    let km = 0;
    route?.addedData?.forEach((item) => (km = km + Number(item.km)));
    setTotalKm(km);
  }, [route?.addedData]);

  const formattedTotalKm = totalKm.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className={Style.home}>
      <h1>Rotalar</h1>

      {route?.addedData?.length === 0 && (
        <div className={Style.empty}>
          <p>
            Henüz bir rota belirlemediniz. Rota belirlemek için ekle butonuna
            tıklayabilirsiniz.
          </p>

          <div className={Style.button}>
            <Button onClick={toggleModal}>Ekle</Button>
          </div>
        </div>
      )}

      {route?.addedData?.length !== 0 && (
        <div className={Style.cardContainer}>
          <div className={Style.headerContainer}>
            <div className={Style.headers}>
              <p>İl</p>
              <p>İlçe</p>
              <p>Kilometre</p>
              <p>Tür</p>
            </div>
          </div>
          {route?.addedData?.map((route, index) => (
            <Card
              key={index}
              id={route.id}
              il={route.il}
              ilce={route.ilce}
              km={route.km}
              tur={route.tur}
              firstIcon={<AiIcons.AiOutlineEdit />}
              secondIcon={<AiIcons.AiOutlineDelete />}
              sil={handleSilClick}
              edit={handleEditClick}
            />
          ))}
          <div className={Style.total}>
            <Button onClick={toggleModal}>Ekle</Button>
            <p>Rotanız: {formattedTotalKm} km</p>
          </div>
        </div>
      )}

      <div className={Style.submit}>
        <Button onClick={submitButton}>Rotayı oluştur</Button>
      </div>

      <Modal
        isOpen={openModal}
        toggle={toggleModal}
        className="loginPortalModal"
      >
        <div>
          <PopUp isOpen={setOpenModal} update={edit} edit={handleEditClick} />
        </div>
      </Modal>
    </div>
  );
};

export default LandingPageTable;
