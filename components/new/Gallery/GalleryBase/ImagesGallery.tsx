"use client";

import AddFilesModal from "@/components/Experimental/Modal/AddFilesModal";
import { ListItemProps } from "@/components/ListItem/ListItem";
import {
  AddButton,
  DeleteButton,
} from "@/components/new/Gallery/GalleryBase/Buttons";
import { ImageError } from "@/components/new/Gallery/GalleryBase/Components/Error/ImageError";
import DeleteSelectedItemsModal from "@/components/new/Gallery/GalleryBase/DeleteSelectedItemsModal";
import { Gallery } from "@/components/new/Gallery/GalleryBase/Gallery";
import { addFiles, deleteFile } from "kotilogi-app/actions/experimental/files";
import { FileTableName } from "kotilogi-app/types/FileTableName";

type ImagesGalleryProps = {
  images: Kotilogi.FileType[];

  /**The id of the resource the images belong to, eg. the id of a property. */
  refId: string;

  tablename: FileTableName;

  ImageComponent: React.FC<ListItemProps<Kotilogi.FileType>>;
};

export function ImagesGallery({
  tablename,
  images,
  refId,
  ImageComponent,
}: ImagesGalleryProps) {
  return (
    <Gallery data={images}>
      <Gallery.AddModal>
        <AddFilesModal
          accept="image/jpeg"
          uploadMethod={async (fdata: FormData[]) => {
            await addFiles(tablename, fdata, refId);
          }}
        />
      </Gallery.AddModal>

      <Gallery.DeleteModal>
        <DeleteSelectedItemsModal
          deleteMethod={async (fileData: Kotilogi.FileType) => {
            await deleteFile(tablename, fileData.id);
          }}
        />
      </Gallery.DeleteModal>

      <Gallery.Header title="Kuvat">
        <Gallery.DeleteModalTrigger>
          <DeleteButton />
        </Gallery.DeleteModalTrigger>

        <Gallery.AddModalTrigger>
          <AddButton />
        </Gallery.AddModalTrigger>
      </Gallery.Header>

      <Gallery.Body
        displayStyle="horizontal"
        itemComponent={ImageComponent}
        errorElement={
          <ImageError message="Et ole vielä lisännyt kohteelle kuvia. Aloita painamalla Lisää-Uusi painiketta." />
        }
      />
    </Gallery>
  );
}
