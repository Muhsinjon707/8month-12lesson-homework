import React from "react";

// React icons
import { FaPlus, FaLock } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

// Redux | Collection actions import
import {
  addImageToCollection,
  removeImageFromCollection,
} from "@/app/store/slice/collectionsSlice";

// Interface imports
import { UnsplashPhoto } from "@/app/model/UnspashPhoto";
import { Collection } from "@/app/model/CollectionPhoto";

interface ModalLeftProps {
  imageData: UnsplashPhoto;
  onCreateNewCollection: () => void;
}

const ModalLeft: React.FC<ModalLeftProps> = ({
  imageData,
  onCreateNewCollection,
}) => {
  const collections = useSelector(
    (state: RootState) => state.collections.collections,
  );
  const dispatch = useDispatch();

  function handleActionToCollection(collection: Collection) {
    const exists = collection.images.some((img) => img.id === imageData.id);

    if (exists) {
      dispatch(
        removeImageFromCollection({
          collectionId: collection.id,
          imageId: imageData.id,
        }),
      );
    } else {
      dispatch(
        addImageToCollection({ collectionId: collection.id, image: imageData }),
      );
    }
  }

  return (
    <div className="w-[60%] px-6 py-7">
      <h2 className="text-2xl font-bold">Add to Collection</h2>

      <div className="mt-8 flex w-full flex-col items-start gap-3">
        <div
          onClick={onCreateNewCollection}
          className="w-full cursor-pointer rounded-md border-2 border-dashed bg-gray-200 px-4 py-6 text-gray-600 opacity-80 transition hover:opacity-100"
        >
          <button className="cursor-pointer text-xl font-bold text-black">
            Create a new collection
          </button>
        </div>

        <div
          className={`hide-scrollbar flex h-[330px] w-full flex-col items-start gap-1 overflow-y-auto`}
        >
          {collections.length > 0 ? (
            collections.map((c) => {
              const exists = c.images.some((img) => img.id === imageData.id);
              return (
                <div
                  key={c.id}
                  onClick={() => handleActionToCollection(c)}
                  className="group flex w-full cursor-pointer items-center justify-between rounded-md bg-gray-700 px-4 py-4 text-white opacity-75 transition-all duration-300 hover:opacity-100"
                >
                  <div>
                    <span className="text-sm">{c.images.length} photos</span>
                    <div className="flex items-center gap-2">
                      {c.type === "private" && (
                        <span className="text-gray-400">
                          <FaLock />
                        </span>
                      )}
                      <h3 className="text-lg font-medium">{c.name}</h3>
                    </div>
                  </div>
                  <button className="invisible opacity-0 transition group-hover:visible group-hover:opacity-100">
                    {exists ? <FaMinus /> : <FaPlus />}
                  </button>
                </div>
              );
            })
          ) : (
            <p className="mt-4 text-gray-500">No collections yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalLeft;
