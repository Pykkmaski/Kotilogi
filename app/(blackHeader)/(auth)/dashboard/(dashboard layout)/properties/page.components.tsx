"use client";

import AddPropertyModal from "./AddPropertyModal";
import { Gallery } from "kotilogi-app/components/new/Gallery/GalleryBase/Gallery";
import {
  AddButton,
  DeactivateButton,
} from "@/components/new/Gallery/GalleryBase/Buttons";
import DeactivateSelectedItemsModal from "@/components/new/Gallery/GalleryBase/DeactivateSelectedItemsModal";
import { deactivateProperty } from "kotilogi-app/actions/experimental/properties";
import { GalleryListItem } from "@/components/new/Gallery/GalleryBase/GalleryListItem";
import { ListItem } from "@/components/ListItem/ListItem";
import ActivatePropertyModal from "./ActivatePropertyModal";
import { useRef } from "react";
import { ModalRefType } from "@/components/Experimental/Modal/Modal";
import { GalleryError } from "@/components/new/Gallery/GalleryBase/Components/Error/GalleryError";

function PropertiesGallery({ propertyData, user }) {
  return (
    <Gallery<Kotilogi.PropertyType> data={propertyData}>
      <Gallery.AddModal>
        <AddPropertyModal owner={user.email} />
      </Gallery.AddModal>

      <Gallery.DeleteModal>
        <DeactivateSelectedItemsModal deactivationMethod={deactivateProperty} />
      </Gallery.DeleteModal>

      <Gallery.Header title="Talot">
        <div className="flex gap-4 items-center">
          <Gallery.DeleteModalTrigger>
            <DeactivateButton />
          </Gallery.DeleteModalTrigger>

          <Gallery.AddModalTrigger>
            <AddButton />
          </Gallery.AddModalTrigger>
        </div>
      </Gallery.Header>

      <Gallery.Body
        displayStyle="vertical"
        itemComponent={props => {
          const activateRef = useRef<ModalRefType>(null);
          const isActive = props.item.status === "ok";

          return (
            <>
              {!isActive ? (
                <ActivatePropertyModal
                  property={props.item}
                  ref={activateRef}
                />
              ) : null}
              <GalleryListItem
                {...props}
                title={props.item.title}
                description={props.item.description}
                faIcon="fa fa-home"
                footerText={props.item.buildingType}
                href={isActive ? `/properties/${props.item.id}/info` : ""}
                secondaryHeaderContent={
                  isActive ? (
                    <i
                      className="fa fa-check text-green-700"
                      title="Talo on käytössä."
                    />
                  ) : (
                    <i
                      className="fa fa-ban text-red-700"
                      title="Talo on poistettu käytöstä."
                    />
                  )
                }
                controlsContent={
                  isActive ? (
                    <ListItem.CheckBox />
                  ) : (
                    <span
                      className="text-orange-500 cursor-pointer"
                      onClick={() => activateRef.current?.toggleOpen(true)}
                    >
                      Ota käyttöön
                    </span>
                  )
                }
              />
            </>
          );
        }}
        errorElement={
          <GalleryError
            title="Ei Taloja"
            message="Et ole vielä lisännyt taloja."
            icon="/icons/house.png"
          />
        }
      />
    </Gallery>
  );
}

export function Content({
  propertyData,
  user,
}: {
  propertyData: Kotilogi.PropertyType[];
  user: { email: string };
}) {
  return (
    <main className="mb-4 flex-1 h-full">
      <PropertiesGallery propertyData={propertyData} user={user} />
    </main>
  );
}
