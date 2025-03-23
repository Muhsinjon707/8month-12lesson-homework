import React from "react";
import { UnsplashPhoto } from "../model/UnspashPhoto";

const ImageGrid = ({ images }: { images: UnsplashPhoto[] }) => {
  return (
    <div className="flex items-start justify-center gap-2">
      {images[0] && (
        <div className="flex-1 relative overflow-hidden">
          <img
            src={images[0].urls.regular}
            alt="Blurred Large"
            className="w-[250px] h-[250px] rounded-lg object-cover motion-blur"
          />
        </div>
      )}

      {(images[1] || images[2]) && (
        <div className="flex flex-col gap-2">
          {images[1] && (
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={images[1].urls.regular}
                alt="Blurred Small Top"
                className="w-[120px] h-[120px] object-cover motion-blur"
              />
            </div>
          )}
          {images[2] && (
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={images[2].urls.regular}
                alt="Blurred Small Bottom"
                className="w-[120px] h-[120px] object-cover motion-blur"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageGrid;
