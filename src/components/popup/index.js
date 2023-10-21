import React, { useEffect, useState } from "react";
import Style from "./style.module.scss";
import Input from "../input";
import Select from "react-select";
import DropdownIndicator from "../elements/DropDown";
import Button from "../button";
import { useDispatch, useSelector } from "react-redux";
import {
  addData,
  setIl,
  setIlce,
  setKm,
  setTur,
} from "../../features/formSlice";

const turData = [
  {
    value: "yukleme",
    label: "Yükleme",
  },
  {
    value: "bosaltma",
    label: "Boşaltma",
  },
];

const PopUp = ({ isOpen, edit, update }) => {
  const [selectedTur, setSelectedTur] = useState(turData[0]);
  const editedItemId = sessionStorage.getItem("editedItemId");
  const editedItemIl = sessionStorage.getItem("editedItemIl");
  const editedItemIlce = sessionStorage.getItem("editedItemIlce");
  const editedItemKm = sessionStorage.getItem("editedItemKm");
  const editedItemTur = sessionStorage.getItem("editedItemTur");

  const [newIl, setNewIl] = useState(editedItemIl);
  const [newIlce, setNewIlce] = useState(editedItemIlce);
  const [newKm, setNewKm] = useState(editedItemKm);
  const [newTur, setNewTur] = useState(editedItemTur);

  const dispatch = useDispatch();
  const formState = useSelector((state) => state.form);

  const handleEkleClick = () => {
    dispatch(addData());
    isOpen(false);
  };

  const handleEdit = () => {
    if (editedItemId) {
      edit({
        id: editedItemId,
        il: newIl,
        ilce: newIlce,
        km: newKm,
        tur: newTur,
      });
    } else {
      console.error("Düzenlenecek öğe bulunamadı.");
    }
  };
  return (
    <div className={Style.popUp}>
      {update ? (
        <form className={Style.form} onSubmit={handleEdit}>
          <div className={Style.formRow}>
            <Input
              value={newIl}
              onChange={(e) => {
                setNewIl(e.target.value);
              }}
              label="İl"
            />
            <Input
              value={newIlce}
              onChange={(e) => setNewIlce(e.target.value)}
              label="İlçe"
            />
          </div>
          <div className={Style.formRow}>
            <Input
              type="number"
              value={newKm}
              onChange={(e) => setNewKm(e.target.value)}
              label="Km"
            />
            <label>
              Tür
              <Select
                required
                classNamePrefix="react-select"
                instanceId="select1"
                defaultValue={turData[0]}
                value={selectedTur.label}
                onChange={(selectedOption) => {
                  setSelectedTur(selectedOption.label);
                  setNewTur(selectedOption.label);
                }}
                options={turData}
                components={{ DropdownIndicator }}
              />
            </label>
          </div>
          <Button pop>Düzenle</Button>
        </form>
      ) : (
        <form className={Style.form} onSubmit={handleEkleClick}>
          <div className={Style.formRow}>
            <Input
              value={formState?.il}
              onChange={(e) => dispatch(setIl(e.target.value))}
              label="İl"
            />
            <Input
              value={formState?.ilce}
              onChange={(e) => dispatch(setIlce(e.target.value))}
              label="İlçe"
            />
          </div>
          <div className={Style.formRow}>
            <Input
              type="number"
              value={formState?.km}
              onChange={(e) => dispatch(setKm(e.target.value))}
              label="Km"
            />
            <label>
              Tür
              <Select
                required
                classNamePrefix="react-select"
                instanceId="select1"
                defaultValue={turData[0]}
                value={selectedTur.label}
                onChange={(selectedOption) => {
                  setSelectedTur(selectedOption.label);
                  dispatch(setTur(selectedOption.label));
                }}
                options={turData}
                components={{ DropdownIndicator }}
              />
            </label>
          </div>
          <Button pop>Ekle</Button>
        </form>
      )}
    </div>
  );
};

export default PopUp;
