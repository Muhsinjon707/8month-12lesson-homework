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
    (state: RootState) => state.collections.collections
  );
  const dispatch = useDispatch();

  function handleActionToCollection(collection: Collection) {
    const exists = collection.images.some((img) => img.id === imageData.id);

    if (exists) {
      dispatch(
        removeImageFromCollection({
          collectionId: collection.id,
          imageId: imageData.id,
        })
      );
    } else {
      dispatch(
        addImageToCollection({ collectionId: collection.id, image: imageData })
      );
    }
  }

  return (
    <div className="w-[60%] px-6 py-7">
      <h2 className="font-bold text-2xl">Add to Collection</h2>

      <div className="w-full mt-8 flex flex-col items-start gap-3">
        <div
          onClick={onCreateNewCollection}
          className="
            w-full bg-gray-200 text-gray-600 border-2 border-dashed 
            rounded-md py-6 px-4 opacity-80 hover:opacity-100 cursor-pointer transition
          "
        >
          <button className="text-xl font-bold text-black cursor-pointer">
            Create a new collection
          </button>
        </div>

        <div className="w-full">
          {collections.length > 0 ? (
            collections.map((c) => {
              const exists = c.images.some((img) => img.id === imageData.id);
              return (
                <div
                  key={c.id}
                  onClick={() => handleActionToCollection(c)}
                  className="
                  w-full bg-gray-700 text-white rounded-md py-4 px-4 
                  flex items-center justify-between group opacity-75 hover:opacity-100 
                  transition-all duration-300 cursor-pointer
                "
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
                  <button className="opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                    {exists ? <FaMinus /> : <FaPlus />}
                  </button>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 mt-4">No collections yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalLeft;
